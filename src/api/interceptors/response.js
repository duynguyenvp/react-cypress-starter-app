export function onFullfilled(response) {
  return Promise.resolve(response);
}

export function onRejected(error) {
  if (error) {
    const { response } = error;
    return Promise.reject(response && response.data);
  }
  return Promise.reject();
}
