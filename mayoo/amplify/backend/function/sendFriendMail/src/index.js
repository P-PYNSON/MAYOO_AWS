/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');

const cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const requestBody = JSON.parse(event.body);
  console.log(requestBody);
  const {email, param1, param2} = requestBody;

  try {
    const params = {
      UserPoolId: 'eu-north-1_fQKnu5QYn',
      AttributesToGet: ['sub', 'name'],
      Filter: `email = "${email}"`,
      Limit: 1,
    };

    /* const data = await cognito.listUsers(params).promise(); */

    if (email) {
      /*   if (data.Users.length > 0) { */
      const user = data.Users[0];
      console.log(user);
      const sub = user.Attributes.find(attr => attr.Name === 'sub').Value;
      const name = user.Attributes.find(attr => attr.Name === 'name').Value;

      // Send email
      /*   await sendEmail(email, sub, name);
       */
      return {
        statusCode: 200,
        body: JSON.stringify({message: 'Email sent successfully'}),
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
      body: JSON.stringify({message: 'Internal server error'}),
    };
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
