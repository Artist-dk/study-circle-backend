const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Study Circle API",
      version: "1.0.0",
      description: "API documentation for course management",
    },
    servers: [
      {
        url: "http://localhost:8081",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log("📘 Swagger docs available at http://localhost:8081/api-docs");
};

module.exports = setupSwaggerDocs;
