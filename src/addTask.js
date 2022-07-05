const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const addTask = async (event) => {
  console.log(event);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const { title, description } = JSON.parse(event.body);
  const createdAt = new Date();
  const id = v4();
  const cleanedData = {
    id,
    title,
    description,
    createdAt,
  };
  console.log(cleanedData);
  await dynamoDb
    .put({
      TableName: 'TaskTable',
      Item: cleanedData,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(cleanedData),
  };
};

module.exports = {
  addTask,
};
