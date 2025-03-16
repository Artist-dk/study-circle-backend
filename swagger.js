const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Study Circle API",
      version: "1.0.0",
      description: "API documentation for course management platform",
      contact: {
        name: "Support Team",
        email: "support@studycircle.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8081",
        description: "Development server",
      },
    ],
  },
  apis: ["./router.js", "./controllers/*.js"], // Make sure this covers all needed files
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log("📘 Swagger docs available at http://localhost:8081/api-docs");
};

module.exports = setupSwaggerDocs;
