// get promise.
export default async function fetching(url) {
  return fetch(url).then((response) => response.json());
}
