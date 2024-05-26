//https://bvlx969se6.execute-api.eu-north-1.amazonaws.com/dev

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const {author, filter, page} = event.pathParameters || {};
  console.log('params:', author, filter, page);

  const params = {
    TableName: 'Recipe-kaixblblyvanhhrzha4lvottay-dev',
    IndexName: 'authors-index',
    KeyConditionExpression: '#authors = :authors',
    ExpressionAttributeNames: {
      '#authors': 'authors',
    },
    ExpressionAttributeValues: {
      ':authors': author,
    },
    Limit: 5,
  };

  //conditionaly add filter and page to the params
  if (filter && filter !== 'default') {
    params.FilterExpression =
      'attribute_exists(#name) AND contains(#name, :name)';
    params.ExpressionAttributeNames['#name'] = 'name';
    params.ExpressionAttributeValues[':name'] = filter;
  }
  if (page && page !== 'first') {
    const decodedPage = decodeURIComponent(page);
    params.ExclusiveStartKey = JSON.parse(decodedPage);
    console.log('ExclusiveStartKey:', params.ExclusiveStartKey);
  }

  try {
    const data = await dynamodb.query(params).promise();
    console.log('data:', data);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error querying items:', error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
