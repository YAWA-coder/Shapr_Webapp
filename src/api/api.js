const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const getToken   = () => localStorage.getItem("access_token");
export const setToken   = (t) => localStorage.setItem("access_token", t);
export const clearToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

async function authFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    let errMsg = `HTTP ${res.status}`;
    try { errMsg = JSON.stringify(await res.json()); } catch (_) {}
    throw new Error(errMsg);
  }
  return res.json();
}

export async function register({ username, email, password }) {
  return authFetch("/api/user/register/", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}
export async function login({ username, password }) {
  const data = await authFetch("/api/user/login/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  setToken(data.access);
  if (data.refresh) localStorage.setItem("refresh_token", data.refresh);
  return data;
}
export async function fetchProfile() {
  return authFetch("/api/user/profile/");
}
export async function startSession({ subject, productivity_rating = 0 }) {
  return authFetch("/api/study_session/start/", {
    method: "POST",
    body: JSON.stringify({ subject, productivity_rating }),
  });
}
export async function endSession() {
  return authFetch("/api/study_session/end/", { method: "POST" });
}
export async function fetchHistory() {
  return authFetch("/api/study_session/history/");
}
export async function deleteSession(id) {
  return authFetch(`/api/study_session/details/${id}/`, { method: "DELETE" });
}