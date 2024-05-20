/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const requestBody = JSON.parse(event.body);
  const {firstEntryId, sencondEntryFriendSub} = requestBody;

  const {authorForSecondEntry} = await getFirstEntryData(firstEntryId);
  const {sencondEntryId} = await getSecondEntryId(
    authorForSecondEntry,
    sencondEntryFriendSub,
  );

  if (firstEntryId && sencondEntryId) {
    try {
      await deleteEntry(firstEntryId);
      await deleteEntry(sencondEntryId);
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
        body: JSON.stringify({message: 'friend removed'}),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
        body: JSON.stringify({message: 'error removing friend'}),
      };
    }
  } else {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify({message: 'no entry found'}),
    };
  }
};

async function getFirstEntryData(firstEntryId) {
  const getDataFromDBTable = {
    TableName: 'friends-kaixblblyvanhhrzha4lvottay-dev',
    Key: {
      id: firstEntryId,
    },
  };
  try {
    const data = await dynamodb.get(getDataFromDBTable).promise();
    return {
      authorForSecondEntry: data.Item.friendSub + '::' + data.Item.friendName,
    };
  } catch (error) {
    console.log('error getting first entry data' + error);
  }
}

async function getSecondEntryId(author, friendSub) {
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
    return {sencondEntryId: data.Items[0].id};
  } catch (error) {
    console.error('error getting second entry data', error);
    throw error;
  }
}

async function deleteEntry(entryId) {
  const getDataFromDBTable = {
    TableName: 'friends-kaixblblyvanhhrzha4lvottay-dev',
    Key: {
      id: entryId,
    },
  };
  try {
    const data = await dynamodb.delete(getDataFromDBTable).promise();
  } catch (error) {
    console.log('error deleting data' + error);
  }
}
