import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "organization",
  initialState: {
    loading: false,
    workItem: {},
    teamItem: {},
    partnerItem: {},
    mediaItem: {},
    programItem: {},
    reportsItem: {},
  },
  reducers: {
    organizationRequested: (misc, action) => {
      misc.loading = true;
    },
    organizationReceived: (misc, action) => {
      misc.organizationItem = action.payload;
      misc.loading = false;
    },
    organizationFailed: (misc, action) => {
      misc.loading = false;
    },

    workRequested: (misc, action) => {
      misc.loading = true;
    },
    workReceived: (misc, action) => {
      misc.workItem = action.payload;
      misc.loading = false;
    },
    workFailed: (misc, action) => {
      misc.loading = false;
    },

    teamRequested: (misc, action) => {
      misc.loading = true;
    },
    teamReceived: (misc, action) => {
      misc.teamItem = action.payload;
      misc.loading = false;
    },
    teamFailed: (misc, action) => {
      misc.loading = false;
    },

    partnerRequested: (misc, action) => {
      misc.loading = true;
    },
    partnerReceived: (misc, action) => {
      misc.partnerItem = action.payload;
      misc.loading = false;
    },
    partnerFailed: (misc, action) => {
      misc.loading = false;
    },

    programRequested: (misc, action) => {
      misc.loading = true;
    },
    programReceived: (misc, action) => {
      misc.programItem = action.payload;
      misc.loading = false;
    },
    programFailed: (misc, action) => {
      misc.loading = false;
    },

    mediaRequested: (misc, action) => {
      misc.loading = true;
    },
    mediaReceived: (misc, action) => {
      misc.mediaItem = action.payload;
      misc.loading = false;
    },
    mediaFailed: (misc, action) => {
      misc.loading = false;
    },

    reportsRequested: (misc, action) => {
      misc.loading = true;
    },
    reportsReceived: (misc, action) => {
      misc.reportsItem = action.payload;
      misc.loading = false;
    },
    reportsFailed: (misc, action) => {
      misc.loading = false;
    },
  },
});

export const {
  organizationRequested,
  organizationReceived,
  organizationFailed,

  workRequested,
  workReceived,
  workFailed,

  teamRequested,
  teamReceived,
  teamFailed,

  partnerRequested,
  partnerReceived,
  partnerFailed,

  programRequested,
  programReceived,
  programFailed,

  mediaRequested,
  mediaReceived,
  mediaFailed,

  reportsRequested,
  reportsReceived,
  reportsFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators

const baseUrl = "organization";

export const getOrganizationListing = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}?isActive=${params.isActive}&keyword=${params.keyword}&species=${params.species}&regions=${params.regions}&sort=${params.sort}&order=${params.order}&page=${params.page}&isAddedToDonation=${params.isAddedToDonation} `,
      method: "get",
      callback,
      onStart: organizationRequested.type,
      onSuccess: organizationReceived.type,
      onError: organizationFailed.type,
    })
  );
};

export const addOrganizationData = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}`,
      method: "POST",
      data,
      callback,
    })
  );
};

export const updateOrganization = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "PUT",
      data,
      callback,
    })
  );
};
export const deleteOrganizationData = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/${params}`,
      method: "DELETE",
      callback,
    })
  );
};

// work

export const getWorkListing = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/work?isActive=${params.isActive}&keyword=${params.keyword}&organization=${params.organization}&sort=${params.sort}&order=${params.order}&page=${params.page}`,
      method: "get",
      callback,
      onStart: workRequested.type,
      onSuccess: workReceived.type,
      onError: workFailed.type,
    })
  );
};

export const addWorkData = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/work`,
      method: "POST",
      data,
      callback,
    })
  );
};

export const updateWork = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/work/${params}`,
      method: "PUT",
      data,
      callback,
    })
  );
};
export const deleteWorkData = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/work/${params}`,
      method: "DELETE",
      callback,
    })
  );
};

// team

export const getTeamListing = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/team?isActive=${params.isActive}&keyword=${params.keyword}&organization=${params.organization}&sort=${params.sort}&order=${params.order}&page=${params.page}`,
      method: "get",
      callback,
      onStart: teamRequested.type,
      onSuccess: teamReceived.type,
      onError: teamFailed.type,
    })
  );
};

export const addTeamData = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/team`,
      method: "POST",
      data,
      callback,
    })
  );
};

export const updateteam = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/team/${params}`,
      method: "PUT",
      data,
      callback,
    })
  );
};
export const deleteTeamData = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/team/${params}`,
      method: "DELETE",
      callback,
    })
  );
};

// partner

export const getPartnerListing = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/partner?isActive=${params.isActive}&keyword=${params.keyword}&organization=${params.organization}&sort=${params.sort}&order=${params.order}&page=${params.page}`,
      method: "get",
      callback,
      onStart: partnerRequested.type,
      onSuccess: partnerReceived.type,
      onError: partnerFailed.type,
    })
  );
};

export const addPartnerData = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/partner`,
      method: "POST",
      data,
      callback,
    })
  );
};

export const updatePartner = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/partner/${params}`,
      method: "PUT",
      data,
      callback,
    })
  );
};
export const deletePartnerData = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/partner/${params}`,
      method: "DELETE",
      callback,
    })
  );
};

// program

export const getProgramListing = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/program?isActive=${params.isActive}&keyword=${params.keyword}&organization=${params.organization}&sort=${params.sort}&order=${params.order}&page=${params.page}`,
      method: "get",
      callback,
      onStart: programRequested.type,
      onSuccess: programReceived.type,
      onError: programFailed.type,
    })
  );
};

export const addProgramData = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/program`,
      method: "POST",
      data,
      callback,
    })
  );
};

export const updateProgram = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/program/${params}`,
      method: "PUT",
      data,
      callback,
    })
  );
};
export const deleteProgramData = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/program/${params}`,
      method: "DELETE",
      callback,
    })
  );
};

// reports

export const getReportsListing = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/report?isActive=${params.isActive}&keyword=${params.keyword}&organization=${params.organization}&sort=${params.sort}&order=${params.order}&page=${params.page}`,
      method: "get",
      callback,
      onStart: reportsRequested.type,
      onSuccess: reportsReceived.type,
      onError: reportsFailed.type,
    })
  );
};

export const addReportsData = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/report`,
      method: "POST",
      data,
      callback,
    })
  );
};

export const updateReports = (params, data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/report/${params}`,
      method: "PUT",
      data,
      callback,
    })
  );
};
export const deleteReportsData = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/report/${params}`,
      method: "DELETE",
      callback,
    })
  );
};

// / Media

export const getMediaListing = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/media?isActive=${params.isActive}&organization=${params.organization}&sort=${params.sort}&order=${params.order}&page=${params.page}`,
      method: "get",
      callback,
      onStart: mediaRequested.type,
      onSuccess: mediaReceived.type,
      onError: mediaFailed.type,
    })
  );
};

export const addMediaData = (data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/media`,
      method: "POST",
      data,
      callback,
    })
  );
};

export const deleteMediaByOrganization = (params, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/media/organization/${params}`,
      method: "DELETE",
      callback,
    })
  );
};



export const deleteMediaData = (params,data, callback) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${baseUrl}/media/${params}`,
      method: "DELETE",
      callback,
      data,
    })
  );
};
export const getOrganization = createSelector(
  (state) => state.entities.organization,
  (organization) => organization
);
