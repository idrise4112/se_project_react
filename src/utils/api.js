const baseUrl = "http://localhost:3001/items";

function getItems() {
  return fetch(`${baseUrl}`) // No need to add /items again
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
}

export { getItems };
