import React, { useEffect, useState, useRef } from "react";
import addIcon from "../../include/images/plus-icon.svg";
import closeIcon from "../../include/images/close.svg";
import dotIcon from "../../include/images/more-icon.svg";
import { connect } from "react-redux";
import {
  getNews,
  getNewsCategoryListing,
  updateNewsCategoryData,
  addNewsCategoryData,
  deleteNewsCategoryData,
} from "../../store/news";
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
import Pagination from "../common/pagination";
import _ from "lodash";
import DeleteModal from "../../layouts/modal/delete/deleteModal";
import AddNewsCategoryModal from "../../layouts/modal/newsModal/addNewsCategoryModal";
import EditNewsCategoryModal from "../../layouts/modal/newsModal/editNewsCategoryModal";
import CommonFilterModal from "../common/CommonFilterModal";

const NewsCategoriesListing = (props) => {
  var ref = useRef(null);
  const [loadingNewsCategories, setLoadingNewsCategories] = useState(false);
  const [showNewsCategories, setShowNewsCategories] = useState(false);
  const [showNewsCategoriesFilter, setShowNewsCategoriesFilter] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [selectedFilter, setSelectedFilter] = useState({});
  const [selectNewsCategory, setSelectNewsCategory] = useState(null);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalCountPages, setTotalCountPages] = useState("");
  const [newsCategoryId, setNewsCategoryId] = useState(null);
  const [deleteNewsCategoryItem, setDeleteNewsCategoryItem] = useState(false);
  const [editNewsCategory, setEditNewsCategory] = useState(false);

  const toggleFilterModal = () => {
    setShowNewsCategoriesFilter(!showNewsCategoriesFilter);
  };

  const toggleAddNewsCategoriesModal = () => {
    setShowNewsCategories(!showNewsCategories);
    setSelectNewsCategory("");
  };

  const toggleEditNewsCategory = () => {
    setEditNewsCategory(!editNewsCategory);
  };

  const toggleDeleteNewsCategory = (item) => {
    if (item !== undefined) {
      setNewsCategoryId(item._id);
      setDeleteNewsCategoryItem(!deleteNewsCategoryItem);
    } else setDeleteNewsCategoryItem(false);
  };

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingNewsCategories(true);
    const param = {
      isActive: true,
      keyword: "",
      page: 1,
      order,
      sort,
    };
    props.getNewsCategoryListing(param, (res) => {
      if (res && res.status === 200) {
        setTotalCountPages(res.data.totalCount);
        setLoadingNewsCategories(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingNewsCategories(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, [sort, order]);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingNewsCategories(true);
    const params = {
      isActive: true,
      keyword: "",
      page: currentPage,
      order,
      sort,
    };
    props.getNewsCategoryListing(params, (res) => {
      if (res && res.status === 200) {
        setTotalCountPages(res.data.totalCount);
        setLoadingNewsCategories(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingNewsCategories(false);
      }
    });
  }, [currentPage]);

  const NewsCategoryData =
    (props.getNews && props.getNews.newsCategoryItem && props.getNews.newsCategoryItem.data) || {};

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalCountPages / itemsPerPage);
  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(i);
  }

  const handleFilter = (isModalOpen = false, removeKeyword = false) => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingNewsCategories(true);
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
    props.getNewsCategoryListing(param, (res) => {
      if (res && res.status === 200) {
        ref && ref.current && ref.current.complete();
        setLoadingNewsCategories(false);
        if (!isModalOpen) {
          toggleFilterModal();
        }
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingNewsCategories(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  };
  const deleteHandler = () => {
    setLoadingNewsCategories(true);
    ref && ref.current && ref.current.continuousStart();
    const id = newsCategoryId;
    props.deleteNewsCategoryData(id, (res) => {
      if (res && res.status === 200) {
        const params = {
          isActive: true,
          page: 1,
          sort,
          order,
          keyword: "",
        };
        props.getNewsCategoryListing(params, (res) => {
          if (res && res.status === 200) {
            setTotalCountPages(res.data.totalCount);
            ref && ref.current && ref.current.complete();
            setLoadingNewsCategories(false);
            toggleDeleteNewsCategory();
            toast(<AlertSuccess message={"Record deleted"} />);
          }
        });
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingNewsCategories(false);
        toggleDeleteNewsCategory();
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  };

  const AddNewsCategory = (e) => {
    e.preventDefault();
    ref && ref.current && ref.current.continuousStart();
    setLoadingNewsCategories(true);
    const payload = {
      name: selectNewsCategory ? selectNewsCategory : "",
    };
    props.addNewsCategoryData(payload, (res) => {
      if (res.status === 200) {
        const params = {
          isActive: true,
          page: 1,
          sort,
          order,
          keyword: "",
        };
        props.getNewsCategoryListing(params, (res) => {
          ref && ref?.current && ref?.current?.complete();
          if (res.status === 200) {
            setTotalCountPages(res.data.totalCount);
            setLoadingNewsCategories(false);
            toggleAddNewsCategoriesModal(false);
            toast(<AlertSuccess message="Information Saved" />);
          } else {
            ref && ref?.current && ref?.current?.complete();
            setLoadingNewsCategories(false);
            toggleAddNewsCategoriesModal(false);
            toast(
              <AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />,
            );
          }
        });
      } else {
        ref && ref?.current && ref?.current?.complete();
        setLoadingNewsCategories(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  };

  const EditBlogCategory = (e) => {
    e.preventDefault();
    ref && ref.current && ref.current.continuousStart();
    setLoadingNewsCategories(true);
    const payload = {
      name: selectNewsCategory ? selectNewsCategory.name : "",
    };
    props.updateNewsCategoryData(selectNewsCategory._id, payload, (res) => {
      if (res.status === 200) {
        const params = {
          isActive: true,
          page: 1,
          sort,
          order,
          keyword: "",
        };
        props.getNewsCategoryListing(params, (res) => {
          ref && ref?.current && ref?.current?.complete();
          if (res.status === 200) {
            setTotalCountPages(res.data.totalCount);
            setLoadingNewsCategories(false);
            toggleEditNewsCategory(false);
            setSelectNewsCategory("");
            toast(<AlertSuccess message="Information Saved" />);
          } else {
            ref && ref?.current && ref?.current?.complete();
            setLoadingNewsCategories(false);
            toggleEditNewsCategory(false);
            setSelectNewsCategory("");
            toast(
              <AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />,
            );
          }
        });
      } else {
        ref && ref?.current && ref?.current?.complete();
        setLoadingNewsCategories(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  };
  return (
    <div>
      <LoadingBar height={5} color="#47AD1D" ref={ref} />
      <Header />
      <div className="dashboard-insider position-relative d-lg-flex w-100 ">
        <Sidebar page={"News Categories"} />
        <div className="main-container">
          {/* <!--============================== Filter Container Start ==============================--> */}
          <div className="filter-container d-flex align-items-center sticky-top">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center flex-wrap justify-content-between">
                  <div className="filter-title fw-medium text-capitalize">All News Categories</div>
                  <div className="filter-widget-right d-flex align-items-center flex-wrap">
                    <div className="fw-item">
                      {loadingNewsCategories ? (
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
                    {loadingNewsCategories ? (
                      <div style={{ width: "10rem", paddingLeft: "15px" }}>
                        <Skeleton height="30px" width="50px" />
                      </div>
                    ) : (
                      <div className="fw-item">
                        <a className="btn btn-default" onClick={() => toggleAddNewsCategoriesModal()}>
                          <img src={addIcon} alt="" />
                          Add a News Category
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
                        {!loadingNewsCategories ? (
                          `Showing ${NewsCategoryData.length} of ${totalCountPages} total results`
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
                        {loadingNewsCategories
                          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4].map((item) => (
                            <tr>
                              <td colspan="16">
                                <table class="table2">
                                  <tr>
                                    <td style={{ width: "10%" }}>
                                      <Skeleton />
                                    </td>

                                    <td style={{ width: "15%" }} className="word-break">
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
                          : NewsCategoryData &&
                          NewsCategoryData.length > 0 &&
                          NewsCategoryData.map((item, index) => {
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
                                                    toggleEditNewsCategory();
                                                    setSelectNewsCategory(item);
                                                  }}
                                                >
                                                  Edit
                                                </Dropdown.Item>

                                                <Dropdown.Item
                                                  onClick={() => {
                                                    toggleDeleteNewsCategory(item);
                                                  }}
                                                >
                                                  Delete
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </td>

                                        <td style={{ width: "15%" }}>{item.name}</td>
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
          <CommonFilterModal
            show={showNewsCategoriesFilter}
            onHide={toggleFilterModal}
            loading={loadingNewsCategories}
            filterKeyword={filterKeyword}
            setFilterKeyword={setFilterKeyword}
            // setFilterState={setFilterState}
            // filterState={filterState}
            handleFilter={handleFilter}
          />
          <AddNewsCategoryModal
            show={showNewsCategories}
            onHide={toggleAddNewsCategoriesModal}
            loading={loadingNewsCategories}
            selectNewsCategory={selectNewsCategory}
            setSelectNewsCategory={setSelectNewsCategory}
            handleSubmit={AddNewsCategory}
          />

          <EditNewsCategoryModal
            show={editNewsCategory}
            onHide={toggleEditNewsCategory}
            loading={loadingNewsCategories}
            selectNewsCategory={selectNewsCategory}
            setSelectNewsCategory={setSelectNewsCategory}
            handleSubmit={EditBlogCategory}
          />

          <DeleteModal
            show={deleteNewsCategoryItem}
            onHide={toggleDeleteNewsCategory}
            loadingDelete={loadingNewsCategories}
            deleteHandler={deleteHandler}
          />
          {/* <!-- ============================= Table Container End ============================ --> */}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getNewsCategoryListing: (param, callBack) => dispatch(getNewsCategoryListing(param, callBack)),
  addNewsCategoryData: (data, callback) => dispatch(addNewsCategoryData(data, callback)),
  updateNewsCategoryData: (params, data, callback) => dispatch(updateNewsCategoryData(params, data, callback)),
  deleteNewsCategoryData: (params, callback) => dispatch(deleteNewsCategoryData(params, callback)),
});

const mapStateToProps = (state) => ({
  getNews: getNews(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(NewsCategoriesListing));
