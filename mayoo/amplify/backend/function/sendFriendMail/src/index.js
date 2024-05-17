/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const crypto = require('crypto');

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
};

async function sendEmail(email, sub, name) {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Data: `Hi ${name},\n\nClick the following link to perform the operation: https://YOUR_API_GATEWAY_ENDPOINT/YOUR_PATH/${sub}`,
        },
      },
      Subject: {
        Data: 'Perform Operation',
      },
    },
    Source: 'YOUR_EMAIL_ADDRESS', // SES verified email address
  };

  await ses.sendEmail(params).promise();
}
