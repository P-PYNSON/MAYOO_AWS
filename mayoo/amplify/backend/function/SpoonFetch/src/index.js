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
const axios = require('axios');

exports.handler = async event => {
  const {apiKey} = await new aws.SSM()
    .getParameters({
      Names: ['spoonKey'].map(secretName => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();
    console.log(apiKey.Value);

  try {
    const response = await axios.get(`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${apiKey.Value}&query=${text}&metaInformation=true`, {
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'Internal Server Error'}),
    };
  }
};
