
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const aws = require('aws-sdk');

exports.handler = async event => {
  console.log('EVENT:', JSON.stringify(event));
  const ingredientToFetch = event.pathParameters.ingredient;

  try {
    const ssm = new aws.SSM();
    const {Parameters} = await ssm
      .getParameters({
        Names: ['spoonKey'].map(secretName => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();

    const spoonKey = Parameters[0]['Value'];

    const response = await fetch(
      `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${spoonKey}&query=${ingredientToFetch}&metaInformation=true`,
      {
        method: 'GET',
      },
    );

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'Internal server error'}),
    };
  }
};
