module.exports = {
    client: {
      service: {
        name: 'discuss-dev',
        url: 'https://discuss-dev.us-west-2.aws.cloud.dgraph.io/graphql',
      },
      includes: ["src/**/operations.graphql", "deploy/**/operations.graphql", "deploy/**/*.auth.graphql"],
      excludes: ["src/**/*.{ts}", "deploy/**/*.{ts}"]
    }
  };
