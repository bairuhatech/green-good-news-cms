// ./config/env/production/plugins.js

module.exports = {
    graphql: {
      config: {
        endpoint: "/graphql",
        shadowCRUD: true,
        playgroundAlways: true,
        depthLimit: 10,
        amountLimit: 100,
        apolloServer: {
          tracing: false,
          introspection: true,
        },
      },
    },
  };
  