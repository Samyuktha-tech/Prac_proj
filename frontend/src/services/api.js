const API_URL = "http://127.0.0.1:8000";

// Common function for sending API requests
const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Something went wrong");
  }

  return data;
};

// DASHBOARD
export const getDashboardStats = () => {
  return apiRequest("/dashboard/stats");
};

// MENU APIs

export const getMenu = () => {
  return apiRequest("/menu");
};

export const getMenuItem = (id) => {
  return apiRequest(`/menu/${id}`);
};

export const createMenu = (item) => {
  return apiRequest("/menu", {
    method: "POST",
    body: JSON.stringify(item),
  });
};

export const updateMenu = (id, item) => {
  return apiRequest(`/menu/${id}`, {
    method: "PUT",
    body: JSON.stringify(item),
  });
};

export const deleteMenu = (id) => {
  return apiRequest(`/menu/${id}`, {
    method: "DELETE",
  });
};

// ORDER APIs

export const getOrders = () => {
  return apiRequest("/orders");
};

export const getOrder = (id) => {
  return apiRequest(`/orders/${id}`);
};

export const createOrder = (order) => {
  return apiRequest("/orders", {
    method: "POST",
    body: JSON.stringify(order),
  });
};

export const updateOrderStatus = (id, status) => {
  return apiRequest(`/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};

export const deleteOrder = (id) => {
  return apiRequest(`/orders/${id}`, {
    method: "DELETE",
  });
};