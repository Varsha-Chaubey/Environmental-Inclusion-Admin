import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "zoosAndwildlife",
  initialState: {
    loading: false,
    zoosItems: {},
  },
  reducers: {
    zoosRequested: (misc, action) => {
      misc.loading = true;
    },
    zoosReceived: (misc, action) => {
      misc.zoosItems = action.payload;
      misc.loading = false;
    },
    zoosFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const { zoosRequested, zoosReceived, zoosFailed } = slice.actions;
export default slice.reducer;

// Action Creators

const baseUrl = "zoo";
//
export const getZoosListing = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}?isActive=${params.isActive}&keyword=${params.keyword}&regions=${params.regions}&species=${params.species}&organizations=${params.organizations}&sort=${params.sort}&order=${params.order}&page=${params.page}`,
      method: "get",
      callback,
      onStart: zoosRequested.type,
      onSuccess: zoosReceived.type,
      onError: zoosFailed.type,
    })
  );
};

export const addZooData = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "POST",
      data,
      callback,
    })
  );
};

export const updateZoo = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "PUT",
      data,
      callback,
    })
  );
};
export const deleteZoo = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "DELETE",
      callback,
    })
  );
};

export const getZoosAndWildlifeListing = createSelector(
  (state) => state.entities.zoosAndwildlife,
  (zoosAndwildlife) => zoosAndwildlife
);
