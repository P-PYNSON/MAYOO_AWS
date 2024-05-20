/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const cognito = new AWS.CognitoIdentityServiceProvider();
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const requestBody = JSON.parse(event.body);
  const {senderId, senderName, targetEmail} = requestBody;

  try {
    const user = await getUserByEmail(targetEmail);
    if (!user) {
      return generateResponse(404, {message: 'User not found'});
    }

    const {secondUserSub, secondUserName} = extractUserAttributes(user);
    const requestPending = await verifyIfRequestAlreadyExist(
      senderId,
      secondUserSub,
    );
    const userAlreadyAdded = await verifyIfUserIsAlreadyAdded(
      `${senderId}::${senderName}`,
      secondUserSub,
    );

    if (!userAlreadyAdded && !requestPending) {
      const {id, token} = await createFriendRequest(
        senderId,
        senderName,
        secondUserSub,
        secondUserName,
      );
      const emailSent = await sendEmail(token, id, targetEmail, senderName);
      if (emailSent) {
        return generateResponse(200, {message: 'email sent'});
      } else {
        await deleteEntry(id);
        return generateResponse(500, {message: 'Failed to send email'});
      }
    } else {
      return generateResponse(409, {
        message: 'Friend request already exists or user already added',
      });
    }
  } catch (error) {
    console.error('Error processing friend request:', error);
    return generateResponse(500, {message: 'Internal server error: ' + error});
  }
};

async function getUserByEmail(email) {
  const params = {
    UserPoolId: 'eu-north-1_fQKnu5QYn',
    AttributesToGet: ['sub'],
    Filter: `email = "${email}"`,
    Limit: 1,
  };

  try {
    const data = await cognito.listUsers(params).promise();
    return data.Users.length > 0 ? data.Users[0] : null;
  } catch (error) {
    console.error('Error retrieving user:', error);
    throw error;
  }
}

function extractUserAttributes(user) {
  const secondUserSub = user.Attributes.find(attr => attr.Name === 'sub').Value;
  const secondUserName = user.Username;
  return {secondUserSub, secondUserName};
}

async function createFriendRequest(
  senderId,
  senderName,
  secondUserSub,
  secondUserName,
) {
  const token = generateRandomToken(16);
  const id = generateId();

  const params = {
    TableName: 'friendRequest-kaixblblyvanhhrzha4lvottay-dev',
    Item: {
      id,
      token,
      firstUserSub: senderId,
      firstUserName: senderName,
      secondUserSub,
      secondUserName,
    },
  };

  try {
    await dynamodb.put(params).promise();
    return {id, token};
  } catch (error) {
    console.error('Error creating friend request:', error);
    throw error;
  }
}

async function verifyIfUserIsAlreadyAdded(author, friendSub) {
  const params = {
    TableName: 'friends-kaixblblyvanhhrzha4lvottay-dev',
    IndexName: 'author-friendSub-index',
    KeyConditionExpression: 'author = :author and friendSub = :friendSub',
    ExpressionAttributeValues: {
      ':author': author,
      ':friendSub': friendSub,
    },
  };

  try {
    const data = await dynamodb.query(params).promise();
    return data.Items.length > 0;
  } catch (error) {
    console.error('Error querying items:', error);
    throw error;
  }
}

async function verifyIfRequestAlreadyExist(firstUserSub, secondUserSub) {
  const params = {
    TableName: 'friendRequest-kaixblblyvanhhrzha4lvottay-dev',
    IndexName: 'firstUserSub-secondUserSub-index',
    KeyConditionExpression:
      'firstUserSub = :firstUserSub and secondUserSub = :secondUserSub',
    ExpressionAttributeValues: {
      ':firstUserSub': firstUserSub,
      ':secondUserSub': secondUserSub,
    },
  };

  try {
    const data = await dynamodb.query(params).promise();
    return data.Items.length > 0;
  } catch (error) {
    console.error('Error querying items:', error);
    throw error;
  }
}

async function sendEmail(token, requestId, email, senderName) {
  try {
    const ssm = new AWS.SSM();
    const {Parameters} = await ssm
      .getParameters({
        Names: ['smtpPass'].map(secretName => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();

    const smtPass = Parameters[0]['Value'];
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailersend.net',
      port: 587,
      secure: false,
      auth: {
        user: 'MS_uALO4J@trial-jpzkmgqyzd1l059v.mlsender.net',
        pass: smtPass,
      },
    });

    const mailOptions = {
      from: '"Mayoo App" <MS_uALO4J@trial-jpzkmgqyzd1l059v.mlsender.net>',
      to: email,
      subject: 'New friend request',
      html: `
        <b>Hello there!</b>
        <p>${senderName} wants to be your friend. Click on this link if you would like to add ${senderName} to your friends list and share recipes and lists together!</p>
        <div><a href='https://r7c300pz02.execute-api.eu-north-1.amazonaws.com/dev/addFriends/${requestId}/${token}'>Add ${senderName} to my friends list!</a></div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function generateRandomToken(length) {
  return crypto.randomBytes(length).toString('hex');
}

function generateResponse(statusCode, body) {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
}

async function deleteEntry(entryId) {
  const getDataFromDBTable = {
    TableName: 'friendRequest-kaixblblyvanhhrzha4lvottay-dev',
    Key: {
      id: entryId,
    },
  };
  try {
    const data = await dynamodb.delete(getDataFromDBTable).promise();
  } catch (error) {
    console.log('error getting first entry data' + error);
  }
}