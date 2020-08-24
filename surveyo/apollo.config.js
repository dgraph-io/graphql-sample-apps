require('dotenv').config();

module.exports = {
  client: {
    service: {
      url: process.env.REACT_APP_GRAPHQL_ENDPOINT,
      skipSSLValidation: true,
    },
  },
};
