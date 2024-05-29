/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const requestBody = JSON.parse(event.body);
  const {recipeId, newAuthorName, newAuthorSub} = requestBody;
  console.log('requestBody', requestBody);

  const getDataFromDBTable = {
    TableName: 'Recipe-kaixblblyvanhhrzha4lvottay-dev',
    Key: {
      id: recipeId,
    },
  };

  try {
    const data = await dynamodb.get(getDataFromDBTable).promise();
    console.log('data', data.Item);
    if (
      data &&
      (!data.Item.sharedWith || !data.Item.sharedWith.includes(newAuthorName))
    ) {
      console.log('creating');
      await updateOriginalRecipe(recipeId, newAuthorName);
      await createNewRecipe(data.Item, newAuthorSub, newAuthorName);
      return {
        statusCode: 200,
        body: JSON.stringify({message: 'Recipe shared !'}),
      };
    } else {
      console.log('abort');
      return {
        statusCode: 402,
        body: JSON.stringify({message: 'Recipe already shared'}),
      };
    }
  } catch (error) {
    console.log('error getting first entry data' + error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'error getting first entry data ' + error,
      }),
    };
  }
};

const updateOriginalRecipe = async (recipeId, newAuthorName) => {
  const updatedRecipe = {
    TableName: 'Recipe-kaixblblyvanhhrzha4lvottay-dev',
    Key: {
      id: recipeId,
    },
    UpdateExpression:
      'SET #sharedWith = list_append(if_not_exists(#sharedWith, :empty_list), :newAuthor)',
    ExpressionAttributeNames: {
      '#sharedWith': 'sharedWith',
    },
    ExpressionAttributeValues: {
      ':newAuthor': [newAuthorName],
      ':empty_list': [], // Used to initialize the list if it doesn't exist
    },
    ReturnValues: 'UPDATED_NEW',
  };
  try {
    const updatedRecipeDone = await dynamodb.update(updatedRecipe).promise();
    console.log('updatedRecipeDone:', updatedRecipeDone);
  } catch (error) {
    console.log('error updating', error);
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'Error updating recipe ' + error}),
    };
  }
};

const createNewRecipe = async (data, newAuthorSub, newAuthorName) => {
  const currentTime = new Date().toISOString();
  const newRecipe = {
    TableName: 'Recipe-kaixblblyvanhhrzha4lvottay-dev',
    Item: {
      id: data.id + newAuthorName,
      name: data.name,
      category: data.category,
      image: data.image,
      servings: data.servings,
      ingredients: data.ingredients,
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      instructions: data.instructions,
      authors: `${newAuthorSub}::${newAuthorName}`,
      originated: data.id,
      createdAt: currentTime,
      updatedAt: currentTime, 
    },
  };

  try {
    const createdRecipe = await dynamodb.put(newRecipe).promise();
    console.log('createdRecipe', createdRecipe);
  } catch (error) {
    console.log('error creating', error);
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'Error creating recipe ' + error}),
    };
  }
};
