module.exports = {
    client: {
      service: {
        name: 'local',
        url: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql',
      },
      includes: ["src/**/operations.graphql", "deploy/**/operations.graphql"],
      excludes: ["src/**/*.{ts}", "deploy/**/*.{ts}"]
    }
  };
