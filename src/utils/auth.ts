const TOKEN_KEY = "token";
const USER_KEY = "user";

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `token=${token}; path=/; max-age=86400`;
};

export const getToken = () => {
  const localToken = localStorage.getItem(TOKEN_KEY);
  if (localToken) {
    return localToken;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; token=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() ?? null;
  }

  return null;
};

export const setUser = (user: unknown) => {
  if (!user || typeof user !== "object") {
    return;
  }

  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
};

export const logout = () => {
  clearAuth();
};

export const isAuthenticated = () => !!getToken();