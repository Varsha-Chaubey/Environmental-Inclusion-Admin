import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "scienceAndEducation",
  initialState: {
    loading: false,
    scienceAndEducationItems: {},
    scienceAndEducationCategoriesItems: {},
  },
  reducers: {
    scienceAndEducationRequested: (misc, action) => {
      misc.loading = true;
    },
    scienceAndEducationReceived: (misc, action) => {
      misc.scienceAndEducationItems = action.payload;
      misc.loading = false;
    },
    scienceAndEducationFailed: (misc, action) => {
      misc.loading = false;
    },

    scienceAndEducationCatRequested: (misc, action) => {
      misc.loading = true;
    },
    scienceAndEducationCatReceived: (misc, action) => {
      misc.scienceAndEducationCategoriesItems = action.payload;
      misc.loading = false;
    },
    scienceAndEducationCatFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const {
  scienceAndEducationRequested,
  scienceAndEducationReceived,
  scienceAndEducationFailed,
  scienceAndEducationCatRequested,
  scienceAndEducationCatReceived,
  scienceAndEducationCatFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators

const baseUrl = "scienceAndEducation";
//
export const getScienceAndEducation = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}?isActive=${params.isActive}&keyword=${params.keyword}&regions=${params.regions}&species=${params.species}&organizations=${params.organizations}&category=${params.category}&sort=${params.sort}&order=${params.order}&page=${params.page}`,
      method: "get",
      callback,
      onStart: scienceAndEducationRequested.type,
      onSuccess: scienceAndEducationReceived.type,
      onError: scienceAndEducationFailed.type,
    })
  );
};

export const getScienceAndEducationCategory =
  (params, callback) => (dispatch) => {
    return dispatch(
      apiCallBegan({
        url: `${baseUrl}/category?isActive=${params.isActive}&keyword=${params.keyword}&sort=${params.sort}&order=${params.order}&page=${params.page}`,
        method: "get",
        callback,
        onStart: scienceAndEducationCatRequested.type,
        onSuccess: scienceAndEducationCatReceived.type,
        onError: scienceAndEducationCatFailed.type,
      })
    );
  };

export const addScienceAndEducationData = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "POST",
      data,
      callback,
    })
  );
};

export const addScienceAndEducationCateoryData =
  (data, callback) => (dispatch) => {
    return dispatch(
      apiCallBegan({
        url: `${baseUrl}/category`,
        method: "POST",
        data,
        callback,
      })
    );
  };

export const updateScienceAndEducation =
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

export const updateScienceAndEducationCateory =
  (params, data, callback) => (dispatch) => {
    return dispatch(
      apiCallBegan({
        url: `${baseUrl}/category/${params}`,
        method: "PUT",
        data,
        callback,
      })
    );
  };
export const deleteScienceAndEducation = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "DELETE",
      callback,
    })
  );
};

export const deleteScienceAndEducationCategory =
  (params, callback) => (dispatch) => {
    return dispatch(
      apiCallBegan({
        url: `${baseUrl}/category/${params}`,
        method: "DELETE",
        callback,
      })
    );
  };

export const getScienceAndEducationListing = createSelector(
  (state) => state.entities.scienceAndEducation,
  (scienceAndEducation) => scienceAndEducation
);
