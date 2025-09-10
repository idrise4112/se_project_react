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
        Authorization: `Bearer ${token}`,
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
export const deleteItem = (id, token) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

// 4. Like an item
export const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

// 5. Dislike (remove like) from an item
export const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

// 6. Update user profile
export const updateUserProfile = async ({ name, avatar }) => {
  const token = localStorage.getItem("jwt");
  const response = await fetch("http://localhost:3001/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });

  return checkResponse(response);
};
