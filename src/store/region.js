import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "regions",
  initialState: {
    loading: false,
    listingRegionsData: {},
    countryData: {},
    stateDetails: {},
  },
  reducers: {
    listingRegionRequested: (misc, action) => {
      misc.loading = true;
    },
    listingRegionReceived: (misc, action) => {
      misc.listingRegionsData = action.payload;
      misc.loading = false;
    },

    listingRegionFailed: (misc, action) => {
      misc.loading = false;
    },

    countryRequested: (misc, action) => {
      misc.loading = true;
    },
    countryRegionReceived: (misc, action) => {
      misc.countryData = action.payload;
      misc.loading = false;
    },
    countryFailed: (misc, action) => {
      misc.loading = false;
    },

    stateDetailsRequested: (misc, action) => {
      misc.loading = true;
    },
    stateDetailsRegionReceived: (misc, action) => {
      misc.stateDetails = action.payload;
      misc.loading = false;
    },
    stateDetailsFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const {
  listingRegionRequested,
  listingRegionReceived,
  listingRegionFailed,
  countryRequested,
  countryRegionReceived,
  countryFailed,
  stateDetailsRequested,
  stateDetailsRegionReceived,
  stateDetailsFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators

const baseUrl = "region";
export const getRegionsListings = (param, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}?isActive=${param.isActive}&sort=${param.sort}&order=${param.order}&keyword=${param.keyword}&country=${param.country}&page=${param.page}`,
      method: "get",
      callback,
      onStart: listingRegionRequested.type,
      onSuccess: listingRegionReceived.type,
      onError: listingRegionFailed.type,
    })
  );
};

export const getCountryData = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "country?sort=name&order=asc",
      method: "get",
      callback,
      onStart: countryRequested.type,
      onSuccess: countryRegionReceived.type,
      onError: countryFailed.type,
    })
  );
};

export const getStateDetails = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `country/states/${params}`,
      method: "get",
      callback,
      onStart: stateDetailsRequested.type,
      onSuccess: stateDetailsRegionReceived.type,
      onError: stateDetailsFailed.type,
    })
  );
};

export const addRegion = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "region",
      method: "POST",
      data,
      callback,
    })
  );
};

export const updateRegion = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `region/${params}`,
      method: "PUT",
      data,
      callback,
    })
  );
};
export const deleteRegionList = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `region/${params}`,
      method: "DELETE",
      callback,
    })
  );
};
export const getRegions = createSelector(
  (state) => state.entities.regions,
  (regions) => regions
);
