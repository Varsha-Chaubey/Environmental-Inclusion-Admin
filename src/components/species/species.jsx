import React, { useEffect, useState, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import addIcon from "../../include/images/plus-icon.svg";
import closeIcon from "../../include/images/close.svg";
import dotIcon from "../../include/images/more-icon.svg";
import Header from "../common/header";
import Sidebar from "../common/sideBar";
import parse from "html-react-parser";
import {
  getSpecies,
  getSpeciesList,
  addSpeciesData,
  updateSpecies,
  deleteSpecies,
  speciesListReceived,
} from "../../store/species";
import {
  getRegionDropdown,
  getSpeciesCategoryDropdown,
  getSpeciesDangerLevelDropdown,
  getapisForDropdown,
} from "../../store/apisForDropdown";
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
import SpeciesFilterModal from "../../layouts/modal/speciesModal/speciesFilterModal";
import AddSpeciesModal from "../../layouts/modal/speciesModal/AddSpeciesModal";
import EditSpeciesModal from "../../layouts/modal/speciesModal/editSpeciesModal";
import DeleteModal from "../../layouts/modal/delete/deleteModal";
import AddSpeciesMediaModal from "../../layouts/modal/speciesModal/addMediaModal";
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

const ListingSpecies = (props) => {
  var ref = useRef(null);
  // for getting lists
  const [showSpecies, setShowSpecies] = useState(false);
  const [loadingSpecies, setLoadingSpecies] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [deleteSpeciesModal, setDeleteSpeciesModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [error, setError] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [selectSpecies, setSelectSpecies] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dangerDropdownData, setDangerDropdownData] = useState(null);
  const [categoriesDropdownData, setCategoriesDropdownData] = useState(null);
  const [regionsDropdownData, setRegionsDropdownData] = useState(null);
  const [totalCountPages, setTotalCountPages] = useState("");
  const [sId, setID] = useState();
  const [filterState, setFilterState] = useState(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorData, setEditorData] = useState("");
  const [speciesMediaData, setSpeciesMediaData] = useState(null);
  const [selectDetailTabImage, setSelectDetailTabImage] = useState(null);

  const toggleSpecies = () => {
    setShowSpecies(!showSpecies);
    setError({});
    setSelectSpecies("");
    setSelectedImage(null);
    setSelectDetailTabImage(null);
    setEditorData("");
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
    setError({});
  };

  const toggleAddMediaModal = (item) => {
    if (item !== undefined) {
      setShowMediaModal(!showMediaModal);
      setID(item._id);
    } else setShowMediaModal(false);
  };

  const toggleDeleteModal = (item) => {
    if (item !== undefined) {
      setID(item._id);
      setDeleteSpeciesModal(!deleteSpeciesModal);
    } else setDeleteSpeciesModal(false);
  };

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingSpecies(true);
    const params = {
      isActive: true,
      page: 1,
      sort,
      order,
      keyword: "",
      category: "",
      regions: "",
      dangerLevel: "",
    };
    props.getSpeciesList(params, (res) => {
      if (res && res.status === 200) {
        setLoadingSpecies(false);
        setTotalCountPages(res.data.totalCount);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingSpecies(false);
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
    setLoadingSpecies(true);
    const params = {
      isActive: true,
      sort,
      order,
      keyword: "",
      category: "",
      regions: "",
      dangerLevel: "",
      page: currentPage,
    };
    props.getSpeciesList(params, (res) => {
      if (res && res.status === 200) {
        setTotalCountPages(res.data.totalCount);
        setLoadingSpecies(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingSpecies(false);
      }
    });
  }, [currentPage]);

  // for danger level
  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingSpecies(true);

    props.getSpeciesDangerLevelDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingSpecies(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingSpecies(false);
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
  // for category
  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingSpecies(true);

    props.getSpeciesCategoryDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingSpecies(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingSpecies(false);
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

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingSpecies(true);
    props.getRegionDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingSpecies(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingSpecies(false);
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

  const speciesData =
    (props.getSpecies &&
      props.getSpecies.speciesItem &&
      props.getSpecies.speciesItem.data) ||
    {};

  const dangerLevel =
    (props.getapisForDropdown &&
      props.getapisForDropdown.speciesDangerLevelItems &&
      props.getapisForDropdown.speciesDangerLevelItems.data) ||
    {};

  const categories =
    (props.getapisForDropdown &&
      props.getapisForDropdown.speciesCategoryItems &&
      props.getapisForDropdown.speciesCategoryItems.data) ||
    {};

  const regionsData =
    (props.getapisForDropdown &&
      props.getapisForDropdown.regionItems &&
      props.getapisForDropdown.regionItems.data) ||
    {};

  // for filter dropdown
  useEffect(() => {
    const dangerData =
      dangerLevel &&
      dangerLevel.length > 0 &&
      dangerLevel.map((item) => ({
        id: item._id,
        name: item.name,
      }));
    setDangerDropdownData(dangerData);

    const catData =
      categories &&
      categories.length > 0 &&
      categories.map((item) => ({
        id: item._id,
        name: item.name,
      }));
    setCategoriesDropdownData(catData);

    const regions =
      regionsData &&
      regionsData.length > 0 &&
      regionsData.map((item) => ({
        _id: item._id,
        state:
          item.country === "US"
            ? `${item.state}, ${item.countryName}`
            : item.state,
      }));
    setRegionsDropdownData(regions);
  }, [showSpecies, showFilterModal, showEditModal]);

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

    if (!selectSpecies || !selectSpecies.name) {
      errors.name = "Species is required";
    }

    if (!selectSpecies || !selectSpecies.scientificName) {
      errors.scientificName = "Scientific Name is required";
    }

    if (!selectSpecies || !selectSpecies.population) {
      errors.population = "Population is required";
    }
    if (!selectSpecies || !selectSpecies.habitat) {
      errors.habitat = "Habitat is required";
    }
    if (!selectSpecies || !selectSpecies.lifeSpan) {
      errors.lifeSpan = "Life Span is required";
    }
    if (!selectSpecies || !selectSpecies.weight) {
      errors.weight = "Weight is required";
    }
    if (!selectSpecies || !selectSpecies.naturalThreat) {
      errors.naturalThreat = "Natural Threat  is required";
    }
    if (!selectSpecies || !selectSpecies.humanThreat) {
      errors.humanThreat = "Human Threat  is required";
    }
    if (!selectSpecies || !selectSpecies.climateChangeThreat) {
      errors.climateChangeThreat = "Climate Change Threat is required";
    }

    if (!editorData) {
      errors.description = "Description is required";
    }
    if (
      !selectSpecies ||
      (selectSpecies &&
        _.isEmpty(selectSpecies.coverImage) &&
        _.isNull(selectedImage))
    ) {
      errors.image = "Image is required";
    }
    if (
      !selectSpecies ||
      (selectSpecies &&
        _.isEmpty(selectSpecies.detailTabImage) &&
        _.isNull(selectDetailTabImage))
    ) {
      errors.detailTabImage = "Detail Image is required";
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

  const handleFilter = (
    isModalOpen = false,
    removeKeyword = false,
    removeRegion = false,
    removeDangerLevel = false,
    removeCategory = false
  ) => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingSpecies(true);
    const filterValues = { ...filterState };

    const regions =
      filterValues &&
      filterValues.regions &&
      filterValues.regions.length &&
      filterValues.regions.map((i) => i._id);
    setSelectedFilter({
      keyword: removeKeyword
        ? ""
        : filterValues && filterValues.keyword
        ? filterValues.keyword
        : "",
      regions: removeRegion ? "" : regions ? regions.toString() : [],
      dangerLevel: removeDangerLevel
        ? ""
        : filterValues && filterValues.dangerLevel
        ? filterValues.dangerLevel
        : "",
      category: removeCategory
        ? ""
        : filterValues && filterValues.speciesCategory
        ? filterValues.speciesCategory
        : "",
    });
    const params = {
      isActive: true,
      page: 1,
      sort,
      order,
      keyword: removeKeyword
        ? ""
        : filterValues && filterValues.keyword
        ? filterValues.keyword
        : "",
      regions: removeRegion ? "" : regions ? regions.toString() : [],
      dangerLevel: removeDangerLevel
        ? ""
        : filterValues && filterValues.dangerLevel
        ? filterValues.dangerLevel
        : "",
      category: removeCategory
        ? ""
        : filterValues && filterValues.speciesCategory
        ? filterValues.speciesCategory
        : "",
    };
    props.getSpeciesList(params, (res) => {
      if (res && res.status === 200) {
        ref && ref.current && ref.current.complete();
        setLoadingSpecies(false);
        if (!isModalOpen) {
          toggleFilterModal();
        }
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingSpecies(false);
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

  const AddSpeciesHandler = (e) => {
    if (validateHandler()) {
      if (
        selectSpecies?.newImage &&
        selectSpecies?.detailImage &&
        selectedImage &&
        selectDetailTabImage
      ) {
        const value = { ...selectSpecies };
        setError({});
        e.preventDefault();
        ref && ref.current && ref.current.continuousStart();
        setLoadingSpecies(true);

        const file1 = selectedImage;
        const file2 = selectDetailTabImage;
        const fSize1 = Math.round(file1.size / 1048576);
        const fSize2 = Math.round(file2.size / 1048576);
        const fType1 = file1.type;
        const fType2 = file2.type;
        const ext1 = file1.name.split(".").pop();
        const ext2 = file2.name.split(".").pop();
        if (fSize1 > 25 || fSize2 > 25) {
          toast(
            <AlertError message="Size exceeds maximum allowable size. Maximum allowable size is 25MB." />
          );
          return setLoadingSpecies(false);
        } else if (
          !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            fType1
          ) ||
          !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            fType2
          )
        ) {
          return (
            toast(
              <AlertError message="Image is not of correct format and hence cannot be uploaded. Valid image formats are jpg, jpeg, png and webp." />
            ),
            setLoadingSpecies(false)
          );
        } else {
          const fileName1 = uuidv4() + "." + ext1;
          const fileName2 = uuidv4() + "." + ext2;

          const img = [];
          img.push(
            Storage.put(fileName1, file1, {
              completeCallback: (event) => {},
              progressCallback: (progress) => {},
              errorCallback: (err) => {
                return (
                  setLoadingSpecies(false),
                  toast(<AlertError message={"Something Went Wrong"} />)
                );
              },
            })
          );
          img.push(
            Storage.put(fileName2, file2, {
              completeCallback: (event) => {},
              progressCallback: (progress) => {},
              errorCallback: (err) => {
                return (
                  setLoadingSpecies(false),
                  toast(<AlertError message={"Something Went Wrong"} />)
                );
              },
            })
          );

          const allPromise = Promise.all([...img]);
          allPromise.then((values) => {
            const result = values;
            const payload = {
              coverImage: `public/${result && result[0].key}`,
              detailTabImage: `public/${result && result[1].key}`,
              name: value.name ? value.name : "",
              scientificName: value.scientificName ? value.scientificName : "",
              population: value.population ? value.population : "",
              habitat: value.habitat ? value.habitat : "",
              lifeSpan: value.lifeSpan ? value.lifeSpan : "",
              weight: value.weight ? value.weight : "",
              humanThreat: value.humanThreat ? value.humanThreat : "",
              naturalThreat: value.naturalThreat ? value.naturalThreat : "",
              climateChangeThreat: value.climateChangeThreat
                ? value.climateChangeThreat
                : "",
              description: editorData ? editorData : "",
              category: value.categoriesSpeciesId
                ? value.categoriesSpeciesId
                : "",
              dangerLevel: value.dangerSpeciesId ? value.dangerSpeciesId : "",
              regions:
                value.regions && value.regions.length > 0
                  ? value.regions.map((item) => item._id)
                  : [],
            };
            props.addSpeciesData(payload, (res) => {
              if (res.status === 200) {
                const params = {
                  isActive: true,
                  page: 1,
                  sort,
                  order,
                  keyword: "",
                  category: "",
                  regions: "",
                  dangerLevel: "",
                };
                props.getSpeciesList(params, (res) => {
                  ref && ref.current && ref.current.complete();
                  if (res.status === 200) {
                    setSelectedImage(null);
                    setSelectDetailTabImage(null);
                    setSelectSpecies("");
                    setEditorData("");
                    setTotalCountPages(res.data.totalCount);
                    setLoadingSpecies(false);
                    toggleSpecies();

                    toast(<AlertSuccess message="Information Saved" />);
                  } else {
                    ref && ref.current && ref.current.complete();
                    setLoadingSpecies(false);
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
                ref && ref.current && ref.current.complete();
                setLoadingSpecies(false);
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
  };
  const editHandler = (e) => {
    if (
      selectSpecies?.newImage ||
      selectSpecies?.detailImage ||
      selectedImage ||
      selectDetailTabImage
    ) {
      const value = { ...selectSpecies };
      if (validateHandler()) {
        setError({});
        e.preventDefault();
        ref && ref.current && ref.current.continuousStart();
        setLoadingSpecies(true);
        const file1 = selectedImage || {};
        const file2 = selectDetailTabImage || {};
        const fSize1 = file1.size ? Math.round(file1.size / 1048576) : {};
        const fSize2 = file2.size ? Math.round(file2.size / 1048576) : {};
        const fType1 = file1.type ? file1.type : "image/jpg";
        const fType2 = file2.type ? file2.type : "image/jpg";
        const ext1 = file1 && file1.name ? file1.name.split(".").pop() : "";
        const ext2 = file2 && file2.name ? file2.name.split(".").pop() : "";

        if (fSize1 > 25 || fSize2 > 25) {
          toast(
            <AlertError message="Size exceeds maximum allowable size. Maximum allowable size is 25MB." />
          );
          return setLoadingSpecies(false);
        } else if (
          !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            fType1
          ) ||
          !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            fType2
          )
        ) {
          return (
            toast(
              <AlertError message="Image is not of correct format and hence cannot be uploaded. Valid image formats are jpg, jpeg, png and webp." />
            ),
            setLoadingSpecies(false)
          );
        } else {
          const fileName1 = uuidv4() + "." + ext1;
          const fileName2 = uuidv4() + "." + ext2;
          const img = [];

          if (selectedImage) {
            img.push(
              Storage.put(fileName1, file1, {
                completeCallback: (event) => {},
                progressCallback: (progress) => {},
                errorCallback: (err) => {
                  return (
                    setLoadingSpecies(false),
                    toast(<AlertError message={"Something Went Wrong"} />)
                  );
                },
              })
            );
          }
          if (selectDetailTabImage) {
            img.push(
              Storage.put(fileName2, file2, {
                completeCallback: (event) => {},
                progressCallback: (progress) => {},
                errorCallback: (err) => {
                  return (
                    setLoadingSpecies(false),
                    toast(<AlertError message={"Something Went Wrong"} />)
                  );
                },
              })
            );
          }

          const allPromise = Promise.all([...img]);
          allPromise.then((values) => {
            const result = values;
            const payload = {
              isActive: true,
              coverImage:
                value?.newImage === true
                  ? `public/${result && result[0].key}`
                  : value?.coverImage,
              detailTabImage:
                value?.detailImage === true
                  ? `public/${result && result[1].key}`
                  : value?.detailTabImage,
              name: value.name ? value.name : "",
              scientificName: value.scientificName ? value.scientificName : "",
              population: value.population ? value.population : "",
              habitat: value.habitat ? value.habitat : "",
              lifeSpan: value.lifeSpan ? value.lifeSpan : "",
              weight: value.weight ? value.weight : "",
              humanThreat: value.humanThreat ? value.humanThreat : "",
              naturalThreat: value.naturalThreat ? value.naturalThreat : "",
              climateChangeThreat: value.climateChangeThreat
                ? value.climateChangeThreat
                : "",
              description: editorData ? editorData : "",
              category: value.speciesCategory ? value.speciesCategory : "",
              dangerLevel: value.dangerLevel ? value.dangerLevel : "",
              regions:
                value.regions && value.regions.length > 0
                  ? value.regions.map((item) => item._id)
                  : [],
            };

            props.updateSpecies(value._id, payload, (res) => {
              if (res.status === 200) {
                const param = {
                  isActive: true,
                  page: 1,
                  sort,
                  order,
                  keyword: "",
                  category: "",
                  regions: "",
                  dangerLevel: "",
                };
                props.getSpeciesList(param, (res) => {
                  ref && ref.current && ref.current.complete();
                  if (res.status === 200) {
                    setSelectedImage(null);
                    setSelectDetailTabImage(null);
                    setSelectSpecies("");
                    setEditorData("");
                    setLoadingSpecies(false);
                    toggleEditModal();

                    toast(<AlertSuccess message="Information Saved" />);
                  } else {
                    ref && ref.current && ref.current.complete();
                    setLoadingSpecies(false);
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
                ref && ref.current && ref.current.complete();
                setLoadingSpecies(false);
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
    } else {
      if (!validateHandler()) return;
      setError({});

      ref && ref.current && ref.current.continuousStart();
      setLoadingSpecies(true);
      const value = { ...selectSpecies };

      const Image =
        value.coverImage && value.coverImage.original
          ? value.coverImage.original
          : "";
      const payload = {
        isActive: true,
        name: value.name ? value.name : "",
        scientificName: value.scientificName ? value.scientificName : "",
        population: value.population ? value.population : "",
        habitat: value.habitat ? value.habitat : "",
        lifeSpan: value.lifeSpan ? value.lifeSpan : "",
        weight: value.weight ? value.weight : "",
        humanThreat: value.humanThreat ? value.humanThreat : "",
        naturalThreat: value.naturalThreat ? value.naturalThreat : "",
        climateChangeThreat: value.climateChangeThreat
          ? value.climateChangeThreat
          : "",
        description: editorData ? editorData : "",
        category: value.speciesCategory ? value.speciesCategory : "",
        dangerLevel: value.dangerLevel ? value.dangerLevel : "",
        regions:
          value.regions && value.regions.length > 0
            ? value.regions.map((item) => item._id)
            : [],
        coverImage: value.coverImage,
        detailTabImage: value.detailTabImage,
      };
      props.updateSpecies(value._id, payload, (res) => {
        if (res.status === 200) {
          const param = {
            isActive: true,
            page: 1,
            sort,
            order,
            keyword: "",
            category: "",
            regions: "",
            dangerLevel: "",
          };
          props.getSpeciesList(param, (res) => {
            ref && ref.current && ref.current.complete();
            if (res.status === 200) {
              setSelectSpecies("");
              setSelectedImage(null);
              setSelectDetailTabImage(null);
              setEditorData("");
              setLoadingSpecies(false);
              toggleEditModal();
              ref && ref.current && ref.current.complete();
              toast(<AlertSuccess message="Information Saved" />);
            } else {
              ref && ref.current && ref.current.complete();
              setLoadingSpecies(false);
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
          ref && ref.current && ref.current.complete();
          setLoadingSpecies(false);
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
    }
  };

  const deleteHandler = () => {
    setLoadingSpecies(true);
    ref && ref.current && ref.current.continuousStart();
    const id = sId;
    props.deleteSpecies(id, (res) => {
      if (res && res.status === 200) {
        const params = {
          isActive: true,
          page: 1,
          sort,
          order,
          keyword: "",
          category: "",
          regions: "",
          dangerLevel: "",
        };
        props.getSpeciesList(params, (res) => {
          if (res && res.status === 200) {
            setTotalCountPages(res.data.totalCount);
            ref && ref.current && ref.current.complete();
            setLoadingSpecies(false);
            toggleDeleteModal();
            toast(<AlertSuccess message={"Record deleted"} />);
          }
        });
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingSpecies(false);
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
        <Sidebar page={"Species"} />
        <div className="main-container">
          {/* <!--============================== Filter Container Start ==============================--> */}
          <div className="filter-container d-flex align-items-center sticky-top">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center flex-wrap justify-content-between">
                  <div className="filter-title fw-medium text-capitalize">
                    All Species{" "}
                  </div>
                  <div className="filter-widget-right d-flex align-items-center flex-wrap">
                    <div className="fw-item">
                      {loadingSpecies ? (
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
                    {loadingSpecies ? (
                      <div style={{ width: "10rem", paddingLeft: "15px" }}>
                        <Skeleton height="30px" width="50px" />
                      </div>
                    ) : (
                      <div className="fw-item">
                        <a
                          className="btn btn-default _cursor"
                          onClick={() => toggleSpecies()}
                        >
                          <img src={addIcon} alt="" />
                          Add a Species
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
                      {!loadingSpecies &&
                      ((selectedFilter && selectedFilter.keyword) ||
                        (selectedFilter && selectedFilter.regions) ||
                        (selectedFilter && selectedFilter.dangerLevel) ||
                        (selectedFilter && selectedFilter.category) ||
                        (selectedFilter.keyword &&
                          selectedFilter.regions &&
                          selectedFilter.regions.length &&
                          selectedFilter.dangerLevel &&
                          selectedFilter.category)) ? (
                        <>
                          <div className="filter-tag-title">
                            Filters Applied :
                          </div>
                          <div className="tags">
                            {selectedFilter && selectedFilter.keyword && (
                              <span className="badge">
                                Keyword :{" "}
                                <span>
                                  {filterState && filterState.keyword}
                                </span>
                                <img
                                  className="tag-close-icon"
                                  src={closeIcon}
                                  alt=""
                                  onClick={() => {
                                    const data = { ...filterState };
                                    data.keyword = "";
                                    setFilterState(data);
                                    handleFilter(
                                      true,
                                      true,
                                      false,
                                      false,
                                      false
                                    );
                                  }}
                                />
                              </span>
                            )}

                            {selectedFilter &&
                            selectedFilter.regions &&
                            selectedFilter.regions.length ? (
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
                                    handleFilter(
                                      true,
                                      false,
                                      true,
                                      false,
                                      false
                                    );
                                  }}
                                />
                              </span>
                            ) : (
                              ""
                            )}

                            {selectedFilter && selectedFilter.dangerLevel && (
                              <span className="badge">
                                Danger Level :{" "}
                                <span>
                                  {filterState && filterState.dangerLevelName}
                                </span>
                                <img
                                  className="tag-close-icon"
                                  src={closeIcon}
                                  alt=""
                                  onClick={() => {
                                    const data = { ...filterState };
                                    data.dangerLevelName = "";
                                    setFilterState(data);
                                    handleFilter(
                                      true,
                                      false,
                                      false,
                                      true,
                                      false
                                    );
                                  }}
                                />
                              </span>
                            )}
                            {selectedFilter && selectedFilter.category && (
                              <span className="badge">
                                Category :{" "}
                                <span>
                                  {filterState &&
                                    filterState.speciesCategoryName}
                                </span>
                                <img
                                  className="tag-close-icon"
                                  src={closeIcon}
                                  alt=""
                                  onClick={() => {
                                    const data = { ...filterState };
                                    data.speciesCategoryName = "";
                                    setFilterState(data);
                                    handleFilter(
                                      true,
                                      false,
                                      false,
                                      false,
                                      true
                                    );
                                  }}
                                />
                              </span>
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="tb-filter-right d-flex align-items-center justify-content-end">
                      <div className="showing-result-text">
                        {!loadingSpecies ? (
                          `Showing ${speciesData.length} of ${totalCountPages} total results`
                        ) : (
                          <Skeleton width="300px" height="25px" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className=" position-relative">
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
                              Species
                              <div
                                className={
                                  order === "asc" && sort === "name"
                                    ? "ascending-icon active"
                                    : "ascending-icon"
                                }
                                onClick={() => {
                                  setOrder("asc");
                                  setSort("name");
                                }}
                              ></div>
                              <div
                                className={
                                  order === "desc" && sort === "name"
                                    ? "descending-icon active"
                                    : "descending-icon"
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
                              Danger Level
                            </a>
                          </th>

                          <th style={{ width: "15%" }}>
                            <a href="#!" className="sort-by">
                              Species Category
                            </a>
                          </th>

                          <th style={{ width: "12%" }}>
                            <a href="#!" className="sort-by">
                              Region
                            </a>
                          </th>

                          <th style={{ width: "15%" }}>
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
                        {loadingSpecies
                          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4].map(
                              (item) => (
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
                                        <td
                                          style={{ width: "15%" }}
                                          className="word-break"
                                        >
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
                              )
                            )
                          : speciesData &&
                            speciesData.length > 0 &&
                            speciesData.map((item, index) => {
                              const smallImg =
                                item.coverImage && item.coverImage.small;

                              const regions = item.regions;

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
                                                    onClick={() => {
                                                      toggleEditModal();
                                                      setSelectSpecies(item);
                                                      setEditorData(
                                                        item?.description
                                                      );
                                                      setSelectedImage([
                                                        {
                                                          name: smallImg,
                                                          type: "image/jpg",
                                                        },
                                                      ]);
                                                      setSelectDetailTabImage([
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
                                                      toggleAddMediaModal(item);
                                                      setSpeciesMediaData(item);
                                                    }}
                                                  >
                                                    Add Media
                                                  </Dropdown.Item>

                                                  <Dropdown.Item
                                                    onClick={() => {
                                                      toggleDeleteModal(item);
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
                                              <img
                                                src={
                                                  process.env.REACT_APP_MEDIA +
                                                  `${smallImg}`
                                                }
                                                alt=""
                                              />
                                            </div>
                                          </td>

                                          <td style={{ width: "15%" }}>
                                            {item.name}
                                          </td>
                                          <td style={{ width: "15%" }}>
                                            {parse(
                                              dotDesc(item?.description, 20)
                                            )}
                                          </td>

                                          <td
                                            style={{
                                              width: "12%",
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            {item?.dangerLevelName}
                                          </td>

                                          <td
                                            style={{
                                              width: "15%",
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            {item?.speciesCategoryName}
                                          </td>

                                          <td style={{ width: "12%" }}>
                                            <div class="td-img-group d-flex align-items-center">
                                              {item?.country === "US"
                                                ? `${item?.state}, ${item?.countryName}`
                                                : item?.state}
                                              {regions?.length &&
                                              regions[0] &&
                                              regions[0].country === "US"
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
                                                      <u>
                                                        {regions.length >= 2
                                                          ? `+ ${
                                                              regions.length - 1
                                                            }`
                                                          : ""}
                                                      </u>
                                                    </a>
                                                  </Dropdown.Toggle>

                                                  <Dropdown.Menu bsPrefix="dropdown-menu dropdown-menu-end">
                                                    <Dropdown.Item>
                                                      {regions.map((item) => {
                                                        return (
                                                          <>
                                                            <tr>
                                                              <td>
                                                                {item?.country ===
                                                                "US"
                                                                  ? `${item?.state}, ${item?.countryName}`
                                                                  : item?.state}
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
          <Pagination
            handlePageClick={handlePageClick}
            currentPage={currentPage}
            pageLinks={pageLinks}
            totalPages={totalPages}
          />
          <SpeciesFilterModal
            show={showFilterModal}
            onHide={toggleFilterModal}
            regionsDropdownData={regionsDropdownData}
            dangerDropdownData={dangerDropdownData}
            categoriesDropdownData={categoriesDropdownData}
            handleFilter={handleFilter}
            setFilterState={setFilterState}
            filterState={filterState}
            loading={loadingSpecies}
          />
          <AddSpeciesModal
            show={showSpecies}
            onHide={toggleSpecies}
            loading={loadingSpecies}
            editorLoaded={editorLoaded}
            setEditorLoaded={setEditorLoaded}
            editorData={editorData}
            setEditorData={setEditorData}
            regionsDropdownData={regionsDropdownData}
            dangerDropdownData={dangerDropdownData}
            categoriesDropdownData={categoriesDropdownData}
            error={error}
            selectSpecies={selectSpecies}
            setSelectSpecies={setSelectSpecies}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            handleSubmit={AddSpeciesHandler}
            selectDetailTabImage={selectDetailTabImage}
            setSelectDetailTabImage={setSelectDetailTabImage}
          />
          <AddSpeciesMediaModal
            show={showMediaModal}
            onHide={toggleAddMediaModal}
            setShowMediaModal={setShowMediaModal}
            loading={loadingSpecies}
            sId={sId}
            speciesMediaData={speciesMediaData}
            sort={sort}
            order={order}
          />
          <EditSpeciesModal
            show={showEditModal}
            onHide={toggleEditModal}
            loading={loadingSpecies}
            editorLoaded={editorLoaded}
            setEditorLoaded={setEditorLoaded}
            editorData={editorData}
            setEditorData={setEditorData}
            regionsDropdownData={regionsDropdownData}
            dangerDropdownData={dangerDropdownData}
            categoriesDropdownData={categoriesDropdownData}
            error={error}
            selectSpecies={selectSpecies}
            setSelectSpecies={setSelectSpecies}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            selectDetailTabImage={selectDetailTabImage}
            setSelectDetailTabImage={setSelectDetailTabImage}
            handleSubmit={editHandler}
          />
          <DeleteModal
            show={deleteSpeciesModal}
            onHide={toggleDeleteModal}
            loadingDelete={loadingSpecies}
            deleteHandler={deleteHandler}
          />
          {/* <!-- ============================= Table Container End ============================ --> */}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getSpeciesList: (params, callBack) =>
    dispatch(getSpeciesList(params, callBack)),
  getSpeciesDangerLevelDropdown: (callBack) =>
    dispatch(getSpeciesDangerLevelDropdown(callBack)),
  getSpeciesCategoryDropdown: (callBack) =>
    dispatch(getSpeciesCategoryDropdown(callBack)),
  getRegionDropdown: (callBack) => dispatch(getRegionDropdown(callBack)),
  addSpeciesData: (data, callback) => dispatch(addSpeciesData(data, callback)),
  updateSpecies: (params, data, callback) =>
    dispatch(updateSpecies(params, data, callback)),
  deleteSpecies: (params, callback) =>
    dispatch(deleteSpecies(params, callback)),
  speciesListReceived: (data) => dispatch(speciesListReceived(data)),
});

const mapStateToProps = (state) => ({
  getSpecies: getSpecies(state),
  getapisForDropdown: getapisForDropdown(state),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ListingSpecies));
