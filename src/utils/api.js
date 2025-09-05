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
export const addItem = async (newItem, token) => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 👈 This is where the token goes
      },
      body: JSON.stringify(newItem),
    });
    return await checkResponse(response);
  } catch (error) {
    console.error("Failed to add item:", error);
    throw error;
  }
};

// 3. Delete an item
export const deleteItem = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
};
