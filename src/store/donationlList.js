import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "donationList",
  initialState: {
    loading: false,
    donationList: {},
  },
  reducers: {
    donationRequested: (misc, action) => {
      misc.loading = true;
    },
    donationReceived: (misc, action) => {
      misc.donationList = action.payload;
      misc.loading = false;
    },
    donationFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const { donationRequested, donationReceived, donationFailed } =
  slice.actions;
export default slice.reducer;

// Action Creators

const baseUrl = "donation";

export const getDonationListing = (params,callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "get",
      callback,
      params,
      onStart: donationRequested.type,
      onSuccess: donationReceived.type,
      onError: donationFailed.type,
    })
  );
};

export const getDonations = createSelector(
  (state) => state.entities.donationList,
  (donationList) => donationList
);
