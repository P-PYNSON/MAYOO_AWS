/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const requestBody = JSON.parse(event.body);
  const {originalRecipeId, recipeId, authorName} = requestBody;
  console.log('requestBody', requestBody);

  try {
    await deleteRecipe(recipeId);

    if (originalRecipeId) {
      const data = await getOriginalRecipe(originalRecipeId);
      await revomeFriendFromShareList(data, authorName);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({message: 'Recipe deleted'}),
    };
  } catch (error) {
    console.log('global error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'Error server'}),
    };
  }
};

const getOriginalRecipe = async originalRecipeId => {
  const getDataFromDBTable = {
    TableName: 'Recipe-kaixblblyvanhhrzha4lvottay-dev',
    Key: {
      id: originalRecipeId,
    },
  };
  try {
    const data = await dynamodb.get(getDataFromDBTable).promise();
    console.log('original data', data.Item);
    return data.Item;
  } catch (error) {
    console.log('error getting original data:', error);
  }
};

const revomeFriendFromShareList = async (data, authorName) => {
  const currentSharedWith = data.sharedWith;
  const updatedSharedWith = currentSharedWith.filter(
    name => name !== authorName,
  );
  const updatedRecipe = {
    TableName: 'Recipe-kaixblblyvanhhrzha4lvottay-dev',
    Key: {
      id: data.id,
    },
    UpdateExpression: 'SET #sharedWith = :updatedSharedWith',
    ExpressionAttributeNames: {
      '#sharedWith': 'sharedWith',
    },
    ExpressionAttributeValues: {
      ':updatedSharedWith': updatedSharedWith,
    },
    ReturnValues: 'UPDATED_NEW',
  };
  try {
    const updatedRecipeDone = await dynamodb.update(updatedRecipe).promise();
    console.log('updatedRecipeDone:', updatedRecipeDone);
  } catch (error) {
    console.log('error updating', error);
  }
};

const deleteRecipe = async recipeId => {
  const getDataFromDBTable = {
    TableName: 'Recipe-kaixblblyvanhhrzha4lvottay-dev',
    Key: {
      id: recipeId,
    },
  };
  try {
    const data = await dynamodb.delete(getDataFromDBTable).promise();
    console.log('original data', data.Item);
  } catch (error) {
    console.log('error deleteing recipe', error);
  }
};
