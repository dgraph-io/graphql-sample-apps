module.exports = {
    client: {
      service: {
        name: 'local',
        url: 'http://localhost:8080/graphql',
      },
      includes: ["src/**/operations.graphql", "deploy/**/operations.graphql"],
      excludes: ["src/**/*.{ts}", "deploy/**/*.{ts}"]
    }
  };
