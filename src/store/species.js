import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "species",
  initialState: {
    loading: false,
    speciesItem: {},
    dangerLevelSpeciesData: {},
    speciesCategoriesData: {},
  },
  reducers: {
    speciesListRequested: (misc, action) => {
      misc.loading = true;
    },
    speciesListReceived: (misc, action) => {
      misc.speciesItem = action.payload;
      misc.loading = false;
    },
    speciesListFailed: (misc, action) => {
      misc.loading = false;
    },

    dangerLevelSpeciesRequested: (misc, action) => {
      misc.loading = true;
    },
    dangerLevelSpeciesReceived: (misc, action) => {
      misc.dangerLevelSpeciesData = action.payload;
      misc.loading = false;
    },
    dangerLevelSpeciesFailed: (misc, action) => {
      misc.loading = false;
    },

    speciesCategoryRequested: (misc, action) => {
      misc.loading = true;
    },
    speciesCategoryReceived: (misc, action) => {
      misc.speciesCategoriesData = action.payload;
      misc.loading = false;
    },
    speciesCategoryFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const {
  speciesListRequested,
  speciesListReceived,
  speciesListFailed,
  dangerLevelSpeciesRequested,
  dangerLevelSpeciesReceived,
  dangerLevelSpeciesFailed,
  speciesCategoryRequested,
  speciesCategoryReceived,
  speciesCategoryFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators

const baseUrl = "species";

export const getSpeciesList = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}?isActive=${params.isActive}&keyword=${params.keyword}&category=${params.category}&dangerLevel=${params.dangerLevel}&regions=${params.regions}&sort=${params.sort}&order=${params.order}&page=${params.page}`,
      method: "get",
      callback,
      onStart: speciesListRequested.type,
      onSuccess: speciesListReceived.type,
      onError: speciesListFailed.type,
    })
  );
};

export const addSpeciesData = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "POST",
      data,
      callback,
    })
  );
};

export const updateSpecies = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "PUT",
      data,
      callback,
    })
  );
};
export const deleteSpecies = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "DELETE",
      callback,
    })
  );
};
export const getDangerLevelSpeciesList = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/dangerLevel?isActive=${params.isActive}&keyword=${params.keyword}&sort=${params.sort}&order=${params.order}&page=${params.page}`,
      method: "get",
      callback,
      onStart: dangerLevelSpeciesRequested.type,
      onSuccess: dangerLevelSpeciesReceived.type,
      onError: dangerLevelSpeciesFailed.type,
    })
  );
};

export const addDangerLevelSpecies = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/dangerLevel`,
      method: "POST",
      data,
      callback,
    })
  );
};

export const updateDangerLevelSpecies =
  (params, data, callback) => (dispatch) => {
    return dispatch(
      apiCallBegan({
        url: `${baseUrl}/dangerLevel/${params}`,
        method: "PUT",
        data,
        callback,
      })
    );
  };
export const deleteDangerLevelSpecies = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/dangerLevel/${params}`,
      method: "DELETE",
      callback,
    })
  );
};

export const getSpeciesCategories = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/category?isActive=${params.isActive}&keyword=${params.keyword}&sort=${params.sort}&order=${params.order}&page=${params.page}`,
      method: "get",
      callback,
      onStart: speciesCategoryRequested.type,
      onSuccess: speciesCategoryReceived.type,
      onError: speciesCategoryFailed.type,
    })
  );
};

export const addSpeciesMedia = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/addMedia/${params}`,
      method: "POST",
      data,
      callback,
    })
  );
};

export const addSpeciesCategory = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/category`,
      method: "POST",
      data,
      callback,
    })
  );
};

export const updateSpeciesCategory = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/category/${params}`,
      method: "PUT",
      data,
      callback,
    })
  );
};

export const deleteSpeciesCategory = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/category/${params}`,
      method: "DELETE",
      callback,
    })
  );
};

export const deleteSpeciesMedia = (params,data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/deleteMedia/${params}`,
      method: "POST",
      callback,
      data,
    })
  );
};

export const getSpecies = createSelector(
  (state) => state.entities.species,
  (species) => species
);
