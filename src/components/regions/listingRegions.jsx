import React, { useEffect, useState, useRef } from "react";
import addIcon from "../../include/images/plus-icon.svg";
import closeIcon from "../../include/images/close.svg";
import dotIcon from "../../include/images/more-icon.svg";
import FilterModal from "../../layouts/modal/regionModal/filterModal";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import parse from "html-react-parser";
import {
  getRegionsListings,
  deleteRegionList,
  getRegions,
  getCountryData,
  getStateDetails,
  addRegion,
  listingRegionReceived,
  updateRegion,
} from "../../store/region";
import { getapisForDropdown, getCountriesDropdown } from "../../store/apisForDropdown";
import moment from "moment";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { checkToken, setRedirectUrl } from "../../utils/localStorageServices";
import AlertError from "../../common/alerts/alertError";
import AlertSuccess from "../../common/alerts/alertSuccess";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "../common/header";
import Sidebar from "../common/sideBar";
import { v4 as uuidv4 } from "uuid";
import { Amplify, Storage, Auth } from "aws-amplify";
import EditRgionsModal from "../../layouts/modal/regionModal/editRegionsModal";
import DeleteModal from "../../layouts/modal/delete/deleteModal";
import Pagination from "../common/pagination";
import _ from "lodash";
import AddRigionModal from "../../layouts/modal/regionModal/addRegionsModal";
Amplify.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_IDENTITYPOOLID,
    region: process.env.REACT_APP_S3_REGION,
  },
  Storage: {
    bucket: process.env.REACT_APP_S3_BUCKET,
    region: process.env.REACT_APP_S3_REGION,
  },
});
Auth.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_IDENTITYPOOLID, //REQUIRED - Amazon Cognito Identity Pool ID
    region: process.env.REACT_APP_S3_REGION, // REQUIRED - Amazon Cognito Region
  },
  Storage: {
    bucket: process.env.REACT_APP_S3_BUCKET, //REQUIRED -  Amazon S3 bucket
    region: process.env.REACT_APP_S3_REGION,
  },
});

const ListingRegions = (props) => {
  var ref = useRef(null);
  const history = useHistory();
  const [showRegions, setShowRegions] = useState(false);
  const [loadingRegions, setLoadingRegions] = useState(false);
  const [countryDropDown, setCountryDropDownData] = useState(null);
  const [stateDropDown, setStateDropDown] = useState(null);
  const [selectCountry, setSelectCountry] = useState("");
  const [error, setError] = useState({});
  const [regionId, setRegionId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [selectedEditItem, setSelectedEditItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [deleteRegion, setDeleteRegion] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [totalCountPages, setTotalCountPages] = useState("");
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorData, setEditorData] = useState("");

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const toggleRegionModal = () => {
    setShowRegions(!showRegions);
    setSelectedImage(null);
    setSelectedEditItem("");
    setError({});
    setEditorData("")
  };

  const toggleEditRegionModal = () => {
    setShowEditModal(!showEditModal);
    setError({});
  };

  const toggleDeleteRegion = (item) => {
    if (item !== undefined) {
      setRegionId(item._id);
      setDeleteRegion(!deleteRegion);
    } else setDeleteRegion(false);
  };

  useEffect(() => {
    if (!checkToken()) {
      const pathname = window.location && window.location.href;
      setRedirectUrl(pathname);
      history.push("/signin");
    } else {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingRegions(true);
    const param = {
      isActive: true,
      keyword: "",
      country: "",
      page: 1,
      order,
      sort,
    };
    props.getRegionsListings(param, (res) => {
      if (res && res.status === 200) {
        setTotalCountPages(res.data.totalCount);
        setLoadingRegions(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingRegions(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, [sort, order]);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingRegions(true);
    const params = {
      isActive: true,
      keyword: "",
      country: "",
      page: currentPage,
      order,
      sort,
    };
    props.getRegionsListings(params, (res) => {
      if (res && res.status === 200) {
        setTotalCountPages(res.data.totalCount);
        setLoadingRegions(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingRegions(false);
      }
    });
  }, [currentPage]);

  // country and state dropdown data

  useEffect(() => {
    setLoadingRegions(true);
    props.getCountriesDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingRegions(false);
      } else {
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, []);

  useEffect(() => {
    setLoadingRegions(true);
    const id = 230;
    props.getStateDetails(id, (res) => {
      if (res && res.status === 200) {
        setLoadingRegions(false);
      } else {
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, []);

  const validateEdit = () => {
    const errors = {};
    if (!selectedEditItem || (selectedEditItem && _.isEmpty(selectedEditItem.coverImage) && _.isNull(selectedImage))) {
      errors.image = "Image is required";
    }
    if (!editorData) {
      errors.description = "Description is required";
    }
    const isEmpty = Object.values(errors).every((x) => x === null || x === "");

    if (!isEmpty) {
      setError(errors);
      return false;
    } else {
      setError(errors);
      return true;
    }
  };

  const handleFilter = (isModalOpen = false, removeKeyword = false, removeCountry = false) => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingFilter(true);
    setSelectedFilter({
      keyword: removeKeyword ? "" : filterKeyword,
      country: removeCountry ? "" : filterCountry && filterCountry.code,
    });
    // setCurrentPage(1);
    const param = {
      keyword: removeKeyword ? "" : filterKeyword,
      page: 1,
      country: removeCountry ? "" : filterCountry && filterCountry.code,
      order,
      sort,
      isActive: true,
    };
    props.getRegionsListings(param, (res) => {
      if (res && res.status === 200) {
        setTotalCountPages(res.data.totalCount);
        ref && ref.current && ref.current.complete();
        setLoadingFilter(false);
        if (!isModalOpen) {
          toggleFilterModal();
        }
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingFilter(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  };

  const regionsData =
    (props.getRegions && props.getRegions.listingRegionsData && props.getRegions.listingRegionsData.data) || {};

  const totalCount =
    props.getRegions && props.getRegions.listingRegionsData && props.getRegions.listingRegionsData.totalCount;

  const country = (props.getapisForDropdown && props.getapisForDropdown.countriesItem && props.getapisForDropdown.countriesItem.data) || {};

  const state = (props.getRegions && props.getRegions.stateDetails && props.getRegions.stateDetails.data) || {};

  const dotDesc = (description, limit) => {
    const dots = "...";
    if (description && description.length > limit) {
      if (description.includes("strong")) {
        description = description.substring(0, limit + 10) + dots;
      } else {
        description = description.substring(0, limit) + dots;
      }
    }
    return description;
  };

  // for pagination
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(i);
  }

  // option value for country dropdown and state dropdown
  useEffect(() => {
    const data =
      country &&
      country.length > 0 &&
      country.map((item) => ({
        name: item.name,
        code: item.code,
        id: item.id,
      }));
    setCountryDropDownData(data);

    const sData =
      state &&
      state.length > 0 &&
      state.map((item) => ({
        id: item.id,
        name: item.name,
      }));
    setStateDropDown(sData);
  }, [showRegions, showFilterModal, showEditModal]);

  const editHandler = (e) => {
    if (selectedEditItem?.newImage && selectedImage) {
      const value = { ...selectedEditItem };

      if (validateEdit()) {
        setError({});
        e.preventDefault();
        ref && ref.current && ref.current.continuousStart();
        setLoadingRegions(true);
        const file = selectedImage;
        const fSize = Math.round(file.size / 1048576);
        const fType = file.type;
        const ext = file.name.split(".").pop();
        if (fSize > 25) {
          toast(<AlertError message="Size exceeds maximum allowable size. Maximum allowable size is 25MB." />);
          return setLoadingRegions(false);
        } else if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(fType)) {
          return (
            toast(
              <AlertError message="Image is not of correct format and hence cannot be uploaded. Valid image formats are jpg, jpeg, png and webp." />,
            ),
            setLoadingRegions(false)
          );
        } else {
          const fileName = uuidv4() + "." + ext;
          Storage.put(fileName, file, {
            completeCallback: (event) => { },
            progressCallback: (progress) => { },
            errorCallback: (err) => {
              return setLoadingRegions(false), toast(<AlertError message={"Something Went Wrong"} />);
            },
          }).then((result) => {
            const payload = {
              isActive: true,
              coverImage: "public/" + result.key,
              description: editorData ? editorData : "",
              country: value.country ? value.country : "",
              state: value.country
                ? value.country == "US"
                  ? value.state && value.state
                  : value.countryName
                : value.countryName,
            };
            props.updateRegion(value._id, payload, (res) => {
              if (res.status === 200) {
                const param = {
                  keyword: filterKeyword,
                  page: 1,
                  country: filterCountry && filterCountry.code,
                  order,
                  sort,
                  isActive: true,
                };
                props.getRegionsListings(param, (res) => {
                  ref && ref.current && ref.current.complete();

                  if (res.status === 200) {
                    setTotalCountPages(res.data.totalCount);
                    setSelectedImage(null);
                    setLoadingRegions(false);
                    toggleEditRegionModal();
                    setEditorData("")

                    toast(<AlertSuccess message="Information Saved" />);
                  } else {
                    ref && ref.current && ref.current.complete();
                    setLoadingRegions(false);
                    toast(
                      <AlertError
                        message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"}
                      />,
                    );
                  }
                });
              } else {
                ref && ref.current && ref.current.complete();
                setLoadingRegions(false);
                toast(
                  <AlertError
                    message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"}
                  />,
                );
              }
            });
          });
        }
      }
    } else {
      if (!validateEdit()) return;
      setError({});
      ref && ref.current && ref.current.continuousStart();
      setLoadingRegions(true);
      const value = { ...selectedEditItem };
      const Image = value.coverImage && value.coverImage.original ? value.coverImage.original : "";
      const payload = {
        isActive: true,
        coverImage: value.coverImage,
        description: editorData ? editorData : "",
        country: value.country ? value.country : "",
        state: value.country
          ? value.country == "US"
            ? value.state && value.state
            : value.countryName
          : value.countryName,
      };
      props.updateRegion(value._id, payload, (res) => {
        if (res.status === 200) {
          const param = {
            keyword: filterKeyword ? filterKeyword : "",
            page: 1,
            country: filterCountry && filterCountry.code,
            order,
            sort,
            isActive: true,
          };
          props.getRegionsListings(param, (res) => {
            ref && ref.current && ref.current.complete();
            if (res.status === 200) {
              setTotalCountPages(res.data.totalCount);
              setSelectedEditItem(null);
              setSelectedImage(null);
              setLoadingRegions(false);
              setEditorData("")
              toggleEditRegionModal();

              ref && ref.current && ref.current.complete();
              toast(<AlertSuccess message="Information Saved" />);
            } else {
              ref && ref.current && ref.current.complete();
              setLoadingRegions(false);
              toast(
                <AlertError
                  message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"}
                />,
              );
            }
          });
        } else {
          ref && ref.current && ref.current.complete();
          setLoadingRegions(false);
          toast(
            <AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />,
          );
        }
      });
    }
  };

  const handleAddRegion = (e) => {
    if (validateEdit()) {
      if (selectedEditItem?.newImage && selectedImage) {
        const value = { ...selectedEditItem };
        setError({});
        e.preventDefault();
        ref && ref.current && ref.current.continuousStart();
        setLoadingRegions(true);

        const file = selectedImage;
        const fSize = Math.round(file.size / 1048576);
        const fType = file.type;
        const ext = file.name.split(".").pop();
        if (fSize > 25) {
          toast(<AlertError message="Size exceeds maximum allowable size. Maximum allowable size is 25MB." />);
          return setLoadingRegions(false);
        } else if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(fType)) {
          return (
            toast(
              <AlertError message="Image is not of correct format and hence cannot be uploaded. Valid image formats are jpg, jpeg, png and webp." />,
            ),
            setLoadingRegions(false)
          );
        } else {
          const fileName = uuidv4() + "." + ext;

          Storage.put(fileName, file, {
            completeCallback: (event) => { },
            progressCallback: (progress) => { },
            errorCallback: (err) => {
              return setLoadingRegions(false), toast(<AlertError message={"Something Went Wrong"} />);
            },
          }).then((result) => {
            const payload = {
              coverImage: "public/" + result.key,
              description: editorData ? editorData : "",
              country: value.country ? value.country : "",
              state: value.country
                ? value.country == "US"
                  ? value.name && value.name
                  : value.countryName
                : value.countryName,
            };
            props.addRegion(payload, (res) => {
              if (res.status === 200) {
                const params = {
                  keyword: "",
                  page: 1,
                  country: "",
                  order,
                  sort,
                  isActive: true,
                };
                props.getRegionsListings(params, (res) => {
                  ref && ref.current && ref.current.complete();
                  if (res.status === 200) {
                    setTotalCountPages(res.data.totalCount);
                    setSelectedImage(null);
                    setSelectedEditItem("");
                    setLoadingRegions(false);
                    setEditorData("")
                    toggleRegionModal();

                    toast(<AlertSuccess message="Information Saved" />);
                  } else {
                    ref && ref.current && ref.current.complete();
                    setLoadingRegions(false);
                    toast(
                      <AlertError
                        message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"}
                      />,
                    );
                  }
                });
              } else {
                ref && ref.current && ref.current.complete();
                setLoadingRegions(false);
                toast(
                  <AlertError
                    message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"}
                  />,
                );
              }
            });
          });
        }
      }
    }
  };

  const deleteHandler = () => {
    setLoadingDelete(true);
    ref && ref.current && ref.current.continuousStart();
    const id = regionId;
    props.deleteRegionList(id, (res) => {
      if (res && res.status === 200) {
        const params = {
          keyword: "",
          isActive: true,
          page: 1,
          country: "",
          order,
          sort,
        };
        props.getRegionsListings(params, (res) => {
          if (res && res.status === 200) {
            setTotalCountPages(res.data.totalCount);
            ref && ref.current && ref.current.complete();
            setLoadingDelete(false);
            toggleDeleteRegion();
            toast(<AlertSuccess message={"Record deleted"} />);
          }
        });
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingDelete(false);
        toggleDeleteRegion();
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  };

  return (
    <div>
      <LoadingBar height={5} color="#47AD1D" ref={ref} />
      <Header />
      <div className="dashboard-insider position-relative d-lg-flex w-100 ">
        <Sidebar page={"Region"} />
        <div className="main-container">
          {/* <!--============================== Filter Container Start ==============================--> */}
          <div className="filter-container d-flex align-items-center sticky-top">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center flex-wrap justify-content-between">
                  <div className="filter-title fw-medium text-capitalize">All Regions</div>
                  <div className="filter-widget-right d-flex align-items-center flex-wrap">
                    <div className="fw-item">
                      {loadingRegions ? (
                        <Skeleton width="50px" height="30px" />
                      ) : (
                        <div
                          className="filter-row d-flex align-items-center"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRight"
                          aria-controls="offcanvasRight"
                          onClick={() => toggleFilterModal()}
                        >
                          <svg viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M2.39767 16.5C2.07751 16.5 1.81796 16.2357 1.81796 15.9097V1.09032C1.81796 0.764295 2.07751 0.5 2.39767 0.5C2.71784 0.5 2.97738 0.764295 2.97738 1.09032V15.9097C2.97738 16.2357 2.71784 16.5 2.39767 16.5Z"
                              fill="currentColor"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13.0226 15.9097C13.0226 16.2357 13.2822 16.5 13.6023 16.5C13.9225 16.5 14.182 16.2357 14.182 15.9097V1.09032C14.182 0.764295 13.9225 0.5 13.6023 0.5C13.2822 0.5 13.0226 0.764295 13.0226 1.09032V15.9097ZM0.57971 13.18H4.21565C4.53582 13.18 4.79536 12.9158 4.79536 12.5897C4.79536 12.2637 4.53582 11.9994 4.21565 11.9994H0.57971C0.259545 11.9994 0 12.2637 0 12.5897C0 12.9158 0.259545 13.18 0.57971 13.18Z"
                              fill="currentColor"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M7.42029 15.9097C7.42029 16.2357 7.67983 16.5 8 16.5C8.32016 16.5 8.57971 16.2357 8.57971 15.9097V1.09032C8.57971 0.764295 8.32016 0.5 8 0.5C7.67983 0.5 7.42029 0.764295 7.42029 1.09032V15.9097ZM11.7843 13.18H15.4203C15.7405 13.18 16 12.9158 16 12.5897C16 12.2637 15.7405 11.9994 15.4203 11.9994H11.7843C11.4642 11.9994 11.2046 12.2637 11.2046 12.5897C11.2046 12.9158 11.4642 13.18 11.7843 13.18Z"
                              fill="currentColor"
                            />
                            <path
                              d="M9.81798 5.00058H6.18204C5.86187 5.00058 5.60233 4.73629 5.60233 4.41027C5.60233 4.08424 5.86187 3.81995 6.18204 3.81995H9.81798C10.1381 3.81995 10.3977 4.08424 10.3977 4.41027C10.3977 4.73629 10.1381 5.00058 9.81798 5.00058Z"
                              fill="currentColor"
                            />
                          </svg>
                          <div>Filters</div>
                        </div>
                      )}
                    </div>
                    {loadingRegions ? (
                      <div style={{ width: "10rem", paddingLeft: "15px" }}>
                        <Skeleton height="30px" width="50px" />
                      </div>
                    ) : (
                      <div className="fw-item">
                        <a className="btn btn-default" onClick={() => toggleRegionModal()}>
                          <img src={addIcon} alt="" />
                          Add a Region
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!--============================== Filter Container End ==============================--> */}
          {/* <!-- ============================= Table Container Start ============================ --> */}
          <div className="table-container">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="tb-filter-row d-flex align-items-start justify-content-between">
                    <div className="filter-tags d-flex align-items-start">
                      {!loadingRegions &&
                        ((selectedFilter && selectedFilter.keyword) ||
                          (selectedFilter && selectedFilter.country) ||
                          (selectedFilter.keyword && selectedFilter.country)) ? (
                        <>
                          <div className="filter-tag-title">Filters Applied :</div>
                          <div className="tags">
                            {selectedFilter && selectedFilter.keyword ? (
                              <span className="badge">
                                Keyword : <span>{filterKeyword}</span>
                                <img
                                  className="tag-close-icon"
                                  src={closeIcon}
                                  alt=""
                                  onClick={() => {
                                    setFilterKeyword("");
                                    handleFilter(true, true, false);
                                  }}
                                />
                              </span>
                            ) : (
                              ""
                            )}
                            {selectedFilter && selectedFilter.country ? (
                              <span className="badge">
                                Country : <span>{filterCountry && filterCountry.name}</span>
                                <img
                                  className="tag-close-icon"
                                  src={closeIcon}
                                  alt=""
                                  onClick={() => {
                                    setFilterCountry(null);
                                    handleFilter(true, false, true);
                                  }}
                                />
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="tb-filter-right d-flex align-items-center justify-content-end">
                      <div className="showing-result-text">
                        {!loadingRegions ? (
                          `Showing ${regionsData.length} of ${totalCountPages} total results`
                        ) : (
                          <Skeleton width="300px" height="25px" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="position-relative">
                    <div className="table-selected-count d-none align-items-center justify-content-between">
                      <div className="tsc-check-label d-flex align-items-center"></div>
                      <div className="tsc-del-label d-flex align-items-center fw-medium"></div>
                    </div>

                    <table className="table align-middle table-collapse-table">
                      <thead>
                        <tr>
                          <th style={{ width: "9.9%" }}>
                            <div class="d-flex align-items-center">
                              <span>Actions</span>
                            </div>
                          </th>
                          <th style={{ width: "18%" }}>
                            <a href="#!" className="sort-by">
                              Image
                            </a>
                          </th>

                          <th style={{ width: "25%" }}>
                            <a href="#!" className="sort-by">
                              Region
                              <div
                                className={
                                  order === "asc" && sort === "name" ? "ascending-icon active" : "ascending-icon"
                                }
                                onClick={() => {
                                  setOrder("asc");
                                  setSort("name");
                                }}
                              ></div>
                              <div
                                className={
                                  order === "desc" && sort === "name" ? "descending-icon active" : "descending-icon"
                                }
                                onClick={() => {
                                  setOrder("desc");
                                  setSort("name");
                                }}
                              ></div>
                            </a>
                          </th>
                          <th style={{ width: "25%" }}>
                            <a href="#!" className="sort-by">
                              Description
                            </a>
                          </th>

                          <th style={{ width: "18%" }}>
                            <a href="#!" className="sort-by">
                              Created On
                              <div
                                className={
                                  order === "asc" && sort === "createdAt" ? "ascending-icon active" : "ascending-icon"
                                }
                                onClick={() => {
                                  setOrder("asc");
                                  setSort("createdAt");
                                }}
                              ></div>
                              <div
                                className={
                                  order === "desc" && sort === "createdAt"
                                    ? "descending-icon active"
                                    : "descending-icon"
                                }
                                onClick={() => {
                                  setOrder("desc");
                                  setSort("createdAt");
                                }}
                              ></div>
                            </a>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {loadingRegions || loadingFilter
                          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4].map((item) => (
                            <tr>
                              <td colspan="8">
                                <table class="table2">
                                  <tr>
                                    <td style={{ width: "18%" }}>
                                      <Skeleton />
                                    </td>
                                    <td style={{ width: "18%" }}>
                                      <Skeleton />
                                    </td>
                                    <td style={{ width: "25%" }} className="word-break">
                                      <Skeleton />
                                    </td>
                                    <td style={{ width: "25%" }} className="word-break">
                                      <Skeleton />
                                    </td>
                                    <td style={{ width: "18%" }}>
                                      <Skeleton />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          ))
                          : regionsData &&
                          regionsData.length > 0 &&
                          regionsData.map((item, index) => {
                            const smallImg = item.coverImage && item.coverImage.small;

                            return (
                              <>
                                <tr>
                                  <td colspan="8">
                                    <table class="table2">
                                      <tr>
                                        <td style={{ width: "9.9%" }}>
                                          <div class="td-action-btn-group d-flex align-items-center justify-content-between">
                                            <Dropdown bsPrefix="header-name-box fw-medium dropdown cursor-pointer">
                                              <Dropdown.Toggle
                                                as="span"
                                                id="dropdown-basic"
                                                className="dropdown-toggle"
                                              >
                                                <a class="td-a-icon " data-bs-toggle="dropdown" aria-expanded={false}>
                                                  <img src={dotIcon} alt="" />
                                                </a>
                                              </Dropdown.Toggle>

                                              <Dropdown.Menu bsPrefix="dropdown-menu dropdown-menu-end">
                                                <Dropdown.Item
                                                  onClick={() => {
                                                    toggleEditRegionModal();
                                                    setSelectedEditItem(item);
                                                    setEditorData(item?.description)
                                                    setSelectedImage([
                                                      {
                                                        name: smallImg,
                                                        type: "image/jpg",
                                                      },
                                                    ]);
                                                  }}
                                                >
                                                  Edit
                                                </Dropdown.Item>

                                                <Dropdown.Item
                                                  onClick={() => {
                                                    toggleDeleteRegion(item);
                                                  }}
                                                >
                                                  Delete
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </td>
                                        <td style={{ width: "18%" }}>
                                          <div className="td-img-dev">
                                            <img src={process.env.REACT_APP_MEDIA + `${smallImg}`} alt="" />
                                          </div>
                                        </td>

                                        <td style={{ width: "25%" }}>
                                          {item.country === "US" ? `${item.state} , ${item.countryName}` : item.state}
                                        </td>
                                        <td style={{ width: "25%" }}>
                                          <div className="td-text-box">
                                            {parse(dotDesc(item.description, 50))}
                                          </div>
                                        </td>
                                        <td style={{ width: "18%" }}>
                                          <div className="td-text-box">
                                            {moment(item.createdAt).format("MM/DD/YYYY")}
                                            <br />
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <Pagination
                      handlePageClick={handlePageClick}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      pageLinks={pageLinks}
                      totalPages={totalPages}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AddRigionModal
            show={showRegions}
            onHide={toggleRegionModal}
            loading={loadingRegions}
            editorLoaded={editorLoaded}
            setEditorLoaded={setEditorLoaded}
            editorData={editorData}
            setEditorData={setEditorData}
            countryDropDown={countryDropDown}
            stateDropDown={stateDropDown}
            selectCountry={selectCountry}
            handleAddRegion={handleAddRegion}
            error={error}
            selectedEditItem={selectedEditItem}
            setSelectedEditItem={setSelectedEditItem}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          <FilterModal
            show={showFilterModal}
            onHide={toggleFilterModal}
            setShowFilterModal={setShowFilterModal}
            filterKeyword={filterKeyword}
            filterCountry={filterCountry}
            setFilterKeyword={setFilterKeyword}
            setFilterCountry={setFilterCountry}
            countryDropDown={countryDropDown}
            handleFilter={handleFilter}
            loading={loadingFilter}
          />

          <EditRgionsModal
            show={showEditModal}
            onHide={toggleEditRegionModal}
            loading={loadingRegions}
            editorLoaded={editorLoaded}
            setEditorLoaded={setEditorLoaded}
            editorData={editorData}
            setEditorData={setEditorData}
            countryDropDown={countryDropDown}
            stateDropDown={stateDropDown}
            selectCountry={selectCountry}
            editHandler={editHandler}
            error={error}
            selectedEditItem={selectedEditItem}
            setSelectedEditItem={setSelectedEditItem}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <DeleteModal
            show={deleteRegion}
            onHide={toggleDeleteRegion}
            loadingDelete={loadingDelete}
            deleteHandler={deleteHandler}
          />
          {/* <!-- ============================= Table Container End ============================ --> */}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getRegionsListings: (param, callBack) => dispatch(getRegionsListings(param, callBack)),
  getCountriesDropdown: (callBack) => dispatch(getCountriesDropdown(callBack)),
  getStateDetails: (params, callBack) => dispatch(getStateDetails(params, callBack)),
  addRegion: (data, callback) => dispatch(addRegion(data, callback)),
  deleteRegionList: (params, callback) => dispatch(deleteRegionList(params, callback)),
  updateRegion: (params, data, callback) => dispatch(updateRegion(params, data, callback)),
  listingRegionReceived: (data) => dispatch(listingRegionReceived(data)),
});

const mapStateToProps = (state) => ({
  getRegions: getRegions(state),
  getapisForDropdown: getapisForDropdown(state)
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ListingRegions));
