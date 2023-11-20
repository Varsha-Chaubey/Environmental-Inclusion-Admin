import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "users",
  initialState: {
    users: {},
    loading: false,
  },
  reducers: {
    usersRequested: (misc, action) => {
      misc.loading = true;
    },
    usersReceived: (misc, action) => {
      misc.users = action.payload;
      misc.loading = false;
    },
    usersRequestFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const { usersRequested, usersReceived, usersRequestFailed } = slice.actions;
export default slice.reducer;

// Action Creators
const baseUrl = "admin";

export const getUsers = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "get",
      params,
      callback,
      onStart: usersRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type,
    }),
  );
};

export const addUser = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "POST",
      callback,
      data,
    }),
  );
};

export const resetPassword = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/resetPassword`,
      method: "POST",
      callback,
      data,
    }),
  );
};

export const editUser = (id, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${id}`,
      method: "PUT",
      callback,
      data,
    }),
  );
};

export const deleteUser = (id, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${id}`,
      method: "DELETE",
      callback,
    }),
  );
};

export const userListings = createSelector(
  (state) => state.entities.users,
  (users) => users,
);
