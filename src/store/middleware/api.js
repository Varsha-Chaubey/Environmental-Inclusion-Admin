import axios from "axios";
import { clearAllToken, setToken } from "../../utils/localStorageServices";
import * as actions from "../api";
const UNAUTHORIZED = 401;
// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const { status } = error.response;
//     if (status === UNAUTHORIZED) {
//       const apiUrl = error.request.responseURL.split("/");
//       if (
//         apiUrl[apiUrl.length - 1] !== "refreshToken" &&
//         !originalRequest._retry
//       ) {
//         originalRequest._retry = true;
//         const headers = { "X-API-KEY": `${process.env.REACT_APP_TOKEN}` };
//         headers["refreshToken"] = localStorage.getItem("x-refresh-token");
//         try {
//           const response = await axios.request({
//             baseURL: process.env.REACT_APP_APIBASE,
//             headers,
//             url: "admin/refreshToken",
//             method: "POST",
//           });
//           setToken(false, response.data.jwt);
//           axios.defaults.headers.common["Authorization"] = response.data.jwt;
//           originalRequest.headers["Authorization"] = response.data.jwt;
//           return axios(originalRequest);
//         } catch (error) {
//           clearAllToken();
//           window.location.href = "/signin";
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    const {
      url,
      method,
      data,
      params,
      onStart,
      onSuccess,
      onError,
      callback = false,
    } = action.payload;
    if (onStart) dispatch({ type: onStart });

    next(action);

    const headers = { "X-API-KEY": `${process.env.REACT_APP_TOKEN}` };

    if (localStorage.getItem("x-auth-token")) {
      headers.Authorization = `${localStorage.getItem("x-auth-token")}`;
    }
    //else if (localStorage.getItem("x-auth-token-doctor")) {
    //   headers["x-auth-token"] = localStorage.getItem("x-auth-token-doctor");
    // }

    try {
      const response = await axios.request({
        baseURL: process.env.REACT_APP_APIBASE,
        headers,
        url,
        method,
        params,
        data,
      });
      // General
      dispatch(actions.apiCallSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
      if (callback) callback(response);
    } catch (error) {
      // General
      dispatch(actions.apiCallFailed(error.message));
      // Specific
      if (onError) dispatch({ type: onError, payload: error });
      if (callback) callback(error.response);
      if (error.response.status === 401) {
        window.location.href = "/signin";
      }
    }
  };

export default api;
