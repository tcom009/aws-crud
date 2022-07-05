const AWS = require('aws-sdk');

const updateTask = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { done, title, description } = JSON.parse(event.body);
  await dynamoDb
    .update({
      TableName: 'TaskTable',
      Key: { id },
      UpdateExpression:
        'set done = :done, title = :title, description = :description',
      ExpressionAttributeValues: {
        ':done': done,
        ':title': title,
        ':description': description,
      },
      ReturnValues: 'ALL_NEW',
    })
    .promise();

  return {
    status: 200,
    body: JSON.stringify('Task updated successfully'),
  };
};

module.exports = {
  updateTask,
};
