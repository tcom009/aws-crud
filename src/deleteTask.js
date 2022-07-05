const AWS = require('aws-sdk');

const deleteTask = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  await dynamoDb
    .delete({
      TableName: 'TaskTable',
      Key: { id },
    })
    .promise();
  return {
    status: 200,
    body: JSON.stringify('Task removed successfully'),
  };
};

module.exports = {
  deleteTask,
};
