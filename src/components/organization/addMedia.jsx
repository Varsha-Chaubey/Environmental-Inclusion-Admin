import React, { useEffect, useState, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import addIcon from "../../include/images/plus-icon.svg";
import closeIcon from "../../include/images/close.svg";
import dotIcon from "../../include/images/more-icon.svg";
import Header from "../common/header";
import Sidebar from "../common/sideBar";
import { Dropdown } from "react-bootstrap";
import AlertError from "../../common/alerts/alertError";
import AlertSuccess from "../../common/alerts/alertSuccess";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { connect } from "react-redux";
import moment from "moment";
import Pagination from "../common/pagination";
import _ from "lodash";
import DeleteModal from "../../layouts/modal/delete/deleteModal";
import { v4 as uuidv4 } from "uuid";
import { Amplify, Storage, Auth } from "aws-amplify";
import {
  getOrganizationDropdown,
  getapisForDropdown,
} from "../../store/apisForDropdown";
import {
  getOrganization,
  getMediaListing,
  addMediaData,
  deleteMediaByOrganization,
} from "../../store/organization";
import FilterModal from "../../layouts/modal/organizationSubTabs/filterModal";
import AddMedia from "../../layouts/modal/organizationSubTabs/addMedia";
import MediaListing from "./mediaListing";
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
const ListingMedia = (props) => {
  var ref = useRef(null);
  const [showMedia, setShowMedia] = useState(false);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [filterOrganization, setFilterOrganization] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [error, setError] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [selectMedia, setSelectMedia] = useState(null);
  const [MediaId, setMediaId] = useState();
  const [deleteMedia, setDeleteMedia] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [organizationsDropdown, setOrganizationsDropdown] = useState(null);
  const [totalCountPages, setTotalCountPages] = useState("");
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [MediaData, setMediaData] = useState(null);
  const toggleMediaModal = () => {
    setShowMedia(!showMedia);
    setError({});
    setSelectMedia("");
    setSelectedFiles(null);
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const toggleDeleteModal = (item) => {
    if (item !== undefined) {
      setMediaId(item._id);
      setDeleteMedia(!deleteMedia);
    } else setDeleteMedia(false);
  };

  const toggleAddMediaModal = (item) => {
    if (item !== undefined) {
      setShowMediaModal(!showMediaModal);
      setMediaId(item._id);
    } else setShowMediaModal(false);
  };

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingMedia(true);
    const param = {
      isActive: true,
      page: 1,
      order,
      sort,
      organization: "",
    };
    props.getMediaListing(param, (res) => {
      if (res && res.status === 200) {
        setTotalCountPages(res.data.totalCount);
        setLoadingMedia(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingMedia(false);
        toast(
          <AlertError
            message={
              res && res.data && res.data.message
                ? res.data.message
                : "Something Went Wrong"
            }
          />
        );
      }
    });
  }, [sort, order]);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingMedia(true);
    const params = {
      isActive: true,
      page: currentPage,
      order,
      sort,
      organization: "",
    };
    props.getMediaListing(params, (res) => {
      if (res && res.status === 200) {
        setTotalCountPages(res.data.totalCount);
        setLoadingMedia(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingMedia(false);
      }
    });
  }, [currentPage]);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingMedia(true);
    props.getOrganizationDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingMedia(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingMedia(false);
        toast(
          <AlertError
            message={
              res && res.data && res.data.message
                ? res.data.message
                : "Something Went Wrong"
            }
          />
        );
      }
    });
  }, []);

  const organizations =
    props.getapisForDropdown &&
    props.getapisForDropdown.organizationsItems &&
    props.getapisForDropdown.organizationsItems.data;

  useEffect(() => {
    const organizationsData =
      organizations &&
      organizations.length > 0 &&
      organizations.map((item) => ({
        _id: item._id,
        name: item.name,
      }));
    setOrganizationsDropdown(organizationsData);
  }, [showMedia, showFilterModal]);

  console.log(selectMedia)
  const validateHandler = () => {
    const errors = {};
    if (!selectMedia || !selectMedia.organization) {
      errors.organization = "Organization is required";
    }
    if (_.isNull(selectedFiles)) {
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

  const mediaItem =
    (props.getOrganization &&
      props.getOrganization.mediaItem &&
      props.getOrganization.mediaItem.data) ||
    {};

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalCountPages / itemsPerPage);
  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(i);
  }

  const handleFilter = (isModalOpen = false, removeOrganization = false) => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingMedia(true);
    const filterValues = { ...filterOrganization };
    setSelectedFilter({
      organization: removeOrganization
        ? ""
        : filterValues && filterValues.organization
        ? filterValues.organization
        : "",
    });
    const params = {
      isActive: true,
      page: 1,
      order,
      sort,
      organization: removeOrganization
        ? ""
        : filterValues &&
          filterValues.organization &&
          filterValues.organization._id
        ? filterValues.organization._id
        : "",
    };
    props.getMediaListing(params, (res) => {
      if (res && res.status === 200) {
        ref && ref.current && ref.current.complete();
        setLoadingMedia(false);
        if (!isModalOpen) {
          toggleFilterModal();
        }
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingMedia(false);
        toast(
          <AlertError
            message={
              res && res.data && res.data.message
                ? res.data.message
                : "Something Went Wrong"
            }
          />
        );
      }
    });
  };

  const addMediaHandler = (e) => {
    if (validateHandler()) {
      if (selectMedia && selectedFiles?.length) {
        setError({});
        const value = { ...selectMedia };
        e.preventDefault();
        ref && ref.current && ref.current.continuousStart();
        setLoadingMedia(true);
        ref && ref.current && ref.current.continuousStart();
        for (let i = 0; i < selectedFiles?.length; i++) {
          const file = selectedFiles[i];
          const fSize = Math.round(file.size / 1048576);
          const fType = file.type;
          const ext = file.name.split(".").pop();
          if (fSize > 25) {
            return (
              toast(
                <AlertError message="Media size exceeds maximum allowable size. Maximum allowable size is 25MB." />
              ),
              ref && ref.current && ref.current.complete(),
              setLoadingMedia(false)
            );
          } else if (
            ![
              "image/jpeg",
              "image/jpg",
              "image/png",
              "image/webp",
              "video/MP4",
              "video/webm",
            ].includes(fType)
          ) {
            return (
              toast(
                <AlertError message="Media is not of correct format and hence cannot be uploaded. Valid Media formats are jpeg, jpg, png, webp, MP4 and webm." />
              ),
              ref && ref.current && ref.current.complete(),
              setLoadingMedia(false)
            );
          } else {
            const fileName = uuidv4() + "." + ext;
            Storage.put(fileName, file, {
              completeCallback: (event) => {},
              progressCallback: (progress) => {},
              errorCallback: (err) => {
                setLoadingMedia(false);
                toast(
                  <AlertError
                    message={
                      err && err.message ? err.message : "Something went wrong"
                    }
                  />
                );
              },
            }).then((result) => {
              const data = {
                files: [
                  {
                    media: "public/" + result.key,
                    mediaType: fType.split("/").shift(),
                  },
                ],
                organization:
                  value.organization && value.organization._id
                    ? value.organization._id
                    : "",
              };
              props.addMediaData(data, (res) => {
                if (res.status === 200) {
                  ref && ref?.current && ref?.current?.complete();
                  const params = {
                    isActive: true,
                    page: 1,
                    sort,
                    order,
                    organization: "",
                  };

                  props.getMediaListing(params, (res) => {
                    ref && ref?.current && ref?.current?.complete();
                    if (res.status === 200) {
                      setSelectedFiles([]);
                      setLoadingMedia(false);
                      toggleMediaModal();
                      toast(<AlertSuccess message="Information Saved" />);
                    } else {
                      ref && ref?.current && ref?.current?.complete();
                      setLoadingMedia(false);
                      toast(
                        <AlertError
                          message={
                            res && res.data && res.data.message
                              ? res.data.message
                              : "Something Went Wrong"
                          }
                        />
                      );
                    }
                  });
                } else {
                  ref && ref?.current && ref?.current?.complete();
                  setLoadingMedia(false);
                  toggleMediaModal();
                  toast(
                    <AlertError
                      message={
                        res && res.data && res.data.message
                          ? res.data.message
                          : "Something Went Wrong"
                      }
                    />
                  );
                }
              });
            });
          }
        }
      }
    }
  };

  const deleteHandler = () => {
    setLoadingMedia(true);
    ref && ref.current && ref.current.continuousStart();
    const id = MediaId;
    props.deleteMediaByOrganization(id, (res) => {
      if (res && res.status === 200) {
        const params = {
          isActive: true,
          page: 1,
          sort,
          order,
          organization: "",
        };
        props.getMediaListing(params, (res) => {
          if (res && res.status === 200) {
            setTotalCountPages(res.data.totalCount);
            ref && ref.current && ref.current.complete();
            setLoadingMedia(false);
            toggleDeleteModal();
            toast(<AlertSuccess message={"Record deleted"} />);
          }
        });
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingMedia(false);
        toggleDeleteModal();
        toast(
          <AlertError
            message={
              res && res.data && res.data.message
                ? res.data.message
                : "Something Went Wrong"
            }
          />
        );
      }
    });
  };

  return (
    <div>
      <LoadingBar height={5} color="#47AD1D" ref={ref} />
      <Header />
      <div className="dashboard-insider position-relative d-lg-flex w-100 ">
        <Sidebar page={"Add Media"} />
        <div className="main-container">
          {/* <!--============================== Filter Container Start ==============================--> */}
          <div className="filter-container d-flex align-items-center sticky-top">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center flex-wrap justify-content-between">
                  <div className="filter-title fw-medium text-capitalize">
                    All Media
                  </div>
                  <div className="filter-widget-right d-flex align-items-center flex-wrap">
                    <div className="fw-item">
                      {loadingMedia ? (
                        <Skeleton width="50px" height="30px" />
                      ) : (
                        <div
                          className="filter-row d-flex align-items-center"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRight"
                          aria-controls="offcanvasRight"
                          onClick={() => toggleFilterModal()}
                        >
                          <svg
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
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
                    {loadingMedia ? (
                      <div style={{ width: "10rem", paddingLeft: "15px" }}>
                        <Skeleton height="30px" width="50px" />
                      </div>
                    ) : (
                      <div className="fw-item">
                        <a
                          className="btn btn-default _cursor"
                          onClick={() => toggleMediaModal()}
                        >
                          <img src={addIcon} alt="" />
                          Add a Media
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
                      {selectedFilter && selectedFilter.organization ? (
                        <>
                          <div className="filter-tag-title">
                            Filters Applied :
                          </div>
                          <div className="tags">
                            {selectedFilter && selectedFilter.organization ? (
                              <span className="badge">
                                Organization :{" "}
                                <span>
                                  {filterOrganization?.organization?.name}
                                </span>
                                <img
                                  className="tag-close-icon"
                                  src={closeIcon}
                                  alt=""
                                  onClick={() => {
                                    setFilterOrganization("");
                                    handleFilter(true, true);
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
                        {!loadingMedia ? (
                          `Showing ${mediaItem.length} of ${totalCountPages} total results`
                        ) : (
                          <Skeleton width="300px" height="25px" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive position-relative">
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

                          <th style={{ width: "18%" }}>
                            Photos/Videos
                            <div class="ascending-icon"></div>
                            <div class="descending-icon active"></div>
                          </th>

                          <th style={{ width: "18%" }}>
                            <a href="#!" className="sort-by">
                              Organisation
                            </a>
                          </th>

                          <th style={{ width: "18%" }}>
                            <a href="#!" className="sort-by">
                              Created On
                              <div
                                className={
                                  order === "asc" && sort === "createdAt"
                                    ? "ascending-icon active"
                                    : "ascending-icon"
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
                        {loadingMedia
                          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4].map(
                              (item) => (
                                <tr>
                                  <td colspan="8">
                                    <table class="table2">
                                      <tr>
                                        <td style={{ width: "10%" }}>
                                          <Skeleton />
                                        </td>
                                        <td style={{ width: "18%" }}>
                                          <Skeleton />
                                        </td>

                                        <td style={{ width: "18%" }}>
                                          <Skeleton />
                                        </td>
                                        <td style={{ width: "18%" }}>
                                          <Skeleton />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              )
                            )
                          : mediaItem &&
                            mediaItem.length > 0 &&
                            mediaItem.map((item, index) => {
                              const originalImg = item && item.files;
                              return (
                                <>
                                  <tr>
                                    <td colspan="8">
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
                                                  <a
                                                    class="td-a-icon "
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded={false}
                                                  >
                                                    <img src={dotIcon} alt="" />
                                                  </a>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu bsPrefix="dropdown-menu dropdown-menu-end">
                                                  <Dropdown.Item
                                                    onClick={() =>
                                                      toggleDeleteModal(item)
                                                    }
                                                  >
                                                    Delete
                                                  </Dropdown.Item>
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          </td>

                                          <td
                                            style={{
                                              width: "18%",
                                            }}
                                          >
                                            <div class="td-img-group d-flex align-items-center">
                                              <div class="td-img">
                                                {item &&
                                                item?.files &&
                                                item?.files &&
                                                item?.files[0]?.mediaType ===
                                                  "image" ? (
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_MEDIA +
                                                      `${
                                                        originalImg &&
                                                        originalImg[0]?.file
                                                      }`
                                                    }
                                                    alt=""
                                                  />
                                                ) : (
                                                  <video
                                                    style={{
                                                      height: "40px",
                                                      width: "40px",
                                                    }}
                                                    // type={`${item.mediaType}/${originalImg &&
                                                    //   originalImg[0]?.file.split(".").pop()
                                                    //   }`}
                                                    controls
                                                  >
                                                    <source
                                                      src={
                                                        process.env
                                                          .REACT_APP_MEDIA +
                                                        `${
                                                          originalImg &&
                                                          originalImg[0]?.file
                                                        }`
                                                      }
                                                    />
                                                  </video>
                                                )}
                                              </div>
                                              <div class="td-img">
                                                {item &&
                                                item?.files &&
                                                item?.files &&
                                                item?.files[1]?.mediaType ===
                                                  "image" ? (
                                                  <img
                                                    src={
                                                      process.env
                                                        .REACT_APP_MEDIA +
                                                      `${
                                                        originalImg &&
                                                        originalImg[1]?.file
                                                      }`
                                                    }
                                                    alt=""
                                                  />
                                                ) : (
                                                  <video
                                                    style={{
                                                      height: "40px",
                                                      width: "40px",
                                                    }}
                                                    // type={`${item.mediaType}/${originalImg &&
                                                    //   originalImg[1]?.file.split(".").pop()
                                                    //   }`}
                                                    controls
                                                  >
                                                    <source
                                                      src={
                                                        process.env
                                                          .REACT_APP_MEDIA +
                                                        `${
                                                          originalImg &&
                                                          originalImg[1]?.file
                                                        }`
                                                      }
                                                    />
                                                  </video>
                                                )}
                                              </div>

                                              <div class="td-link-text d-flex align-items-center justify-content-center fw-semibold">
                                                <div bsPrefix="header-name-box fw-medium dropdown cursor-pointer">
                                                  <a
                                                    class="td-a-icon "
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded={false}
                                                    onClick={() => {
                                                      toggleAddMediaModal(item);
                                                      setMediaData(item);
                                                    }}
                                                  >
                                                    <u>
                                                      {item &&
                                                      item?.files.length >= 3
                                                        ? `+ ${
                                                            item?.files.length -
                                                            2
                                                          }`
                                                        : ""}
                                                    </u>
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                          </td>

                                          <td
                                            style={{
                                              width: "18%",
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            {item?.name}
                                          </td>
                                          <td style={{ width: "18%" }}>
                                            <div className="small-text">
                                              {moment(item.createdAt).format(
                                                "MM/DD/YYYY"
                                              )}
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
                  <div></div>
                </div>
              </div>
            </div>
          </div>
          <MediaListing
            show={showMediaModal}
            onHide={toggleAddMediaModal}
            setShowMediaModal={setShowMediaModal}
            loading={loadingMedia}
            MediaData={MediaData}
            sort={sort}
            order={order}
          />
          <Pagination
            handlePageClick={handlePageClick}
            currentPage={currentPage}
            pageLinks={pageLinks}
            totalPages={totalPages}
          />
          <FilterModal
            page="Add Media"
            loading={loadingMedia}
            show={showFilterModal}
            onHide={toggleFilterModal}
            handleFilter={handleFilter}
            filterState={filterOrganization}
            setFilterState={setFilterOrganization}
            organizationsDropdown={organizationsDropdown}
          />
          <AddMedia
            show={showMedia}
            onHide={toggleMediaModal}
            loading={loadingMedia}
            error={error}
            selectMedia={selectMedia}
            setSelectMedia={setSelectMedia}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            organizationsDropdown={organizationsDropdown}
            setOrganizationsDropdown={setOrganizationsDropdown}
            handleSubmit={addMediaHandler}
          />

          <DeleteModal
            show={deleteMedia}
            onHide={toggleDeleteModal}
            loadingDelete={loadingMedia}
            deleteHandler={deleteHandler}
          />
          {/* <!-- ============================= Table Container End ============================ --> */}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getOrganizationDropdown: (callBack) =>
    dispatch(getOrganizationDropdown(callBack)),
  getMediaListing: (param, callBack) =>
    dispatch(getMediaListing(param, callBack)),
  addMediaData: (data, callback) => dispatch(addMediaData(data, callback)),
  deleteMediaByOrganization: (params, callback) =>
    dispatch(deleteMediaByOrganization(params, callback)),
});

const mapStateToProps = (state) => ({
  getOrganization: getOrganization(state),
  getapisForDropdown: getapisForDropdown(state),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ListingMedia));
