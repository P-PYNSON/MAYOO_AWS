/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["smtpPass"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
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
  console.log(requestBody);
  const {senderId, senderName, targetEmail} = requestBody;

  try {
    const params = {
      UserPoolId: 'eu-north-1_fQKnu5QYn',
      AttributesToGet: ['sub'],
      Filter: `email = "${targetEmail}"`,
      Limit: 1,
    };

    const data = await cognito.listUsers(params).promise();

    if (data.Users.length > 0) {
      const secondUser = data.Users[0];
      const secondUserSub = secondUser.Attributes.find(
        attr => attr.Name === 'sub',
      ).Value;
      const secondUserName = secondUser.Username;

      console.log(secondUser);

      if (secondUser && secondUserSub && secondUserName) {
        const token = generateRandomToken(16);
        const id = generateId();
        console.log(id);

        const friendRequestParams = {
          TableName: 'friendRequest-kaixblblyvanhhrzha4lvottay-dev',
          Item: {
            id: id,
            token: token,
            firstUserSub: senderId,
            firstUserName: senderName,
            secondUserSub: secondUserSub,
            secondUserName: secondUserName,
          },
        };
        await dynamodb.put(friendRequestParams).promise();

        const emailSent = await sendEmail(token, id, targetEmail);
        console.log(emailSent);
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'email sent',
        }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({message: 'User not found'}),
      };
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'Internal server error' + error}),
    };
  }

  function generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  function generateRandomToken(length) {
    return crypto.randomBytes(length).toString('hex');
  }

  async function sendEmail(token, requestId, email) {
    try {
      const ssm = new AWS.SSM();
      console.log('sending');
      const {Parameters} = await ssm
        .getParameters({
          Names: ['smtpPass'].map(secretName => process.env[secretName]),
          WithDecryption: true,
        })
        .promise();
      const smtPass = Parameters[0]['Value'];
      console.log('smpt pass:' + smtPass);

      let transporter = nodemailer.createTransport({
        host: 'smtp.mailersend.net',
        port: 587,
        secure: false,
        auth: {
          user: 'MS_uALO4J@trial-jpzkmgqyzd1l059v.mlsender.net',
          pass: smtPass,
        },
      });

      // Email options
      let mailOptions = {
        from: '"Mayoo App" <MS_uALO4J@trial-jpzkmgqyzd1l059v.mlsender.net>',
        to: email,
        subject: 'New friend request',
        text: `Hello there ! ${senderName} wants to be your friend. Click on this link if you would like to add ${senderName} to your friends list and share recipes and lists together ! t:${token}  i:${requestId}`,
        // html: '<b>Hello world?</b>' // HTML body (optional)
      };

      try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return true;
      } catch (error) {
        console.error('Error sending email: %s', error);
        return false;
      }
    } catch (error) {
      console.log('error with email:' + error);
    }
  }
};
