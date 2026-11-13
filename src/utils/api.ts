const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const storageBaseUrl = import.meta.env.VITE_STORAGE_BASE_URL;

if (!apiBaseUrl || !storageBaseUrl) {
  throw new Error("VITE_API_BASE_URL and VITE_STORAGE_BASE_URL must be configured.");
}

export const API_BASE = apiBaseUrl.replace(/\/+$/, "");
export const STORAGE_BASE_URL = storageBaseUrl.replace(/\/+$/, "");

export const getAuthHeaders = (token?: string | null) => {
  const base: Record<string, string> = {
    Accept: "application/json",
  };

  if (token) {
    base.Authorization = `Bearer ${token}`;
  }

  return base;
};

export default API_BASE;
