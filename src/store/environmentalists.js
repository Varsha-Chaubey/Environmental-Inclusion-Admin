import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "environmentalist",
  initialState: {
    loading: false,
    environmentalistItems: {},
  },
  reducers: {
    environmentalistRequested: (misc, action) => {
      misc.loading = true;
    },
    environmentalistReceived: (misc, action) => {
      misc.environmentalistItems = action.payload;
      misc.loading = false;
    },
    environmentalistFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const { environmentalistRequested, environmentalistReceived, environmentalistFailed } = slice.actions;
export default slice.reducer;

// Action Creators

const baseUrl = "environmentalist";
// 
export const getEnvironmentalist = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "get",
      callback,
      params,
      onStart: environmentalistRequested.type,
      onSuccess: environmentalistReceived.type,
      onError: environmentalistFailed.type,
    }),
  );
};

export const addEnvironmentalistData = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "POST",
      data,
      callback,
    })
  );
};

export const updateEnvironmentalist =
  (params, data, callback) => (dispatch) => {
    return dispatch(
      apiCallBegan({
        url: `${baseUrl}/${params}`,
        method: "PUT",
        data,
        callback,
      })
    );
  };
export const deleteEnvironmentalist = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "DELETE",
      callback,
    }),
  );
};

export const getEnvironmentalistListing = createSelector(
  (state) => state.entities.environmentalist,
  (environmentalist) => environmentalist,
);
