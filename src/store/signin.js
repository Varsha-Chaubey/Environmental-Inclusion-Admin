import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "sigin",
  initialState: {
    profile: {},
    loading: false,
  },
  reducers: {
    profileRequested: (misc, action) => {
      misc.loading = true;
    },
    profileReceived: (misc, action) => {
      misc.profile = action.payload.data;
      misc.loading = false;
    },
    profileRequestFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const { profileRequestFailed, profileReceived, profileRequested } =
  slice.actions;
export default slice.reducer;

// Action Creators
const authUrl = "auth/admin/login";

export const signIn = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: authUrl,
      method: "POST",
      data,
      callback,
      onStart: profileRequested.type,
      onSuccess: profileReceived.type,
      onError: profileRequestFailed.type,
    })
  );
};
export const getUser = createSelector(
  (state) => state.entities.users,
  (users) => users
);
