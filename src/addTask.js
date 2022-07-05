const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');
const addTask = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const { title, description } = event.body;
  const createdAt = new Date();
  const id = v4();
  const cleanedData = {
    id,
    title,
    description,
    createdAt,
    done: false,
  };

  await dynamoDb
    .put({
      TableName: 'TaskTable',
      Item: cleanedData,
    })
    .promise();

  return {
    status: 200,
    body: JSON.stringify(cleanedData),
  };
};

module.exports = {
  addTask: middy(addTask).use(jsonBodyParser()),
};
