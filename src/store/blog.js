import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "blogs",
  initialState: {
    loading: false,
    blogItem: {},
    blogCategoryItems: {},
  },
  reducers: {
    blogRequested: (misc, action) => {
      misc.loading = true;
    },
    blogReceived: (misc, action) => {
      misc.blogItem = action.payload;
      misc.loading = false;
    },
    blogFailed: (misc, action) => {
      misc.loading = false;
    },
    blogCategoryRequested: (misc, action) => {
      misc.loading = true;
    },
    blogCategoryReceived: (misc, action) => {
      misc.blogCategoryItems = action.payload;
      misc.loading = false;
    },
    blogCategoryFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const {
  blogRequested,
  blogReceived,
  blogFailed,
  blogCategoryRequested,
  blogCategoryReceived,
  blogCategoryFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators

const baseUrl = "blog";
//
export const getBlogListing = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}?isActive=${params.isActive}&keyword=${params.keyword}&regions=${params.regions}&species=${params.species}&organizations=${params.organizations}&categories=${params.category}&sort=${params.sort}&order=${params.order}&page=${params.page}`,
      method: "get",
      callback,
      onStart: blogRequested.type,
      onSuccess: blogReceived.type,
      onError: blogFailed.type,
    }),
  );
};

export const addBlogData = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "POST",
      data,
      callback,
    }),
  );
};

export const updateBlogData = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "PUT",
      data,
      callback,
    }),
  );
};
export const deleteBlogData = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "DELETE",
      callback,
    }),
  );
};

export const getBlogCategory = (param, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/category?isActive=${param.isActive}&sort=${param.sort}&order=${param.order}&page=${param.page}&keyword=${param.keyword}`,
      method: "get",
      callback,
      onStart: blogCategoryRequested.type,
      onSuccess: blogCategoryReceived.type,
      onError: blogCategoryFailed.type,
    }),
  );
};

export const addBlogCategory = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/category`,
      method: "POST",
      data,
      callback,
    }),
  );
};

export const updateBlogCategory = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/category/${params}`,
      method: "PUT",
      data,
      callback,
    }),
  );
};
export const deleteBlogCategory = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/category/${params}`,
      method: "DELETE",
      callback,
    }),
  );
};
export const getBlogs = createSelector(
  (state) => state.entities.blogs,
  (blogs) => blogs,
);
