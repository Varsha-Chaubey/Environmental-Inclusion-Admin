import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "wetMarket",
  initialState: {
    loading: false,
    wetMarketItem: {},
  },
  reducers: {
    wetMarketRequested: (misc, action) => {
      misc.loading = true;
    },
    wetMarketReceived: (misc, action) => {
      misc.wetMarketItem = action.payload;
      misc.loading = false;
    },
    wetMarketFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const { wetMarketRequested, wetMarketReceived, wetMarketFailed } =
  slice.actions;
export default slice.reducer;

// Action Creators

const baseUrl = "wetMarket";
//
export const getWetMarketListing = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}?isActive=${params.isActive}&keyword=${params.keyword}&regions=${params.regions}&species=${params.species}&organizations=${params.organizations}&sort=${params.sort}&order=${params.order}&page=${params.page}`,
      method: "get",
      callback,
      onStart: wetMarketRequested.type,
      onSuccess: wetMarketReceived.type,
      onError: wetMarketFailed.type,
    })
  );
};

export const addwetMarketData = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "POST",
      data,
      callback,
    })
  );
};

export const updatewetMarket = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "PUT",
      data,
      callback,
    })
  );
};
export const deletewetMarketData = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "DELETE",
      callback,
    })
  );
};

export const getWetMarket = createSelector(
  (state) => state.entities.wetMarket,
  (wetMarket) => wetMarket
);
