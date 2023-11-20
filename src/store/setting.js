import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "setting",
  initialState: {
    loading: false,
    settingDetails: {},
    subscriberDetails: {},
  },
  reducers: {
    settingRequested: (misc, action) => {
      misc.loading = true;
    },
    settingReceived: (misc, action) => {
      misc.settingDetails = action.payload;
      misc.loading = false;
    },
    settingFailed: (misc, action) => {
      misc.loading = false;
    },

    subscriberRequested: (misc, action) => {
      misc.loading = true;
    },
    subscriberReceived: (misc, action) => {
      misc.subscriberDetails = action.payload;
      misc.loading = false;
    },
    subscriberFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const {
  settingRequested,
  settingReceived,
  settingFailed,
  subscriberRequested,
  subscriberReceived,
  subscriberFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators

const baseUrl = "setting";

export const getSettingListing = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "get",
      callback,
      onStart: settingRequested.type,
      onSuccess: settingReceived.type,
      onError: settingFailed.type,
    })
  );
};

export const getSubscriberListing = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/subscriber`,
      method: "get",
      callback,
      params,
      onStart: subscriberRequested.type,
      onSuccess: subscriberReceived.type,
      onError: subscriberFailed.type,
    })
  );
};

export const addSettingData = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "POST",
      data,
      callback,
    })
  );
};

export const getSetting = createSelector(
  (state) => state.entities.setting,
  (setting) => setting
);
