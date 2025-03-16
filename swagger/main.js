const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

const swaggerFile = path.resolve(__dirname, './swagger.json');
const swaggerData = JSON.parse(fs.readFileSync(swaggerFile, 'utf8'));

const Paths = {
  "/user/register": JSON.parse(fs.readFileSync(path.resolve(__dirname, './paths/register.json'), 'utf8')),
  "/user/login": JSON.parse(fs.readFileSync(path.resolve(__dirname, './paths/login.json'), 'utf8')),
  "/user/logout": JSON.parse(fs.readFileSync(path.resolve(__dirname, './paths/logout.json'), 'utf8')),
};

swaggerData.paths = Paths

const swaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerData));
  console.log(`Swagger docs running at http://localhost:${port}/api-docs`);
};

module.exports = { swaggerDocs };
