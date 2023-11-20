import React, { useEffect, useState, useRef } from "react";
import addIcon from "../../include/images/plus-icon.svg";
import closeIcon from "../../include/images/close.svg";
import dotIcon from "../../include/images/more-icon.svg";
import { connect } from "react-redux";
import {
  getWetMarket,
  getWetMarketListing,
  updatewetMarket,
  addwetMarketData,
  deletewetMarketData,
} from "../../store/wetMarket";
import {
  getRegionDropdown,
  getapisForDropdown,
  getSpeciesDropdown,
  getOrganizationDropdown,
} from "../../store/apisForDropdown";
import LoadingBar from "react-top-loading-bar";
import moment from "moment";
import { Dropdown } from "react-bootstrap";
import AlertError from "../../common/alerts/alertError";
import AlertSuccess from "../../common/alerts/alertSuccess";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "../common/header";
import Sidebar from "../common/sideBar";
import { v4 as uuidv4 } from "uuid";
import { Amplify, Storage, Auth } from "aws-amplify";
import Pagination from "../common/pagination";
import _ from "lodash";
import AddWetMarket from "../../layouts/modal/wetMarket/addWetMarketModal";
import EditWetMarketModal from "../../layouts/modal/wetMarket/editWetMarketModal";
import DeleteModal from "../../layouts/modal/delete/deleteModal";
import WetFilterModal from "../../layouts/modal/wetMarket/wetFilterModal";
import parse from "html-react-parser";
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

const WetMarketListing = (props) => {
  var ref = useRef(null);
  const [loadingwetMarket, setLoadingWetMarket] = useState(false);
  const [showWetMarket, setshowWetMarket] = useState(false);
  const [showWetMarketFilter, setShowWetMarketFilter] = useState(false);
  const [filterState, setFilterState] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [speciesDropdownData, setSpeciesDropdownData] = useState(null);
  const [regionsDropdownData, setRegionsDropdownData] = useState(null);
  const [organizationsDropdownData, setOrganizationsDropdownData] = useState(null);
  const [error, setError] = useState({});
  const [selectWetMarket, setSelectWetMarket] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalCountPages, setTotalCountPages] = useState("");
  const [wetMarketId, setWetMarketId] = useState(null);
  const [deleteWetMarket, setDeleteWetMarket] = useState(false);
  const [editWetMarket, setEditWetMarket] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorData, setEditorData] = useState("");

  const toggleFilterModal = () => {
    setShowWetMarketFilter(!showWetMarketFilter);
  };

  const toggleAddWetMarketModal = () => {
    setshowWetMarket(!showWetMarket);
    setError({});
    setSelectWetMarket("");
    setSelectedImage(null);
    setEditorData("");
  };

  const toggleEditWetMarket = () => {
    setEditWetMarket(!editWetMarket);
    setError({});
  };

  const toggleDeleteWetMarket = (item) => {
    if (item !== undefined) {
      setWetMarketId(item._id);
      setDeleteWetMarket(!deleteWetMarket);
    } else setDeleteWetMarket(false);
  };

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingWetMarket(true);
    const param = {
      isActive: true,
      keyword: "",
      regions: "",
      species: "",
      organizations: "",
      page: 1,
      order,
      sort,
    };
    props.getWetMarketListing(param, (res) => {
      if (res && res.status === 200) {
        setTotalCountPages(res.data.totalCount);
        setLoadingWetMarket(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingWetMarket(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, [sort, order]);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingWetMarket(true);
    const params = {
      isActive: true,
      keyword: "",
      regions: "",
      species: "",
      organizations: "",
      page: currentPage,
      order,
      sort,
    };
    props.getWetMarketListing(params, (res) => {
      if (res && res.status === 200) {
        setTotalCountPages(res.data.totalCount);
        setLoadingWetMarket(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingWetMarket(false);
      }
    });
  }, [currentPage]);

  // apis for dropdowns
  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingWetMarket(true);
    props.getSpeciesDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingWetMarket(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingWetMarket(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, [sort, order]);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingWetMarket(true);
    props.getRegionDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingWetMarket(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingWetMarket(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, []);

  useEffect(() => {
    ref && ref.current && ref.current.complete();
    setLoadingWetMarket(true);
    props.getOrganizationDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingWetMarket(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingWetMarket(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, [sort, order]);

  const regions =
    props.getapisForDropdown && props.getapisForDropdown.regionItems && props.getapisForDropdown.regionItems.data;

  const species =
    props.getapisForDropdown && props.getapisForDropdown.speciesItems && props.getapisForDropdown.speciesItems.data;

  const organizations =
    props.getapisForDropdown &&
    props.getapisForDropdown.organizationsItems &&
    props.getapisForDropdown.organizationsItems.data;

  // for dropdata values
  useEffect(() => {
    const speciesData =
      species &&
      species.length > 0 &&
      species.map((item) => ({
        _id: item._id,
        name: item.name,
      }));
    setSpeciesDropdownData(speciesData);

    const organizationsData =
      organizations &&
      organizations.length > 0 &&
      organizations.map((item) => ({
        _id: item._id,
        name: item.name,
      }));
    setOrganizationsDropdownData(organizationsData);

    const regionData =
      regions &&
      regions.length > 0 &&
      regions.map((item) => ({
        _id: item._id,
        state: item.country === "US" ? `${item.state}, ${item.countryName}` : item.state,
      }));
    setRegionsDropdownData(regionData);
  }, [showWetMarket, showWetMarketFilter, editWetMarket]);

  const WetMarketData =
    (props.getWetMarket && props.getWetMarket.wetMarketItem && props.getWetMarket.wetMarketItem.data) || {};

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

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalCountPages / itemsPerPage);
  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(i);
  }

  const validateHandler = () => {
    const errors = {};

    if (!selectWetMarket || !selectWetMarket.name) {
      errors.name = "Name is required";
    }

    if (!editorData) {
      errors.description = "Description is required";
    }
    if (!selectWetMarket || (selectWetMarket && _.isEmpty(selectWetMarket.coverImage) && _.isNull(selectedImage))) {
      errors.image = "Image is required";
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

  const handleFilter = (
    isModalOpen = false,
    removeKeyword = false,
    removeRegion = false,
    removeSpecies = false,
    removeOrganization = false,
  ) => {
    ref?.current?.continuousStart();
    setLoadingWetMarket(true);
    const filterValues = { ...filterState };
    const regions =
      filterValues && filterValues.regions && filterValues.regions.length && filterValues.regions.map((i) => i._id);
    const species =
      filterValues && filterValues.species && filterValues.species.length && filterValues.species.map((i) => i._id);

    const organizations =
      filterValues &&
      filterValues.organizations &&
      filterValues.organizations.length &&
      filterValues.organizations.map((i) => i._id);

    setSelectedFilter({
      keyword: removeKeyword ? "" : filterValues && filterValues.keyword ? filterValues.keyword : "",
      regions: removeRegion ? "" : regions ? regions.toString() : [],
      species: removeSpecies ? "" : species ? species.toString() : [],
      organizations: removeOrganization ? "" : organizations ? organizations.toString() : [],
    });
    const params = {
      isActive: true,
      page: 1,
      sort,
      order,
      keyword: removeKeyword ? "" : filterValues && filterValues.keyword ? filterValues.keyword : "",
      regions: removeRegion ? "" : regions ? regions.toString() : [],
      species: removeSpecies ? "" : species ? species.toString() : [],
      organizations: removeOrganization ? "" : organizations ? organizations.toString() : [],
    };
    props.getWetMarketListing(params, (res) => {
      if (res && res.status === 200) {
        ref && ref.current && ref.current.complete();
        setLoadingWetMarket(false);
        if (!isModalOpen) {
          toggleFilterModal();
        }
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingWetMarket(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  };

  const addWetMarkethandler = (e) => {
    if (validateHandler()) {
      if (selectWetMarket?.newImage && selectedImage) {
        const value = { ...selectWetMarket };
        setError({});
        e.preventDefault();
        ref && ref.current && ref.current.continuousStart();
        setLoadingWetMarket(true);

        const file = selectedImage;
        const fSize = Math.round(file.size / 1048576);
        const fType = file.type;
        const ext = file.name.split(".").pop();
        if (fSize > 25) {
          toast(<AlertError message="Size exceeds maximum allowable size. Maximum allowable size is 25MB." />);
          return setLoadingWetMarket(false);
        } else if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(fType)) {
          return (
            toast(
              <AlertError message="Image is not of correct format and hence cannot be uploaded. Valid image formats are jpg, jpeg, png and webp." />,
            ),
            setLoadingWetMarket(false)
          );
        } else {
          const fileName = uuidv4() + "." + ext;

          Storage.put(fileName, file, {
            completeCallback: (event) => { },
            progressCallback: (progress) => { },
            errorCallback: (err) => {
              return setLoadingWetMarket(false), toast(<AlertError message={"Something Went Wrong"} />);
            },
          }).then((result) => {
            const payload = {
              coverImage: "public/" + result.key,
              name: value.name ? value.name : "",
              description: editorData ? editorData : "",
              species: value.species && value.species.length > 0 ? value.species.map((item) => item._id) : [],
              organizations:
                value.organizations && value.organizations.length > 0
                  ? value.organizations.map((item) => item._id)
                  : [],

              regions: value.regions && value.regions.length > 0 ? value.regions.map((item) => item._id) : [],
            };
            props.addwetMarketData(payload, (res) => {
              if (res.status === 200) {
                const params = {
                  isActive: true,
                  page: 1,
                  sort,
                  order,
                  keyword: "",
                  regions: "",
                  species: "",
                  organizations: "",
                };
                props.getWetMarketListing(params, (res) => {
                  ref && ref.current && ref?.current?.complete();
                  if (res.status === 200) {
                    setSelectedImage(null);
                    setTotalCountPages(res.data.totalCount);
                    setSelectWetMarket("");
                    setEditorData("");
                    setLoadingWetMarket(false);
                    toggleAddWetMarketModal();

                    toast(<AlertSuccess message="Information Saved" />);
                  } else {
                    ref && ref.current && ref?.current?.complete();
                    setLoadingWetMarket(false);
                    toast(
                      <AlertError
                        message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"}
                      />,
                    );
                  }
                });
              } else {
                ref && ref.current && ref?.current?.complete();
                setLoadingWetMarket(false);
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

  const editHandler = (e) => {
    if (selectWetMarket?.newImage && selectedImage) {
      const value = { ...selectWetMarket };
      if (validateHandler()) {
        setError({});
        e.preventDefault();
        ref && ref?.current && ref?.current?.continuousStart();
        setLoadingWetMarket(true);
        const file = selectedImage;
        const fSize = Math.round(file.size / 1048576);
        const fType = file.type;
        const ext = file.name.split(".").pop();
        if (fSize > 25) {
          toast(<AlertError message="Size exceeds maximum allowable size. Maximum allowable size is 25MB." />);
          return setLoadingWetMarket(false);
        } else if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(fType)) {
          return (
            toast(
              <AlertError message="Image is not of correct format and hence cannot be uploaded. Valid image formats are jpg, jpeg, png and webp." />,
            ),
            setLoadingWetMarket(false)
          );
        } else {
          const fileName = uuidv4() + "." + ext;
          Storage.put(fileName, file, {
            completeCallback: (event) => { },
            progressCallback: (progress) => { },
            errorCallback: (err) => {
              return setLoadingWetMarket(false), toast(<AlertError message={"Something Went Wrong"} />);
            },
          }).then((result) => {
            const payload = {
              isActive: true,
              coverImage: "public/" + result.key,
              name: value.name ? value.name : "",
              description: editorData ? editorData : "",
              species: value.species && value.species.length > 0 ? value.species.map((item) => item._id) : [],
              organizations:
                value.organizations && value.organizations.length > 0
                  ? value.organizations.map((item) => item._id)
                  : [],
              regions: value.regions && value.regions.length > 0 ? value.regions.map((item) => item._id) : [],
            };
            props.updatewetMarket(value._id, payload, (res) => {
              if (res.status === 200) {
                const param = {
                  isActive: true,
                  page: 1,
                  sort,
                  order,
                  keyword: "",
                  regions: "",
                  species: "",
                  organizations: "",
                };
                props.getWetMarketListing(param, (res) => {
                  ref && ref?.current && ref?.current?.complete();
                  if (res.status === 200) {
                    setSelectedImage(null);
                    setSelectWetMarket("");
                    setEditorData("");
                    setLoadingWetMarket(false);
                    toggleEditWetMarket();

                    toast(<AlertSuccess message="Information Saved" />);
                  } else {
                    ref && ref?.current && ref?.current?.complete();
                    setLoadingWetMarket(false);
                    toast(
                      <AlertError
                        message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"}
                      />,
                    );
                  }
                });
              } else {
                ref && ref?.current && ref?.current?.complete();
                setLoadingWetMarket(false);
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
      if (!validateHandler()) return;

      setError({});
      ref && ref?.current && ref?.current?.continuousStart();
      setLoadingWetMarket(true);
      const value = { ...selectWetMarket };
      const Image = value.coverImage && value.coverImage.original ? value.coverImage.original : "";
      const payload = {
        isActive: true,
        name: value.name ? value.name : "",
        description: editorData ? editorData : "",
        species: value.species && value.species.length > 0 ? value.species.map((item) => item._id) : [],
        organizations:
          value.organizations && value.organizations.length > 0 ? value.organizations.map((item) => item._id) : [],
        regions: value.regions && value.regions.length > 0 ? value.regions.map((item) => item._id) : [],
        coverImage: value.coverImage,
      };
      props.updatewetMarket(value._id, payload, (res) => {
        if (res.status === 200) {
          const param = {
            isActive: true,
            page: 1,
            sort,
            order,
            keyword: "",
            regions: "",
            species: "",
            organizations: "",
          };
          props.getWetMarketListing(param, (res) => {
            ref && ref?.current && ref?.current?.complete();
            if (res.status === 200) {
              setSelectWetMarket("");
              setSelectedImage(null);
              setEditorData("");
              setLoadingWetMarket(false);
              toggleEditWetMarket();
              ref && ref?.current && ref?.current?.complete();
              toast(<AlertSuccess message="Information Saved" />);
            } else {
              ref && ref?.current && ref?.current?.complete();
              setLoadingWetMarket(false);
              toast(
                <AlertError
                  message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"}
                />,
              );
            }
          });
        } else {
          ref && ref?.current && ref?.current?.complete();
          setLoadingWetMarket(false);
          toast(
            <AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />,
          );
        }
      });
    }
  };

  const deleteHandler = () => {
    setLoadingWetMarket(true);
    ref?.current?.continuousStart();
    const id = wetMarketId;
    props.deletewetMarketData(id, (res) => {
      if (res && res.status === 200) {
        const params = {
          isActive: true,
          page: 1,
          sort,
          order,
          keyword: "",
          regions: "",
          species: "",
          organizations: "",
        };
        props.getWetMarketListing(params, (res) => {
          if (res && res.status === 200) {
            setTotalCountPages(res.data.totalCount);
            ref && ref.current && ref.current.complete();
            setLoadingWetMarket(false);
            toggleDeleteWetMarket();
            toast(<AlertSuccess message={"Record deleted"} />);
          }
        });
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingWetMarket(false);
        toggleDeleteWetMarket();
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  };

  return (
    <div>
      <LoadingBar height={5} color="#47AD1D" ref={ref} />
      <Header />
      <div className="dashboard-insider position-relative d-lg-flex w-100 ">
        <Sidebar page={"Wet Market"} />
        <div className="main-container">
          {/* <!--============================== Filter Container Start ==============================--> */}
          <div className="filter-container d-flex align-items-center sticky-top">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center flex-wrap justify-content-between">
                  <div className="filter-title fw-medium text-capitalize">All War on the environment - Threat</div>
                  <div className="filter-widget-right d-flex align-items-center flex-wrap">
                    <div className="fw-item">
                      {loadingwetMarket ? (
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
                    {loadingwetMarket ? (
                      <div style={{ width: "10rem", paddingLeft: "15px" }}>
                        <Skeleton height="30px" width="50px" />
                      </div>
                    ) : (
                      <div className="fw-item">
                        <a className="btn btn-default" onClick={() => toggleAddWetMarketModal()}>
                          <img src={addIcon} alt="" />
                          Add a WET Market
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
                      {!loadingwetMarket &&
                        ((selectedFilter && selectedFilter.keyword) ||
                          (selectedFilter && selectedFilter.regions) ||
                          (selectedFilter && selectedFilter.species) ||
                          (selectedFilter && selectedFilter.organizations) ||
                          (selectedFilter.keyword &&
                            selectedFilter.regions &&
                            selectedFilter.regions.length &&
                            selectedFilter.species &&
                            selectedFilter.species.length &&
                            selectedFilter.organizations &&
                            selectedFilter.organizations.length)) ? (
                        <>
                          <div className="filter-tag-title">Filters Applied :</div>
                          <div className="tags">
                            {selectedFilter && selectedFilter.keyword && (
                              <span className="badge">
                                Keyword : <span>{filterState && filterState.keyword}</span>
                                <img
                                  className="tag-close-icon"
                                  src={closeIcon}
                                  alt=""
                                  onClick={() => {
                                    const data = { ...filterState };
                                    data.keyword = "";
                                    setFilterState(data);
                                    handleFilter(true, true, false, false, false);
                                  }}
                                />
                              </span>
                            )}

                            {selectedFilter && selectedFilter.regions && selectedFilter.regions.length ? (
                              <span className="badge">
                                Regions :{" "}
                                <span>
                                  {filterState &&
                                    filterState.regions &&
                                    filterState.regions.length &&
                                    filterState.regions.map((i) => i.state)}
                                </span>
                                <img
                                  className="tag-close-icon"
                                  src={closeIcon}
                                  alt=""
                                  onClick={() => {
                                    const data = { ...filterState };
                                    data.regions = null;
                                    setFilterState(data);
                                    handleFilter(true, false, true, false, false);
                                  }}
                                />
                              </span>
                            ) : (
                              ""
                            )}

                            {selectedFilter && selectedFilter.species && selectedFilter.species.length ? (
                              <span className="badge">
                                Species:{" "}
                                <span>
                                  {filterState &&
                                    filterState.species &&
                                    filterState.species.length &&
                                    filterState.species.map((i) => i.name)}
                                </span>
                                <img
                                  className="tag-close-icon"
                                  src={closeIcon}
                                  alt=""
                                  onClick={() => {
                                    const data = { ...filterState };
                                    data.species = null;
                                    setFilterState(data);
                                    handleFilter(true, false, false, true, false);
                                  }}
                                />
                              </span>
                            ) : (
                              ""
                            )}
                            {selectedFilter && selectedFilter.organizations && selectedFilter.organizations.length ? (
                              <span className="badge">
                                Organizations :{" "}
                                <span>
                                  {filterState &&
                                    filterState.organizations &&
                                    filterState.organizations.length &&
                                    filterState.organizations.map((i) => i.name)}
                                </span>
                                <img
                                  className="tag-close-icon"
                                  src={closeIcon}
                                  alt=""
                                  onClick={() => {
                                    const data = { ...filterState };
                                    data.organizations = null;
                                    setFilterState(data);
                                    handleFilter(true, false, false, false, true);
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
                        {!loadingwetMarket ? (
                          `Showing ${WetMarketData.length} of ${totalCountPages} total results`
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
                          <th style={{ width: "10%" }}>
                            <div class="d-flex align-items-center">
                              <span>Actions</span>
                            </div>
                          </th>
                          <th style={{ width: "10%" }}>
                            <a href="#!" className="sort-by">
                              Image
                            </a>
                          </th>

                          <th style={{ width: "15%" }}>
                            <a href="#!" className="sort-by">
                              Name
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

                          <th style={{ width: "15%" }}>
                            <a href="#!" className="sort-by">
                              Description
                            </a>
                          </th>

                          <th style={{ width: "12%" }}>
                            <a href="#!" className="sort-by">
                              Regions
                            </a>
                          </th>

                          <th style={{ width: "15%" }}>
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
                        {loadingwetMarket
                          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4].map((item) => (
                            <tr>
                              <td colspan="16">
                                <table class="table2">
                                  <tr>
                                    <td style={{ width: "10%" }}>
                                      <Skeleton />
                                    </td>
                                    <td style={{ width: "10%" }}>
                                      <Skeleton />
                                    </td>
                                    <td style={{ width: "15%" }} className="word-break">
                                      <Skeleton />
                                    </td>

                                    <td style={{ width: "15%" }}>
                                      <Skeleton />
                                    </td>
                                    <td style={{ width: "12%" }}>
                                      <Skeleton />
                                    </td>

                                    <td style={{ width: "15%" }}>
                                      <Skeleton />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          ))
                          : WetMarketData &&
                          WetMarketData.length > 0 &&
                          WetMarketData.map((item, index) => {
                            const smallImg = item.coverImage && item.coverImage.small;
                            const regions = item.regions ? item.regions : [];

                            return (
                              <>
                                <tr>
                                  <td colspan="16">
                                    <table class="table2">
                                      <tr>
                                        <td style={{ width: "10%" }}>
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
                                                    toggleEditWetMarket();
                                                    setSelectWetMarket(item);
                                                    setEditorData(item?.description);
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
                                                    toggleDeleteWetMarket(item);
                                                  }}
                                                >
                                                  Delete
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </td>
                                        <td style={{ width: "10%" }}>
                                          <div className="td-img-dev">
                                            <img src={process.env.REACT_APP_MEDIA + `${smallImg}`} alt="" />
                                          </div>
                                        </td>

                                        <td style={{ width: "15%" }}>{item.name}</td>
                                        <td style={{ width: "15%" }}>{parse(dotDesc(item.description, 20))}</td>

                                        <td style={{ width: "12%" }}>
                                          <div class="td-img-group d-flex align-items-center">
                                            {regions && regions?.length && regions[0] && regions[0]?.country === "US"
                                              ? `${regions[0]?.state}, ${regions[0]?.countryName}`
                                              : regions[0]?.state}

                                            <div class="td-link-text d-flex align-items-center justify-content-center fw-semibold">
                                              <Dropdown bsPrefix="header-name-box fw-medium dropdown cursor-pointer">
                                                <Dropdown.Toggle
                                                  as="span"
                                                  id="dropdown-basic"
                                                  className="dropdown-toggle"
                                                >
                                                  <a
                                                    class="td-a-icon "
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded={false}
                                                  >
                                                    <u>{regions.length >= 2 ? `+ ${regions.length - 1}` : ""}</u>
                                                  </a>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu bsPrefix="dropdown-menu dropdown-menu-end">
                                                  <Dropdown.Item>
                                                    {regions.map((item) => {
                                                      return (
                                                        <>
                                                          <tr>
                                                            <td>
                                                              {item.country === "US"
                                                                ? `${item.state}, ${item.countryName}`
                                                                : item.state}
                                                            </td>
                                                          </tr>
                                                        </>
                                                      );
                                                    })}
                                                  </Dropdown.Item>
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          </div>
                                        </td>

                                        <td style={{ width: "15%" }}>
                                          <div>
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
          <WetFilterModal
            show={showWetMarketFilter}
            onHide={toggleFilterModal}
            loading={loadingwetMarket}
            regionsDropdownData={regionsDropdownData}
            speciesDropdownData={speciesDropdownData}
            organizationsDropdownData={organizationsDropdownData}
            setFilterState={setFilterState}
            filterState={filterState}
            handleFilter={handleFilter}
          />
          <AddWetMarket
            show={showWetMarket}
            onHide={toggleAddWetMarketModal}
            loading={loadingwetMarket}
            editorLoaded={editorLoaded}
            setEditorLoaded={setEditorLoaded}
            editorData={editorData}
            setEditorData={setEditorData}
            regionsDropdownData={regionsDropdownData}
            speciesDropdownData={speciesDropdownData}
            organizationsDropdownData={organizationsDropdownData}
            selectWetMarket={selectWetMarket}
            setSelectWetMarket={setSelectWetMarket}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            error={error}
            handleSubmit={addWetMarkethandler}
          />

          <EditWetMarketModal
            show={editWetMarket}
            onHide={toggleEditWetMarket}
            loading={loadingwetMarket}
            editorLoaded={editorLoaded}
            setEditorLoaded={setEditorLoaded}
            editorData={editorData}
            setEditorData={setEditorData}
            regionsDropdownData={regionsDropdownData}
            speciesDropdownData={speciesDropdownData}
            organizationsDropdownData={organizationsDropdownData}
            selectWetMarket={selectWetMarket}
            setSelectWetMarket={setSelectWetMarket}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            error={error}
            handleSubmit={editHandler}
          />

          <DeleteModal
            show={deleteWetMarket}
            onHide={toggleDeleteWetMarket}
            loadingDelete={loadingwetMarket}
            deleteHandler={deleteHandler}
          />
          {/* <!-- ============================= Table Container End ============================ --> */}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getRegionDropdown: (callBack) => dispatch(getRegionDropdown(callBack)),
  getOrganizationDropdown: (callBack) => dispatch(getOrganizationDropdown(callBack)),
  getSpeciesDropdown: (callBack) => dispatch(getSpeciesDropdown(callBack)),
  getWetMarketListing: (param, callBack) => dispatch(getWetMarketListing(param, callBack)),
  addwetMarketData: (data, callback) => dispatch(addwetMarketData(data, callback)),
  updatewetMarket: (params, data, callback) => dispatch(updatewetMarket(params, data, callback)),
  deletewetMarketData: (params, callback) => dispatch(deletewetMarketData(params, callback)),
});

const mapStateToProps = (state) => ({
  getWetMarket: getWetMarket(state),
  getapisForDropdown: getapisForDropdown(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WetMarketListing));
