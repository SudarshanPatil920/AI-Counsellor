const API_BASE = "https://ai-counsellor-coral-sigma.vercel.app/";

export const api = async (url, method = "GET", body) => {
  const token = localStorage.getItem("token");

  const res = await fetch(API_BASE + url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  // 🚨 VERY IMPORTANT: handle auth failure globally
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/"; // redirect to login
    return;
  }

  if (!res.ok) {
    throw data;
  }

  return data;
};
