import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "news",
  initialState: {
    loading: false,
    newsItem: {},
    newsCategoryItem: {},
  },
  reducers: {
    newsRequested: (misc, action) => {
      misc.loading = true;
    },
    newsReceived: (misc, action) => {
      misc.newsItem = action.payload;
      misc.loading = false;
    },
    newsFailed: (misc, action) => {
      misc.loading = false;
    },

    newsCategoryRequested: (misc, action) => {
      misc.loading = true;
    },
    newsCategoryReceived: (misc, action) => {
      misc.newsCategoryItem = action.payload;
      misc.loading = false;
    },
    newsCategoryFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const {
  newsRequested,
  newsReceived,
  newsFailed,
  newsCategoryRequested,
  newsCategoryReceived,
  newsCategoryFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators

const baseUrl = "news";

export const getNewsListing = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}?isActive=${params.isActive}&keyword=${params.keyword}&regions=${params.regions}&species=${params.species}&organizations=${params.organizations}&categories=${params.category}&zoos=${params.zoos}&sort=${params.sort}&order=${params.order}&page=${params.page}`,
      method: "get",
      callback,
      onStart: newsRequested.type,
      onSuccess: newsReceived.type,
      onError: newsFailed.type,
    }),
  );
};

export const addNewsData = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "POST",
      data,
      callback,
    }),
  );
};

export const updateNewsData = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "PUT",
      data,
      callback,
    }),
  );
};
export const deleteNewsData = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "DELETE",
      callback,
    }),
  );
};

export const getNewsCategoryListing = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/category`,
      method: "get",
      callback,
      params,
      onStart: newsCategoryRequested.type,
      onSuccess: newsCategoryReceived.type,
      onError: newsCategoryFailed.type,
    }),
  );
};

export const addNewsCategoryData = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/category`,
      method: "POST",
      data,
      callback,
    }),
  );
};

export const updateNewsCategoryData = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/category/${params}`,
      method: "PUT",
      data,
      callback,
    }),
  );
};
export const deleteNewsCategoryData = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/category/${params}`,
      method: "DELETE",
      callback,
    }),
  );
};
export const getNews = createSelector(
  (state) => state.entities.news,
  (news) => news,
);
