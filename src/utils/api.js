const baseUrl = "http://localhost:3001/items";

// Centralized response handler
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

// 1. Get all items
export function getItems() {
  return fetch(baseUrl).then(checkResponse);
}

// 2. Add a new item
export const addItem = (newItem) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  }).then(checkResponse);
};

// 3. Delete an item
export const deleteItem = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
};
