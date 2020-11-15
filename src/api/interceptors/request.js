export function addAccessToken(initialConfig) {
  const config = initialConfig;
  // const account = loadUserCredentials();
  const authorizationHeader = {};
  // if (account && account.token) {
  //   authorizationHeader = {
  //     ...authorizationHeader,
  //     'X-Auth-Token': account.token,
  //   };
  // }
  config.headers = { ...config.headers, ...authorizationHeader };
  return config;
}

export function onRejected(error) {
  return Promise.reject(error);
}
