export const setToken = (token: string) => {
  document.cookie =
    `token=${token}; path=/; max-age=86400`;
};

export const getToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; token=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }

  return null;
};

export const logout = () => {
  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
};