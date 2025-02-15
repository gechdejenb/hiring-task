const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Sentiment Analysis API',
    description: 'This API allows users to analyze the sentiment of a given text. It is designed to provide insights into customer feedback for a new product on an e-commerce website.',
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./src/routers/index.ts'];


swaggerAutogen(outputFile, routes, doc);