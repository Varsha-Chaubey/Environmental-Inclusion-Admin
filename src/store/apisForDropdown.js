import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "apisForDropdown",
  initialState: {
    loading: false,
    regionItems: {},
    wetMarket: {},
    speciesItems: {},
    organizationsItems: {},
    zooItems: {},
    blogCategoryItems: {},
    speciesCategoryItems: {},
    speciesDangerLevelItems: {},
    newsCategoryItems: {},
    scienceAndEducationCategoryItems: {},
    countriesItem:{},
    usStateItems:{},
    usCitiesItems:{},
  
  },
  reducers: {
    regionRequested: (misc, action) => {
      misc.loading = true;
    },
    regionReceived: (misc, action) => {
      misc.regionItems = action.payload;
      misc.loading = false;
    },
    regionFailed: (misc, action) => {
      misc.loading = false;
    },

    wetMarketRequested: (misc, action) => {
      misc.loading = true;
    },
    wetMarketReceived: (misc, action) => {
      misc.wetMarketItems = action.payload;
      misc.loading = false;
    },
    wetMarketFailed: (misc, action) => {
      misc.loading = false;
    },

    speciesRequested: (misc, action) => {
      misc.loading = true;
    },
    speciesReceived: (misc, action) => {
      misc.speciesItems = action.payload;
      misc.loading = false;
    },
    speciesFailed: (misc, action) => {
      misc.loading = false;
    },

    organizationsRequested: (misc, action) => {
      misc.loading = true;
    },
    organizationsReceived: (misc, action) => {
      misc.organizationsItems = action.payload;
      misc.loading = false;
    },
    organizationsFailed: (misc, action) => {
      misc.loading = false;
    },

    zooRequested: (misc, action) => {
      misc.loading = true;
    },
    zooReceived: (misc, action) => {
      misc.zooItems = action.payload;
      misc.loading = false;
    },
    zooFailed: (misc, action) => {
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

    speciesCategoryRequested: (misc, action) => {
      misc.loading = true;
    },
    speciesCategoryReceived: (misc, action) => {
      misc.speciesCategoryItems = action.payload;
      misc.loading = false;
    },
    speciesCategoryFailed: (misc, action) => {
      misc.loading = false;
    },

    speciesDangerLevelRequested: (misc, action) => {
      misc.loading = true;
    },
    speciesDangerLevelReceived: (misc, action) => {
      misc.speciesDangerLevelItems = action.payload;
      misc.loading = false;
    },
    speciesDangerLevelFailed: (misc, action) => {
      misc.loading = false;
    },

    newsCategoryRequested: (misc, action) => {
      misc.loading = true;
    },
    newsCategoryReceived: (misc, action) => {
      misc.newsCategoryItems = action.payload;
      misc.loading = false;
    },
    newsCategoryFailed: (misc, action) => {
      misc.loading = false;
    },

    scienceAndEducationCategoryRequested: (misc, action) => {
      misc.loading = true;
    },
    scienceAndEducationCategoryReceived: (misc, action) => {
      misc.scienceAndEducationCategoryItems = action.payload;
      misc.loading = false;
    },
    scienceAndEducationCategoryFailed: (misc, action) => {
      misc.loading = false;
    },

    countryRequested: (misc, action) => {
      misc.loading = true;
    },
    countryReceived: (misc, action) => {
      misc.countriesItem = action.payload;
      misc.loading = false;
    },
    countryFailed: (misc, action) => {
      misc.loading = false;
    },

    usStateRequested: (misc, action) => {
      misc.loading = true;
    },
    usStateReceived: (misc, action) => {
      misc.usStateItems = action.payload;
      misc.loading = false;
    },
    usStateFailed: (misc, action) => {
      misc.loading = false;
    },

    usCitiesRequested: (misc, action) => {
      misc.loading = true;
    },
    usCitiesReceived: (misc, action) => {
      misc.usCitiesItems = action.payload;
      misc.loading = false;
    },
    usCitiesFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const {
  regionRequested,
  regionReceived,
  regionFailed,
  wetMarketRequested,
  wetMarketReceived,
  wetMarketFailed,
  speciesRequested,
  speciesReceived,
  speciesFailed,
  organizationsRequested,
  organizationsReceived,
  organizationsFailed,
  zooRequested,
  zooReceived,
  zooFailed,
  blogCategoryRequested,
  blogCategoryReceived,
  blogCategoryFailed,
  speciesCategoryRequested,
  speciesCategoryReceived,
  speciesCategoryFailed,
  speciesDangerLevelRequested,
  speciesDangerLevelReceived,
  speciesDangerLevelFailed,
  newsCategoryRequested,
  newsCategoryReceived,
  newsCategoryFailed,
  scienceAndEducationCategoryRequested,
  scienceAndEducationCategoryReceived,
  scienceAndEducationCategoryFailed,
  countryRequested,
  countryReceived,
  countryFailed,
  usStateRequested,
  usStateReceived,
  usStateFailed,
  usCitiesRequested,
  usCitiesReceived,
  usCitiesFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const BaseUrl = "dropdown";
export const getRegionDropdown = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `region/${BaseUrl}`,
      method: "get",
      callback,
      onStart: regionRequested.type,
      onSuccess: regionReceived.type,
      onError: regionFailed.type,
    }),
  );
};

export const getWetMarketDropdown = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `wetMarket/${BaseUrl}`,
      method: "get",
      callback,
      onStart: wetMarketRequested.type,
      onSuccess: wetMarketReceived.type,
      onError: wetMarketFailed.type,
    }),
  );
};

export const getSpeciesDropdown = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `species/${BaseUrl}`,
      method: "get",
      callback,
      onStart: speciesRequested.type,
      onSuccess: speciesReceived.type,
      onError: speciesFailed.type,
    }),
  );
};

export const getOrganizationDropdown = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `organization/${BaseUrl}`,
      method: "get",
      callback,
      onStart: organizationsRequested.type,
      onSuccess: organizationsReceived.type,
      onError: organizationsFailed.type,
    }),
  );
};

export const getZooDropdown = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `zoo/${BaseUrl}`,
      method: "get",
      callback,
      onStart: zooRequested.type,
      onSuccess: zooReceived.type,
      onError: zooFailed.type,
    }),
  );
};

// Categories

export const getBlogCategoryDropdown = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `blog/category/${BaseUrl}`,
      method: "get",
      callback,
      onStart: blogCategoryRequested.type,
      onSuccess: blogCategoryReceived.type,
      onError: blogCategoryFailed.type,
    }),
  );
};

export const getSpeciesCategoryDropdown = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `species/category/${BaseUrl}`,
      method: "get",
      callback,
      onStart: speciesCategoryRequested.type,
      onSuccess: speciesCategoryReceived.type,
      onError: speciesCategoryFailed.type,
    }),
  );
};

export const getSpeciesDangerLevelDropdown = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `species/dangerLevel/${BaseUrl}`,
      method: "get",
      callback,
      onStart: speciesDangerLevelRequested.type,
      onSuccess: speciesDangerLevelReceived.type,
      onError: speciesDangerLevelFailed.type,
    }),
  );
};

export const getNewsCategoryDropdown = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `news/category/${BaseUrl}`,
      method: "get",
      callback,
      onStart: newsCategoryRequested.type,
      onSuccess: newsCategoryReceived.type,
      onError: newsCategoryFailed.type,
    }),
  );
};

export const getScienceAndEducationCategoryDropdown = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `scienceAndEducation/category/${BaseUrl}`,
      method: "get",
      callback,
      onStart: scienceAndEducationCategoryRequested.type,
      onSuccess: scienceAndEducationCategoryReceived.type,
      onError: scienceAndEducationCategoryFailed.type,
    }),
  );
};

export const getCountriesDropdown = (callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `country/${BaseUrl}`,
      method: "get",
      callback,
      onStart: countryRequested.type,
      onSuccess: countryReceived.type,
      onError: countryFailed.type,
    }),
  );
};

export const getUsStateDropdown = (param,callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `country/states/${param.id}`,
      method: "get",
      callback,
      onStart: usStateRequested.type,
      onSuccess: usStateReceived.type,
      onError: usStateFailed.type,
    }),
  );
};

export const getUsCitiesDropdown = (param,callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `country/cities/${BaseUrl}/${param.id}`,
      method: "get",
      callback,
      onStart: usCitiesRequested.type,
      onSuccess: usCitiesReceived.type,
      onError: usCitiesFailed.type,
    }),
  );
};

export const getapisForDropdown = createSelector(
  (state) => state.entities.apisForDropdown,
  (apisForDropdown) => apisForDropdown,
);
