const AWS = require('aws-sdk');

const getTasks = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamoDb
    .scan({
      TableName: 'TaskTable',
    })
    .promise();
  const tasks = result.Items;
  console.log(tasks);
  return {
    status: 200,
    body: { tasks },
  };
};

module.exports = {
  getTasks,
};
