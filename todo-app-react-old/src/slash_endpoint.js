const STORAGE_KEY = "slash-endpoint"

function askForEndpoint() {
  const endpoint = prompt("Please enter your Slash GraphQL Endpoint")
  console.log(endpoint)
  if (endpoint && global.localStorage && endpoint.endsWith("/graphql")) {
    global.localStorage.setItem(STORAGE_KEY, endpoint)
  }
  return endpoint;
}

export function getSlashGraphQLEndpoint() {
  const localStorageEndpoint = global.localStorage && global.localStorage.getItem(STORAGE_KEY);

  if (localStorageEndpoint) {
    return localStorageEndpoint
  }

  const defaultEndpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;
  if(defaultEndpoint) {
    return defaultEndpoint;
  }

  return askForEndpoint();
}

export function changeSlashGraphQLEndpoint() {
  global.localStorage && global.localStorage.removeItem(STORAGE_KEY)
  askForEndpoint();
  window.location.reload()
}
global.changeSlashGraphQLEndpoint = changeSlashGraphQLEndpoint;
