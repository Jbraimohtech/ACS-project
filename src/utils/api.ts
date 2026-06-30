export const API_BASE = "https://ambchapcorps.org/api";
console.log("API_BASE:", API_BASE);

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
