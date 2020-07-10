const { version } = require('../../package.json');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Servit API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/Vectormike/service-app',
    },
  },
  servers: [
    {
      url: `https://servit-api.herokuapp.com/v1`,
    },
  ],
};

module.exports = swaggerDef;
