import React, { useEffect, useState, useRef } from "react";
import addIcon from "../../include/images/plus-icon.svg";
import closeIcon from "../../include/images/close.svg";
import dotIcon from "../../include/images/more-icon.svg";
import parse from "html-react-parser";
import { connect } from "react-redux";
import { getNews, getNewsListing, addNewsData, updateNewsData, deleteNewsData } from "../../store/news";
import {
  getRegionDropdown,
  getapisForDropdown,
  getSpeciesDropdown,
  getOrganizationDropdown,
  getNewsCategoryDropdown,
  getZooDropdown,
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
import Pagination from "../common/pagination";
import _ from "lodash";
import DeleteModal from "../../layouts/modal/delete/deleteModal";
import AddNewsModal from "../../layouts/modal/newsModal/addNewsModal";
import NewsFilterModal from "../../layouts/modal/newsModal/newsFilterModal";
import EditNewsModal from "../../layouts/modal/newsModal/editNewsModal";

const ListingNews = (props) => {
  var ref = useRef(null);
  const [loadingNews, setLoadingNews] = useState(false);
  const [showNewsModal, setshowNewsModal] = useState(false);
  const [showNewsFilter, setShowNewsFilter] = useState(false);
  const [filterState, setFilterState] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [speciesDropdownData, setSpeciesDropdownData] = useState(null);
  const [regionsDropdownData, setRegionsDropdownData] = useState(null);
  const [zooDropdownData, setZooDropdownData] = useState(null);
  const [newsCategoryDropdownData, setNewsCategoryDropdownData] = useState(null);
  const [organizationsDropdownData, setOrganizationsDropdownData] = useState(null);
  const [error, setError] = useState({});
  const [selectNews, setSelectNews] = useState(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorData, setEditorData] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalCountPages, setTotalCountPages] = useState("");
  const [newsId, setNewsId] = useState(null);
  const [deleteNews, setDeleteNews] = useState(false);
  const [editNews, setEditNews] = useState(false);

  const toggleFilterModal = () => {
    setShowNewsFilter(!showNewsFilter);
  };

  const toggleAddNewsModal = () => {
    setshowNewsModal(!showNewsModal);
    setError({});
    setSelectNews("");
    setEditorData("");
  };

  const toggleDeleteNews = (item) => {
    if (item !== undefined) {
      setNewsId(item._id);
      setDeleteNews(!deleteNews);
    } else setDeleteNews(false);
  };

  const toggleEditNews = () => {
    setEditNews(!editNews);
    setError({});
  };

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingNews(true);
    const param = {
      isActive: true,
      keyword: "",
      regions: "",
      species: "",
      organizations: "",
      zoos: "",
      category: "",
      page: 1,
      order,
      sort,
    };
    props.getNewsListing(param, (res) => {
      if (res && res.status === 200) {
        setTotalCountPages(res.data.totalCount);
        setLoadingNews(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingNews(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, [sort, order]);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingNews(true);
    const params = {
      isActive: true,
      keyword: "",
      regions: "",
      species: "",
      organizations: "",
      zoos: "",
      category: "",
      page: currentPage,
      order,
      sort,
    };
    props.getNewsListing(params, (res) => {
      if (res && res.status === 200) {
        setTotalCountPages(res.data.totalCount);
        setLoadingNews(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingNews(false);
      }
    });
  }, [currentPage]);

  // apis for dropdowns
  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingNews(true);

    props.getSpeciesDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingNews(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingNews(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, []);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingNews(true);

    props.getNewsCategoryDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingNews(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingNews(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, []);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingNews(true);

    props.getRegionDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingNews(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingNews(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, []);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingNews(true);

    props.getOrganizationDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingNews(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingNews(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, []);

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingNews(true);

    props.getZooDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingNews(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingNews(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, []);

  const newsCategory =
    props.getapisForDropdown &&
    props.getapisForDropdown.newsCategoryItems &&
    props.getapisForDropdown.newsCategoryItems.data;

  const regions =
    props.getapisForDropdown && props.getapisForDropdown.regionItems && props.getapisForDropdown.regionItems.data;

  const species =
    props.getapisForDropdown && props.getapisForDropdown.speciesItems && props.getapisForDropdown.speciesItems.data;

  const organizations =
    props.getapisForDropdown &&
    props.getapisForDropdown.organizationsItems &&
    props.getapisForDropdown.organizationsItems.data;

  const zoo = props.getapisForDropdown && props.getapisForDropdown.zooItems && props.getapisForDropdown.zooItems.data;

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

    const categoryData =
      newsCategory &&
      newsCategory.length > 0 &&
      newsCategory.map((item) => ({
        _id: item._id,
        name: item.name,
      }));
    setNewsCategoryDropdownData(categoryData);

    const zooData =
      zoo &&
      zoo.length > 0 &&
      zoo.map((item) => ({
        _id: item._id,
        name: item.name,
      }));
    setZooDropdownData(zooData);
  }, [showNewsModal, showNewsFilter, editNews]);

  // for validations
  const validateHandler = () => {
    const errors = {};

    if (!selectNews || !selectNews.name) {
      errors.name = "Name is required";
    }
    if (!selectNews || !selectNews.author) {
      errors.author = "Author is required";
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

  const NewsData = (props.getNews && props.getNews.newsItem && props.getNews.newsItem.data) || {};

  const dotDesc = (description, limit) => {
    const dots = "...";
    if (description && description.length > limit) {
      if (description.includes("strong")) {
        description = description.substring(0, limit + 10) + dots;
      } else description = description.substring(0, limit) + dots;
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

  const handleFilter = (
    isModalOpen = false,
    removeKeyword = false,
    removeRegion = false,
    removeSpecies = false,
    removeZoos = false,
    removeOrganization = false,
    removeCategory = false,
  ) => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingNews(true);
    const filterValues = { ...filterState };
    const regions =
      filterValues && filterValues.regions && filterValues.regions.length && filterValues.regions.map((i) => i._id);
    const species =
      filterValues && filterValues.species && filterValues.species.length && filterValues.species.map((i) => i._id);
    const zoos = filterValues && filterValues.zoos && filterValues.zoos.length && filterValues.zoos.map((i) => i._id);

    const organizations =
      filterValues &&
      filterValues.organizations &&
      filterValues.organizations.length &&
      filterValues.organizations.map((i) => i._id);

    setSelectedFilter({
      keyword: removeKeyword ? "" : filterValues && filterValues.keyword ? filterValues.keyword : "",
      regions: removeRegion ? "" : regions ? regions.toString() : [],
      species: removeSpecies ? "" : species ? species.toString() : [],
      zoos: removeZoos ? "" : zoos ? zoos.toString() : [],
      organizations: removeOrganization ? "" : organizations ? organizations.toString() : [],

      categories: removeCategory
        ? ""
        : filterValues && filterValues.categories.length > 0
        ? filterValues.categories.map((it) => it?.name).join(",")
        : [],
    });
    const params = {
      isActive: true,
      page: 1,
      sort,
      order,
      keyword: removeKeyword ? "" : filterValues && filterValues.keyword ? filterValues.keyword : "",
      regions: removeRegion ? "" : regions ? regions.toString() : [],
      species: removeSpecies ? "" : species ? species.toString() : [],
      zoos: removeZoos ? "" : zoos ? zoos.toString() : [],
      organizations: removeOrganization ? "" : organizations ? organizations.toString() : [],

      category: removeCategory
        ? ""
        : filterValues && filterValues.categories.length > 0
        ? filterValues.categories.map((it) => it?._id).join(",")
        : [],
    };
    props.getNewsListing(params, (res) => {
      if (res && res.status === 200) {
        ref && ref.current && ref.current.complete();
        setLoadingNews(false);
        if (!isModalOpen) {
          toggleFilterModal();
        }
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingNews(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  };

  const addNewsHandler = (e) => {
    if (validateHandler()) {
      const value = { ...selectNews };
      setError({});
      e.preventDefault();
      ref && ref.current && ref.current.continuousStart();
      setLoadingNews(true);

      const payload = {
        name: value.name ? value.name : "",
        description: editorData ? editorData : "",
        species: value.species && value.species.length > 0 ? value.species.map((item) => item._id) : [],
        organizations:
          value.organizations && value.organizations.length > 0 ? value.organizations.map((item) => item._id) : [],
        regions: value.regions && value.regions.length > 0 ? value.regions.map((item) => item._id) : [],
        zoos: value.zoos && value.zoos.length > 0 ? value.zoos.map((item) => item._id) : [],

        categories: value?.categories.length > 0 ? value.categories.map((it) => it._id) : [],
        author: value.author ? value.author : "",
        sourceUrl: value.sourceUrl ? value.sourceUrl : "",
      };
      props.addNewsData(payload, (res) => {
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
            zoos: "",
            category: "",
          };
          props.getNewsListing(params, (res) => {
            ref && ref?.current && ref?.current?.complete();
            if (res.status === 200) {
              setTotalCountPages(res.data.totalCount);
              setSelectNews("");
              setEditorData("");
              setLoadingNews(false);
              toggleAddNewsModal();

              toast(<AlertSuccess message="Information Saved" />);
            } else {
              ref && ref?.current && ref?.current?.complete();
              setLoadingNews(false);
              toast(
                <AlertError
                  message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"}
                />,
              );
            }
          });
        } else {
          ref && ref?.current && ref?.current?.complete();
          setLoadingNews(false);
          toast(
            <AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />,
          );
        }
      });
    }
  };

  const editHandler = (e) => {
    if (validateHandler()) {
      const value = { ...selectNews };
      setError({});
      e.preventDefault();
      ref && ref.current && ref.current.continuousStart();
      setLoadingNews(true);
      const payload = {
        name: value.name ? value.name : "",
        description: editorData ? editorData : "",
        species: value.species && value.species.length > 0 ? value.species.map((item) => item._id) : [],
        organizations:
          value.organizations && value.organizations.length > 0 ? value.organizations.map((item) => item._id) : [],
        zoos: value.zoos && value.zoos.length > 0 ? value.zoos.map((item) => item._id) : [],
        regions: value.regions && value.regions.length > 0 ? value.regions.map((item) => item._id) : [],
        categories: value?.categories.length > 0 ? value.categories.map((it) => it._id) : [],
        author: value.author ? value.author : "",
        sourceUrl: value.sourceUrl ? value.sourceUrl : "",
      };
      props.updateNewsData(value._id, payload, (res) => {
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
            zoos: "",
            category: "",
          };
          props.getNewsListing(params, (res) => {
            ref && ref?.current && ref?.current?.complete();
            if (res.status === 200) {
              setSelectNews("");
              setEditorData("");
              setLoadingNews(false);
              toggleEditNews();

              toast(<AlertSuccess message="Information Saved" />);
            } else {
              ref && ref?.current && ref?.current?.complete();
              setLoadingNews(false);
              toast(
                <AlertError
                  message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"}
                />,
              );
            }
          });
        } else {
          ref && ref?.current && ref?.current?.complete();
          setLoadingNews(false);
          toast(
            <AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />,
          );
        }
      });
    }
  };

  const deleteHandler = () => {
    setLoadingNews(true);
    ref && ref.current && ref.current.continuousStart();
    const id = newsId;
    props.deleteNewsData(id, (res) => {
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
          zoos: "",
          category: "",
        };
        props.getNewsListing(params, (res) => {
          if (res && res.status === 200) {
            setTotalCountPages(res.data.totalCount);
            ref && ref.current && ref.current.complete();
            setLoadingNews(false);
            toggleDeleteNews();
            toast(<AlertSuccess message={"Record deleted"} />);
          }
        });
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingNews(false);
        toggleDeleteNews();
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  };

  return (
    <div>
      <LoadingBar height={5} color="#47AD1D" ref={ref} />
      <Header />
      <div className="dashboard-insider position-relative d-lg-flex w-100 ">
        <Sidebar page={"News"} />
        <div className="main-container">
          {/* <!--============================== Filter Container Start ==============================--> */}
          <div className="filter-container d-flex align-items-center sticky-top">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center flex-wrap justify-content-between">
                  <div className="filter-title fw-medium text-capitalize">All News</div>
                  <div className="filter-widget-right d-flex align-items-center flex-wrap">
                    <div className="fw-item">
                      {loadingNews ? (
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
                    {loadingNews ? (
                      <div style={{ width: "10rem", paddingLeft: "15px" }}>
                        <Skeleton height="30px" width="50px" />
                      </div>
                    ) : (
                      <div className="fw-item">
                        <a className="btn btn-default" onClick={() => toggleAddNewsModal()}>
                          <img src={addIcon} alt="" />
                          Add a News
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
                      {!loadingNews &&
                      ((selectedFilter && selectedFilter.keyword) ||
                        (selectedFilter && selectedFilter.categories) ||
                        (selectedFilter && selectedFilter.regions) ||
                        (selectedFilter && selectedFilter.species) ||
                        (selectedFilter && selectedFilter.organizations) ||
                        (selectedFilter && selectedFilter.zoos) ||
                        (selectedFilter.keyword &&
                          selectedFilter.categories &&
                          selectedFilter.categories.length > 0 &&
                          selectedFilter.regions &&
                          selectedFilter.regions.length &&
                          selectedFilter.species &&
                          selectedFilter.species.length &&
                          selectedFilter.zoos &&
                          selectedFilter.zoos.length &&
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
                                    handleFilter(true, true, false, false, false, false, false);
                                  }}
                                />
                              </span>
                            )}

                            {selectedFilter && selectedFilter.categories?.length > 0 && (
                              <span className="badge">
                                Category :{" "}
                                <span>
                                  {" "}
                                  {filterState &&
                                    filterState.categories &&
                                    filterState.categories.length &&
                                    filterState.categories.map((i) => i.name).join(", ")}
                                </span>
                                <img
                                  className="tag-close-icon"
                                  src={closeIcon}
                                  alt=""
                                  onClick={() => {
                                    const data = { ...filterState };
                                    data.newsCategoryName = "";
                                    data.newsCategory = "";
                                    setFilterState(data);
                                    handleFilter(true, false, true, false, false, false, false);
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
                                    handleFilter(true, false, false, true, false, false, false);
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
                                    handleFilter(true, false, false, false, true, false, false);
                                  }}
                                />
                              </span>
                            ) : (
                              ""
                            )}
                            {selectedFilter && selectedFilter.zoos && selectedFilter.zoos.length ? (
                              <span className="badge">
                                Zoos:{" "}
                                <span>
                                  {filterState &&
                                    filterState.zoos &&
                                    filterState.zoos.length &&
                                    filterState.zoos.map((i) => i.name)}
                                </span>
                                <img
                                  className="tag-close-icon"
                                  src={closeIcon}
                                  alt=""
                                  onClick={() => {
                                    const data = { ...filterState };
                                    data.zoos = null;
                                    setFilterState(data);
                                    handleFilter(true, false, false, false, false, true, false);
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
                                    handleFilter(true, false, false, false, false, false, true);
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
                        {!loadingNews ? (
                          `Showing ${NewsData.length} of ${totalCountPages} total results`
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
                              News Name
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
                              Category Name
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
                        {loadingNews
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
                          : NewsData &&
                            NewsData.length > 0 &&
                            NewsData.map((item, index) => {
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
                                                      toggleEditNews();
                                                      setSelectNews(item);
                                                      setEditorData(item?.description);
                                                    }}
                                                  >
                                                    Edit
                                                  </Dropdown.Item>

                                                  <Dropdown.Item
                                                    onClick={() => {
                                                      toggleDeleteNews(item);
                                                    }}
                                                  >
                                                    Delete
                                                  </Dropdown.Item>
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          </td>

                                          <td style={{ width: "15%" }}>{item.name}</td>
                                          <td style={{ width: "15%" }}>{parse(dotDesc(item.description, 20))}</td>
                                          <td style={{ width: "12%" }}>
                                            <div class="td-img-group d-flex align-items-center">
                                              {item?.categories && item?.categories?.length > 0
                                                ? item?.categories[0]?.name[0].toUpperCase() +
                                                  item?.categories[0]?.name.slice(1).toLowerCase()
                                                : ""}

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
                                                      <u>
                                                        {item?.categories.length >= 2
                                                          ? `+ ${item?.categories?.length - 1}`
                                                          : ""}
                                                      </u>
                                                    </a>
                                                  </Dropdown.Toggle>

                                                  <Dropdown.Menu bsPrefix="dropdown-menu dropdown-menu-end">
                                                    <Dropdown.Item>
                                                      {item?.categories.map((it) => {
                                                        return (
                                                          <>
                                                            <tr>
                                                              <td>
                                                                {it?.name[0].toUpperCase() +
                                                                  it?.name.slice(1).toLowerCase()}
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

          <AddNewsModal
            show={showNewsModal}
            onHide={toggleAddNewsModal}
            loading={loadingNews}
            editorLoaded={editorLoaded}
            setEditorLoaded={setEditorLoaded}
            editorData={editorData}
            setEditorData={setEditorData}
            regionsDropdownData={regionsDropdownData}
            speciesDropdownData={speciesDropdownData}
            organizationsDropdownData={organizationsDropdownData}
            newsCategoryDropdownData={newsCategoryDropdownData}
            zooDropdownData={zooDropdownData}
            selectNews={selectNews}
            setSelectNews={setSelectNews}
            error={error}
            handleSubmit={addNewsHandler}
          />
          <NewsFilterModal
            show={showNewsFilter}
            onHide={toggleFilterModal}
            loading={loadingNews}
            regionsDropdownData={regionsDropdownData}
            speciesDropdownData={speciesDropdownData}
            organizationsDropdownData={organizationsDropdownData}
            newsCategoryDropdownData={newsCategoryDropdownData}
            zooDropdownData={zooDropdownData}
            setFilterState={setFilterState}
            filterState={filterState}
            handleFilter={handleFilter}
          />
          <EditNewsModal
            show={editNews}
            onHide={toggleEditNews}
            loading={loadingNews}
            editorLoaded={editorLoaded}
            setEditorLoaded={setEditorLoaded}
            editorData={editorData}
            setEditorData={setEditorData}
            regionsDropdownData={regionsDropdownData}
            speciesDropdownData={speciesDropdownData}
            organizationsDropdownData={organizationsDropdownData}
            newsCategoryDropdownData={newsCategoryDropdownData}
            zooDropdownData={zooDropdownData}
            selectNews={selectNews}
            setSelectNews={setSelectNews}
            error={error}
            handleSubmit={editHandler}
          />

          <DeleteModal
            show={deleteNews}
            onHide={toggleDeleteNews}
            loadingDelete={loadingNews}
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
  getNewsCategoryDropdown: (callBack) => dispatch(getNewsCategoryDropdown(callBack)),
  getOrganizationDropdown: (callBack) => dispatch(getOrganizationDropdown(callBack)),
  getSpeciesDropdown: (callBack) => dispatch(getSpeciesDropdown(callBack)),
  getZooDropdown: (callBack) => dispatch(getZooDropdown(callBack)),
  getNewsListing: (param, callBack) => dispatch(getNewsListing(param, callBack)),
  addNewsData: (data, callback) => dispatch(addNewsData(data, callback)),
  updateNewsData: (params, data, callback) => dispatch(updateNewsData(params, data, callback)),
  deleteNewsData: (params, callback) => dispatch(deleteNewsData(params, callback)),

  //   listingRegionReceived: (data) => dispatch(listingRegionReceived(data)),
});

const mapStateToProps = (state) => ({
  getNews: getNews(state),
  getapisForDropdown: getapisForDropdown(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ListingNews));
