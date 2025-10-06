const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/";

function stripTrailingSlash(url) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}
const BASE_URL = stripTrailingSlash(BASE); 

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });
  // handle global 401/403 here
  return res;
}
