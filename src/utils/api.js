const baseUrl = "http://localhost:3001/items";

export function getItems() {
  return fetch(`${baseUrl}`) // No need to add /items again
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
}

// 2. Add a new item
export const addItem = async (newItem) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });
  if (!response.ok) throw new Error("Failed to add item");
  return await response.json();
};

// 3. Delete an item
export const deleteItem = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete item");
};

// api.js
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};
