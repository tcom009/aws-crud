const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const addTask = async (event) => {
    const parsedEvent= JSON.parse(event)
    console.log(parsedEvent)
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  //   const { title, description } = {title:"Title", description:"some description"};
  const { title, description } = JSON.parse(event.body);
  const createdAt = new Date();
  const id = v4();
  const cleanedData = {
    id,
    title,
    description,
    createdAt,
  };
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
