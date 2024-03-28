/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["spoonKey"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const aws = require('aws-sdk');

exports.handler = async event => {
  try {
    const ssm = new aws.SSM();
    const { Parameters } = await ssm.getParameters({
      Names: ["spoonKey"].map(secretName => process.env[secretName]),
      WithDecryption: true,
    }).promise();

    console.log('Parameters:', Parameters);

    const ingredientToFetch = event.pathParameters.ingredient;
    const ingredientData = { ingredient: ingredientToFetch };

    console.log('EVENT:', JSON.stringify(event));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(Parameters),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
