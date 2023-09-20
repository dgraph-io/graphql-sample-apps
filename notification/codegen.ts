
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://blue-surf-1220033.us-east-1.aws.cloud.dgraph.io/graphql",
  documents: "src/**/*.ts",
  generates: {
    "./src/gql/": {
      preset: "client",
      presetConfig: {
       fragmentMasking: false
     },
      plugins: []
    }
  }
};

export default config;
