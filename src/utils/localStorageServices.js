export const setToken = (refresh, auth) => {
  if (refresh) localStorage.setItem("x-refresh-token", refresh);
  localStorage.setItem("x-auth-token", auth);
};

export const getToken = (type) => {
  if (type === "refresh") return localStorage.getItem("x-refresh-token");
  if (type === "auth") return localStorage.getItem("x-auth-token");
  return false;
};

export const clearAllToken = () => {
  localStorage.clear();
};

export const setProfile = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};
export const getProfile = () => {
  return JSON.parse(localStorage.getItem("data"));
};

export const setRedirectUrl = (data) => {
  localStorage.setItem("redirectUrl", data);
};

export const getRedirectUrl = () => {
  return localStorage.getItem("redirectUrl");
};

export const checkToken = () => {
  const token = localStorage.getItem("x-auth-token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

export const removeKey = (keyName) => {
  localStorage.removeItem(keyName);
};
