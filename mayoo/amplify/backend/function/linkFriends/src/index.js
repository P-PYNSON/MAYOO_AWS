/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const {requestid, token} = event.pathParameters || {};

  const getDataFromDBTable = {
    TableName: 'friendRequest-kaixblblyvanhhrzha4lvottay-dev',
    Key: {
      id: requestid,
    },
  };

  try {
    const data = await dynamodb.get(getDataFromDBTable).promise();
    const storedToken = data.Item.token;

    if (storedToken == token) {
      const {firstUserSub, firstUserName, secondUserSub, secondUserName} =
        data.Item;

      await addFriend(
        requestid + '_a',
        secondUserName,
        secondUserSub,
        `${firstUserSub}::${firstUserName}`,
      );
      await addFriend(
        requestid + '_b',
        firstUserName,
        firstUserSub,
        `${secondUserSub}::${secondUserName}`,
      );
      await deleteEntry(requestid);

    } else {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
        body: JSON.stringify('Data error'),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify('Friend Added'),
    };
  } catch (error) {
    console.error('Error adding friends:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'Internal server error' + error}),
    };
  }
};

async function addFriend(id, friendName, friendSub, author) {
  try {
    await dynamodb
      .put({
        TableName: 'friends-kaixblblyvanhhrzha4lvottay-dev',
        Item: {
          id: id,
          friendName: friendName,
          friendSub: friendSub,
          author: author,
        },
      })
      .promise();
  } catch (error) {
    console.log('error adding ' + firstUserName);
  }
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
