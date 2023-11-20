import React, { useEffect, useState, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import addIcon from "../../include/images/plus-icon.svg";
import closeIcon from "../../include/images/close.svg";
import dotIcon from "../../include/images/more-icon.svg";
import Header from "../common/header";
import Sidebar from "../common/sideBar";
import {
  getSpecies,
  getSpeciesCategories,
  addSpeciesCategory,
  speciesCategoryReceived,
  deleteSpeciesCategory,
  updateSpeciesCategory,
} from "../../store/species";
import { Dropdown } from "react-bootstrap";
import AlertError from "../../common/alerts/alertError";
import AlertSuccess from "../../common/alerts/alertSuccess";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { connect } from "react-redux";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { Amplify, Storage, Auth } from "aws-amplify";
import Pagination from "../common/pagination";
import _ from "lodash";
import AddSpeciesCategoryModal from "../../layouts/modal/speciesCategoryModal/addSpeciesCategoryModal";
import CommonFilterModal from "../../components/common/CommonFilterModal";
import DeleteModal from "../../layouts/modal/delete/deleteModal";
import EditSpeciesCategory from "../../layouts/modal/speciesCategoryModal/editSpeciesCategoryModal";
import { getDangerLevelSpeciesList } from "../../store/species";
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
// import Pagination from '../regionsCommon/pagination';

const ListingSpeciesCategories = (props) => {
  var ref = useRef(null);
  // for getting lists
  const [showSpeciesCategories, setShowSpeciesCategories] = useState(false);
  const [loadingSpeciesCategories, setLoadingSpeciesCategories] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [filterKeyword, setFilterKeyword] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [error, setError] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [selectSpeciesCat, setSelectSpeciesCat] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryId, setCategoryId] = useState();
  const [showcategoryDelete, setShowcategoryDelete] = useState(false);
  const [editSpeciesCategoryModal, setEditSpeciesCategoryModal] = useState(false);

  const toggleSpeciesCategoryModal = () => {
    setShowSpeciesCategories(!showSpeciesCategories);
    setError({});
    setSelectedImage(null);
    setSelectSpeciesCat("");
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };
  const toggleEditModal = () => {
    setEditSpeciesCategoryModal(!editSpeciesCategoryModal);
    setError({});
  };
  const toggleDeleteCategory = (item) => {
    if (item !== undefined) {
      setCategoryId(item._id);
      setShowcategoryDelete(!showcategoryDelete);
    } else setShowcategoryDelete(false);
  };
  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingSpeciesCategories(true);
    const params = {
      isActive: true,
      keyword: "",
      page: 1,
      sort,
      order,
    };
    props.getSpeciesCategories(params, (res) => {
      if (res && res.status === 200) {
        setLoadingSpeciesCategories(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingSpeciesCategories(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, [sort, order]);

  const speciesCategory =
    (props.getSpecies && props.getSpecies.speciesCategoriesData && props.getSpecies.speciesCategoriesData.data) || {};

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsForPage = Array.prototype.slice.call(speciesCategory).slice(startIndex, endIndex);

  const totalPages = Math.ceil(speciesCategory.length / itemsPerPage);
  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(i);
  }

  const validateHandler = () => {
    const errors = {};

    if (!selectSpeciesCat || !selectSpeciesCat.name) {
      errors.name = "Species Category is required";
    }
    if (!selectSpeciesCat || (selectSpeciesCat && _.isEmpty(selectSpeciesCat.coverImage) && _.isNull(selectedImage))) {
      errors.image = "Image is required";
    }

    if (!selectSpeciesCat || !selectSpeciesCat.extinctionPercentage) {
      errors.extinctionPercentage = "Extinction Percentage is required";
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
  const handleFilter = (isModalOpen = false, removeKeyword = false) => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingSpeciesCategories(true);
    setSelectedFilter({
      keyword: removeKeyword ? "" : filterKeyword,
    });
    const param = {
      isActive: true,
      keyword: removeKeyword ? "" : filterKeyword,
      page: 1,
      sort,
      order,
    };
    props.getSpeciesCategories(param, (res) => {
      if (res && res.status === 200) {
        ref && ref.current && ref.current.complete();
        setLoadingSpeciesCategories(false);
        if (!isModalOpen) {
          toggleFilterModal();
        }
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingSpeciesCategories(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  };

  const AddSpeciesCategoryHandler = (e) => {
    if (validateHandler()) {
      if (selectSpeciesCat?.newImage && selectedImage) {
        const value = { ...selectSpeciesCat };
        setError({});
        e.preventDefault();
        ref && ref.current && ref.current.continuousStart();
        setLoadingSpeciesCategories(true);

        const file = selectedImage;
        const fSize = Math.round(file.size / 1048576);
        const fType = file.type;
        const ext = file.name.split(".").pop();
        if (fSize > 25) {
          toast(<AlertError message="Size exceeds maximum allowable size. Maximum allowable size is 25MB." />);
          return setLoadingSpeciesCategories(false);
        } else if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(fType)) {
          return (
            toast(
              <AlertError message="Image is not of correct format and hence cannot be uploaded. Valid image formats are jpg, jpeg, png and webp." />,
            ),
            setLoadingSpeciesCategories(false)
          );
        } else {
          const fileName = uuidv4() + "." + ext;

          Storage.put(fileName, file, {
            completeCallback: (event) => { },
            progressCallback: (progress) => { },
            errorCallback: (err) => {
              return setLoadingSpeciesCategories(false), toast(<AlertError message={"Something Went Wrong"} />);
            },
          }).then((result) => {
            const payload = {
              coverImage: "public/" + result.key,
              name: value.name ? value.name : "",
              extinctionPercentage: value.extinctionPercentage ? parseInt(value.extinctionPercentage) : "",
            };
            props.addSpeciesCategory(payload, (res) => {
              if (res.status === 200) {
                const param = {
                  isActive: true,
                  keyword: filterKeyword,
                  page: 1,
                  order,
                  sort,
                };
                props.getSpeciesCategories(param, (res) => {
                  ref && ref.current && ref.current.complete();
                  if (res.status === 200) {
                    setSelectedImage(null);
                    setSelectSpeciesCat("");
                    setLoadingSpeciesCategories(false);
                    toggleSpeciesCategoryModal();

                    toast(<AlertSuccess message="Information Saved" />);
                  } else {
                    ref && ref.current && ref.current.complete();
                    setLoadingSpeciesCategories(false);
                    toast(
                      <AlertError
                        message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"}
                      />,
                    );
                  }
                });
              } else {
                ref && ref.current && ref.current.complete();
                setLoadingSpeciesCategories(false);
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
    if (selectSpeciesCat?.newImage && selectedImage) {
      const value = { ...selectSpeciesCat };
      if (validateHandler()) {
        setError({});
        e.preventDefault();
        ref && ref.current && ref.current.continuousStart();
        setLoadingSpeciesCategories(true);
        const file = selectedImage;
        const fSize = Math.round(file.size / 1048576);
        const fType = file.type;
        const ext = file.name.split(".").pop();
        if (fSize > 25) {
          toast(<AlertError message="Size exceeds maximum allowable size. Maximum allowable size is 25MB." />);
          return setLoadingSpeciesCategories(false);
        } else if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(fType)) {
          return (
            toast(
              <AlertError message="Image is not of correct format and hence cannot be uploaded. Valid image formats are jpg, jpeg, png and webp." />,
            ),
            setLoadingSpeciesCategories(false)
          );
        } else {
          const fileName = uuidv4() + "." + ext;
          Storage.put(fileName, file, {
            completeCallback: (event) => { },
            progressCallback: (progress) => { },
            errorCallback: (err) => {
              return setLoadingSpeciesCategories(false), toast(<AlertError message={"Something Went Wrong"} />);
            },
          }).then((result) => {
            const payload = {
              isActive: true,
              coverImage: "public/" + result.key,
              name: value.name ? value.name : "",
              extinctionPercentage: value.extinctionPercentage ? value.extinctionPercentage : "",
            };
            props.updateSpeciesCategory(value._id, payload, (res) => {
              if (res.status === 200) {
                const param = {
                  isActive: true,
                  keyword: filterKeyword,
                  page: 1,
                  order,
                  sort,
                };
                props.getSpeciesCategories(param, (res) => {
                  ref && ref.current && ref.current.complete();
                  if (res.status === 200) {
                    setSelectedImage(null);
                    setSelectSpeciesCat("");
                    setLoadingSpeciesCategories(false);
                    toggleEditModal();

                    toast(<AlertSuccess message="Information Saved" />);
                  } else {
                    ref && ref.current && ref.current.complete();
                    setLoadingSpeciesCategories(false);
                    toast(
                      <AlertError
                        message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"}
                      />,
                    );
                  }
                });
              } else {
                ref && ref.current && ref.current.complete();
                setLoadingSpeciesCategories(false);
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
      ref && ref.current && ref.current.continuousStart();
      setLoadingSpeciesCategories(true);
      const value = { ...selectSpeciesCat };
      const Image = value.coverImage && value.coverImage.original ? value.coverImage.original : "";
      const payload = {
        isActive: true,
        coverImage: value.coverImage,
        name: value.name ? value.name : "",
        extinctionPercentage: value.extinctionPercentage ? value.extinctionPercentage : "",
      };
      props.updateSpeciesCategory(value._id, payload, (res) => {
        if (res && res.status == 200) {
          const param = {
            keyword: filterKeyword,
            page: 1,
            order,
            sort,
          };
          props.getDangerLevelSpeciesList(param, (res) => {
            ref && ref.current && ref.current.complete();
            if (res.status === 200) {
              setSelectedImage(null);
              setSelectSpeciesCat("");
              setLoadingSpeciesCategories(false);
              toggleEditModal();

              ref && ref.current && ref.current.complete();
              toast(<AlertSuccess message="Information Saved" />);
            } else {
              ref && ref.current && ref.current.complete();
              setLoadingSpeciesCategories(false);
              toast(
                <AlertError
                  message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"}
                />,
              );
            }
          });
        } else {
          ref && ref.current && ref.current.complete();
          setLoadingSpeciesCategories(false);
          toast(
            <AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />,
          );
        }
      });
    }
  };

  const deleteHandler = () => {
    setLoadingSpeciesCategories(true);
    ref && ref.current && ref.current.continuousStart();
    const id = categoryId;
    props.deleteSpeciesCategory(id, (res) => {
      if (res && res.status === 200) {
        const data = [...speciesCategory.filter((item) => item._id !== id)];
        props.speciesCategoryReceived({ data });
        ref && ref.current && ref.current.complete();
        setLoadingSpeciesCategories(false);
        toggleDeleteCategory();
        toast(<AlertSuccess message={"Record deleted"} />);
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingSpeciesCategories(false);
        toggleDeleteCategory();
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  };
  return (
    <div>
      <LoadingBar height={5} color="#47AD1D" ref={ref} />
      <Header />
      <div className="dashboard-insider position-relative d-lg-flex w-100 ">
        <Sidebar page={"Species Category"} />
        <div className="main-container">
          {/* <!--============================== Filter Container Start ==============================--> */}
          <div className="filter-container d-flex align-items-center sticky-top">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center flex-wrap justify-content-between">
                  <div className="filter-title fw-medium text-capitalize">All Species Categories</div>
                  <div className="filter-widget-right d-flex align-items-center flex-wrap">
                    <div className="fw-item">
                      {loadingSpeciesCategories ? (
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
                    {loadingSpeciesCategories ? (
                      <div style={{ width: "10rem", paddingLeft: "15px" }}>
                        <Skeleton height="30px" width="50px" />
                      </div>
                    ) : (
                      <div className="fw-item">
                        <a className="btn btn-default _cursor" onClick={() => toggleSpeciesCategoryModal()}>
                          <img src={addIcon} alt="" />
                          Add a Species Category
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
                      {selectedFilter && selectedFilter.keyword ? (
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
                        {!loadingSpeciesCategories ? (
                          `Showing ${itemsForPage.length} of ${speciesCategory.length} total results`
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
                              Species Category
                            </a>
                          </th>

                          <th style={{ width: "18%" }}>
                            <a href="#!" className="sort-by">
                              Extinction Percentage
                            </a>
                          </th>

                          <th style={{ width: "18%" }}>
                            <a href="#!" className="sort-by">
                              Created On
                            </a>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {loadingSpeciesCategories
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
                          : itemsForPage &&
                          itemsForPage.length > 0 &&
                          itemsForPage.map((item, index) => {
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
                                                    toggleEditModal();
                                                    setSelectSpeciesCat(item);
                                                  }}
                                                >
                                                  Edit
                                                </Dropdown.Item>

                                                <Dropdown.Item onClick={() => toggleDeleteCategory(item)}>
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

                                        <td style={{ width: "25%" }}>{item.name}</td>
                                        <td style={{ width: "18%" }}>{item.extinctionPercentage}</td>
                                        <td style={{ width: "18%" }}>
                                          <div className="small-text">
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
                  <div></div>
                </div>
              </div>
            </div>
          </div>
          <Pagination
            handlePageClick={handlePageClick}
            currentPage={currentPage}
            pageLinks={pageLinks}
            totalPages={totalPages}
          />
          <CommonFilterModal
            show={showFilterModal}
            onHide={toggleFilterModal}
            filterKeyword={filterKeyword}
            setFilterKeyword={setFilterKeyword}
            handleFilter={handleFilter}
            loading={loadingSpeciesCategories}
          />
          <AddSpeciesCategoryModal
            show={showSpeciesCategories}
            onHide={toggleSpeciesCategoryModal}
            loading={loadingSpeciesCategories}
            error={error}
            selectSpeciesCat={selectSpeciesCat}
            setSelectSpeciesCat={setSelectSpeciesCat}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            handleSubmit={AddSpeciesCategoryHandler}
          />
          <EditSpeciesCategory
            show={editSpeciesCategoryModal}
            onHide={toggleEditModal}
            loading={loadingSpeciesCategories}
            error={error}
            selectSpeciesCat={selectSpeciesCat}
            setSelectSpeciesCat={setSelectSpeciesCat}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            handleSubmit={editHandler}
          />
          <DeleteModal
            show={showcategoryDelete}
            onHide={toggleDeleteCategory}
            loadingDelete={loadingSpeciesCategories}
            deleteHandler={deleteHandler}
          />
          {/* <!-- ============================= Table Container End ============================ --> */}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getSpeciesCategories: (params, callBack) => dispatch(getSpeciesCategories(params, callBack)),
  addSpeciesCategory: (data, callback) => dispatch(addSpeciesCategory(data, callback)),
  updateSpeciesCategory: (params, data, callback) => dispatch(updateSpeciesCategory(params, data, callback)),
  deleteSpeciesCategory: (params, callback) => dispatch(deleteSpeciesCategory(params, callback)),
  speciesCategoryReceived: (data) => dispatch(speciesCategoryReceived(data)),
  getDangerLevelSpeciesList: (params, callback) => dispatch(getDangerLevelSpeciesList(params, callback)),
});

const mapStateToProps = (state) => ({
  getSpecies: getSpecies(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ListingSpeciesCategories));
