// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Picture Ethiopia Platform",
      version: "1.0.0",
      description: "An API for Picture Ethiopia Platform",
    },
    servers: [
      {
        url: "",
        description: "Production Server",
      },
      {
        url: "http://localhost:8000/api/",
        description: "Development Server",
      },
    ],
  },
  // this api docs should be standalone files.
  apis: ["./Documentations/*.txt"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
