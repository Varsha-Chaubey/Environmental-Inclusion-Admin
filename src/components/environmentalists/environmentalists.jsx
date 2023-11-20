import React, { useEffect, useState, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import addIcon from "../../include/images/plus-icon.svg";
import closeIcon from "../../include/images/close.svg";
import dotIcon from "../../include/images/more-icon.svg";
import Header from "../common/header";
import Sidebar from "../common/sideBar";
import parse from "html-react-parser";
import {
  getEnvironmentalistListing,
  getEnvironmentalist,
  addEnvironmentalistData,
  updateEnvironmentalist,
  deleteEnvironmentalist,
} from "../../store/environmentalists";
import {
  getRegionDropdown,
  getOrganizationDropdown,
  getSpeciesDropdown,
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
import _, { iteratee } from "lodash";
import DeleteModal from "../../layouts/modal/delete/deleteModal";
import SecondCommonFilterModal from "../common/secondCommonFilterModal";
import AddEnvironmentalistModal from "../../layouts/modal/environmentalistModal/addEnvironmentalistModal";
import EditEnvironmentalistModal from "../../layouts/modal/environmentalistModal/editEnvironmentalistModal";
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

const Environmentalist = (props) => {
  var ref = useRef(null);
  // for getting lists
  const [showEnvironmentalist, setShowEnvironmentalist] = useState(false);
  const [loadingEnvironmentalist, setLoadingEnvironmentalist] = useState(false);
  const [selectEnvironmentalist, setSelectEnvironmentalist] = useState(null);
  const [deleteEnvironmentalistModal, setDeleteEnvironmentalistModal] =
    useState(false);
  const [speciesDropdownData, setSpeciesDropdownData] = useState(null);
  const [organizationDropdownData, setOrganizationDropdownData] =
    useState(null);
  const [regionsDropdownData, setRegionsDropdownData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [error, setError] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalCountPages, setTotalCountPages] = useState("");
  const [eId, setID] = useState();
  const [filterState, setFilterState] = useState(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorData, setEditorData] = useState("");
  const [selectedDetailImage, setSelectedDetailImage] = useState(null);
  const [selectSocialMedia, setSelectSocialMedia] = useState(null);
  const toggleEnvironmentalist = () => {
    setShowEnvironmentalist(!showEnvironmentalist);
    setError({});
    setSelectEnvironmentalist("");
    setSelectSocialMedia("");
    setSelectedImage(null);
    setSelectedDetailImage(null);
    setEditorData("");
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
    setError({});
  };

  const toggleDeleteModal = (item) => {
    if (item !== undefined) {
      setID(item._id);
      setDeleteEnvironmentalistModal(!deleteEnvironmentalistModal);
    } else setDeleteEnvironmentalistModal(false);
  };

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingEnvironmentalist(true);
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
    props.getEnvironmentalist(params, (res) => {
      if (res && res.status === 200) {
        setLoadingEnvironmentalist(false);
        setTotalCountPages(res.data.totalCount);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingEnvironmentalist(false);
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
    setLoadingEnvironmentalist(true);
    const params = {
      isActive: true,
      sort,
      order,
      keyword: "",
      regions: "",
      species: "",
      organizations: "",
      page: currentPage,
    };
    props.getEnvironmentalist(params, (res) => {
      if (res && res.status === 200) {
        setTotalCountPages(res.data.totalCount);
        setLoadingEnvironmentalist(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingEnvironmentalist(false);
      }
    });
  }, [currentPage]);

  // for species
  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingEnvironmentalist(true);

    props.getSpeciesDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingEnvironmentalist(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingEnvironmentalist(false);
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
  // for organization
  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingEnvironmentalist(true);

    props.getOrganizationDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingEnvironmentalist(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingEnvironmentalist(false);
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

  // for regions
  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingEnvironmentalist(true);
    props.getRegionDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingEnvironmentalist(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingEnvironmentalist(false);
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

  const EnvironmentalistData =
    (props.getEnvironmentalistListing &&
      props.getEnvironmentalistListing.environmentalistItems &&
      props.getEnvironmentalistListing.environmentalistItems.data) ||
    {};

  const speciesData =
    (props.getapisForDropdown &&
      props.getapisForDropdown.speciesItems &&
      props.getapisForDropdown.speciesItems.data) ||
    {};

  const organizationData =
    (props.getapisForDropdown &&
      props.getapisForDropdown.organizationsItems &&
      props.getapisForDropdown.organizationsItems.data) ||
    {};

  const regionsData =
    (props.getapisForDropdown &&
      props.getapisForDropdown.regionItems &&
      props.getapisForDropdown.regionItems.data) ||
    {};

  // for filter dropdown
  useEffect(() => {
    const species =
      speciesData &&
      speciesData.length > 0 &&
      speciesData.map((item) => ({
        _id: item._id,
        name: item.name,
      }));
    setSpeciesDropdownData(species);

    const organization =
      organizationData &&
      organizationData.length > 0 &&
      organizationData.map((item) => ({
        _id: item._id,
        name: item.name,
      }));
    setOrganizationDropdownData(organization);

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
  }, [showEnvironmentalist, showFilterModal, showEditModal]);

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

    if (!selectEnvironmentalist || !selectEnvironmentalist.name) {
      errors.name = "Name is required";
    }

    if (!selectEnvironmentalist || !selectEnvironmentalist.yearsActive) {
      errors.yearsActive = "Years of Active is required";
    }

    if (!selectEnvironmentalist || !selectEnvironmentalist.movements) {
      errors.movements = "Movements is required";
    }
    if (
      !selectEnvironmentalist ||
      !selectEnvironmentalist.foundedOrganizations
    ) {
      errors.foundedOrganizations = "Founded Organizations is required";
    }
    if (!selectEnvironmentalist || !selectEnvironmentalist.awards) {
      errors.awards = "Awards is required";
    }
    if (!selectSocialMedia || !selectSocialMedia.facebook) {
      errors.facebook = "Facebook bio URL is required";
    }
    if (!selectSocialMedia || !selectSocialMedia.twitter) {
      errors.twitter = "Twitter bio URL is required";
    }
    if (!selectSocialMedia || !selectSocialMedia.instagram) {
      errors.instagram = "Instagram bio URL is required";
    }
    if (!editorData) {
      errors.description = "Description is required";
    }
    if (
      !selectEnvironmentalist ||
      (selectEnvironmentalist &&
        _.isEmpty(selectEnvironmentalist.coverImage) &&
        _.isNull(selectedImage))
    ) {
      errors.image = "Image is required";
    }

    if (
      !selectEnvironmentalist ||
      (selectEnvironmentalist &&
        _.isEmpty(selectEnvironmentalist.detailTabImage) &&
        _.isNull(selectedDetailImage))
    ) {
      errors.detailImage = "Detail Tab Image is required";
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
    removeOrganization = false,
    removeSpecies = false
  ) => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingEnvironmentalist(true);
    const filterValues = { ...filterState };
    const regions =
      filterValues &&
      filterValues.regions &&
      filterValues.regions.length &&
      filterValues.regions.map((i) => i._id);

    const species =
      filterValues &&
      filterValues.species &&
      filterValues.species.length &&
      filterValues.species.map((i) => i._id);

    const organization =
      filterValues &&
      filterValues.organizations &&
      filterValues.organizations.length &&
      filterValues.organizations.map((i) => i._id);
    setSelectedFilter({
      keyword: removeKeyword
        ? ""
        : filterValues && filterValues.keyword
        ? filterValues.keyword
        : "",
      regions: removeRegion ? "" : regions ? regions.toString() : [],

      organizations: removeOrganization
        ? ""
        : organization
        ? organization.toString()
        : [],
      species: removeSpecies ? "" : species ? species.toString() : [],
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

      organizations: removeOrganization
        ? ""
        : organization
        ? organization.toString()
        : [],
      species: removeSpecies ? "" : species ? species.toString() : [],
    };
    props.getEnvironmentalist(params, (res) => {
      if (res && res.status === 200) {
        ref && ref.current && ref.current.complete();
        setLoadingEnvironmentalist(false);
        if (!isModalOpen) {
          toggleFilterModal();
        }
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingEnvironmentalist(false);
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

  const AddEnvironmentalists = (e) => {
    if (validateHandler()) {
      if (
        selectEnvironmentalist?.newImage &&
        selectedImage &&
        selectEnvironmentalist?.newDetailImage &&
        selectedDetailImage
      ) {
        const value = { ...selectEnvironmentalist };
        const socialMediaLink = { ...selectSocialMedia };
        setError({});
        e.preventDefault();
        ref && ref.current && ref.current.continuousStart();
        setLoadingEnvironmentalist(true);

        const file1 = selectedImage;
        const file2 = selectedDetailImage;

        const fSize1 = Math.round(file1?.size / 1048576);
        const fSize2 = Math.round(file2?.size / 1048576);

        const fType1 = file1?.type;
        const fType2 = file2?.type;

        const ext1 = file1?.name.split(".").pop();
        const ext2 = file2?.name.split(".").pop();

        if (fSize1 > 25 || fSize2 > 25) {
          toast(
            <AlertError message="Size exceeds maximum allowable size. Maximum allowable size is 25MB." />
          );
          return setLoadingEnvironmentalist(false);
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
            setLoadingEnvironmentalist(false)
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
                  setLoadingEnvironmentalist(false),
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
                  setLoadingEnvironmentalist(false),
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
              movements: value.movements ? value.movements : "",
              foundedOrganizations: value.foundedOrganizations
                ? value.foundedOrganizations
                : "",
              awards: value.awards ? value.awards : "",
              yearsActive: value.yearsActive ? value.yearsActive : "",
              description: editorData ? editorData : "",
              species:
                value.species && value.species.length > 0
                  ? value.species.map((item) => item._id)
                  : [],
              organizations:
                value.organizations && value.organizations.length > 0
                  ? value.organizations.map((item) => item._id)
                  : [],
              regions:
                value.regions && value.regions.length > 0
                  ? value.regions.map((item) => item._id)
                  : [],
              socialMediaLink: socialMediaLink ? socialMediaLink : "",
            };
            props.addEnvironmentalistData(payload, (res) => {
              if (res.status === 200) {
                const params = {
                  isActive: true,
                  page: 1,
                  sort,
                  order,
                  keyword: "",
                  organizations: "",
                  regions: "",
                  species: "",
                };
                props.getEnvironmentalist(params, (res) => {
                  ref && ref.current && ref.current.complete();
                  if (res.status === 200) {
                    setSelectedImage(null);
                    setSelectedDetailImage(null);
                    setSelectEnvironmentalist("");
                    setSelectSocialMedia("");
                    setEditorData("");
                    setTotalCountPages(res.data.totalCount);
                    setLoadingEnvironmentalist(false);
                    toggleEnvironmentalist();

                    toast(<AlertSuccess message="Information Saved" />);
                  } else {
                    ref && ref.current && ref.current.complete();
                    setLoadingEnvironmentalist(false);
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
                setLoadingEnvironmentalist(false);
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
      selectEnvironmentalist?.newImage ||
      selectedImage ||
      selectEnvironmentalist?.newDetailImage ||
      selectedDetailImage
    ) {
      const value = { ...selectEnvironmentalist };
      const socialMediaLink = { ...selectSocialMedia };
      if (validateHandler()) {
        setError({});
        e.preventDefault();
        ref && ref.current && ref.current.continuousStart();
        setLoadingEnvironmentalist(true);
        const file1 = selectedImage || {};
        const file2 = selectedDetailImage || {};

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
          return setLoadingEnvironmentalist(false);
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
            setLoadingEnvironmentalist(false)
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
                    setSelectEnvironmentalist(false),
                    setSelectSocialMedia(""),
                    toast(<AlertError message={"Something Went Wrong"} />)
                  );
                },
              })
            );
          }
          if (selectedDetailImage) {
            img.push(
              Storage.put(fileName2, file2, {
                completeCallback: (event) => {},
                progressCallback: (progress) => {},
                errorCallback: (err) => {
                  return (
                    setSelectEnvironmentalist(false),
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
                value?.newDetailImage === true
                  ? `public/${result && result[1].key}`
                  : value?.detailTabImage,
              name: value.name ? value.name : "",

              movements:
                value.movements && value.movements.length > 0
                  ? value.movements.map((item) => ({
                      name: item.name,
                    }))
                  : [],
              foundedOrganizations:
                value.foundedOrganizations &&
                value.foundedOrganizations.length > 0
                  ? value.foundedOrganizations.map((item) => ({
                      name: item.name,
                    }))
                  : [],
              awards:
                value.awards && value.awards.length > 0
                  ? value.awards.map((item) => ({
                      name: item.name,
                    }))
                  : [],
              yearsActive: value.yearsActive ? value.yearsActive : "",
              description: editorData ? editorData : "",
              species:
                value.species && value.species.length > 0
                  ? value.species.map((item) => item._id)
                  : [],
              organizations:
                value.organizations && value.organizations.length > 0
                  ? value.organizations.map((item) => item._id)
                  : [],
              regions:
                value.regions && value.regions.length > 0
                  ? value.regions.map((item) => item._id)
                  : [],
              socialMediaLink: socialMediaLink ? socialMediaLink : "",
            };
            props.updateEnvironmentalist(value._id, payload, (res) => {
              if (res.status === 200) {
                const param = {
                  isActive: true,
                  page: 1,
                  sort,
                  order,
                  keyword: "",
                  species: "",
                  regions: "",
                  organizations: "",
                };
                props.getEnvironmentalist(param, (res) => {
                  ref && ref.current && ref.current.complete();
                  if (res.status === 200) {
                    setSelectedImage(null);
                    setSelectedDetailImage(null);
                    setSelectEnvironmentalist("");
                    setSelectSocialMedia("");
                    setEditorData("");
                    setLoadingEnvironmentalist(false);
                    toggleEditModal();

                    toast(<AlertSuccess message="Information Saved" />);
                  } else {
                    ref && ref.current && ref.current.complete();
                    setLoadingEnvironmentalist(false);
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
                setLoadingEnvironmentalist(false);
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
      setLoadingEnvironmentalist(true);
      const value = { ...selectEnvironmentalist };
      const socialMediaLink = { ...selectSocialMedia };
      const payload = {
        isActive: true,
        name: value.name ? value.name : "",
        movements:
          value.movements && value.movements.length > 0
            ? value.movements.map((item) => ({
                name: item.name,
              }))
            : [],
        foundedOrganizations:
          value.foundedOrganizations && value.foundedOrganizations.length > 0
            ? value.foundedOrganizations.map((item) => ({
                name: item.name,
              }))
            : [],
        awards:
          value.awards && value.awards.length > 0
            ? value.awards.map((item) => ({
                name: item.name,
              }))
            : [],
        yearsActive: value.yearsActive ? value.yearsActive : "",
        description: editorData ? editorData : "",
        species:
          value.species && value.species.length > 0
            ? value.species.map((item) => item._id)
            : [],
        organizations:
          value.organizations && value.organizations.length > 0
            ? value.organizations.map((item) => item._id)
            : [],
        regions:
          value.regions && value.regions.length > 0
            ? value.regions.map((item) => item._id)
            : [],
        coverImage: value.coverImage,
        detailTabImage: value.detailTabImage,
        socialMediaLink: socialMediaLink ? socialMediaLink : "",
      };
      props.updateEnvironmentalist(value._id, payload, (res) => {
        if (res.status === 200) {
          const param = {
            isActive: true,
            page: 1,
            sort,
            order,
            keyword: "",
            species: "",
            regions: "",
            organizations: "",
          };
          props.getEnvironmentalist(param, (res) => {
            ref && ref.current && ref.current.complete();
            if (res.status === 200) {
              setSelectEnvironmentalist("");
              setSelectSocialMedia("");
              setSelectedImage(null);
              setSelectedDetailImage(null);
              setEditorData("");
              setLoadingEnvironmentalist(false);
              toggleEditModal();
              ref && ref.current && ref.current.complete();
              toast(<AlertSuccess message="Information Saved" />);
            } else {
              ref && ref.current && ref.current.complete();
              setLoadingEnvironmentalist(false);
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
          setLoadingEnvironmentalist(false);
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
    setLoadingEnvironmentalist(true);
    ref && ref.current && ref.current.continuousStart();
    const id = eId;
    props.deleteEnvironmentalist(id, (res) => {
      if (res && res.status === 200) {
        const params = {
          isActive: true,
          page: 1,
          sort,
          order,
          keyword: "",
          species: "",
          organizations: "",
          regions: "",
        };
        props.getEnvironmentalist(params, (res) => {
          if (res && res.status === 200) {
            setTotalCountPages(res.data.totalCount);
            ref && ref.current && ref.current.complete();
            setLoadingEnvironmentalist(false);
            toggleDeleteModal();
            toast(<AlertSuccess message={"Record deleted"} />);
          }
        });
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingEnvironmentalist(false);
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
        <Sidebar page={"Environmentalists"} />
        <div className="main-container">
          {/* <!--============================== Filter Container Start ==============================--> */}
          <div className="filter-container d-flex align-items-center sticky-top">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center flex-wrap justify-content-between">
                  <div className="filter-title fw-medium text-capitalize">
                    All Environmentalists{" "}
                  </div>
                  <div className="filter-widget-right d-flex align-items-center flex-wrap">
                    <div className="fw-item">
                      {loadingEnvironmentalist ? (
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
                    {loadingEnvironmentalist ? (
                      <div style={{ width: "10rem", paddingLeft: "15px" }}>
                        <Skeleton height="30px" width="50px" />
                      </div>
                    ) : (
                      <div className="fw-item">
                        <a
                          className="btn btn-default _cursor"
                          onClick={() => toggleEnvironmentalist()}
                        >
                          <img src={addIcon} alt="" />
                          Add an Environmentalists
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
                      {!loadingEnvironmentalist &&
                      ((selectedFilter && selectedFilter.keyword) ||
                        (selectedFilter && selectedFilter.regions) ||
                        (selectedFilter && selectedFilter.organizations) ||
                        (selectedFilter && selectedFilter.species) ||
                        (selectedFilter.keyword &&
                          selectedFilter.regions &&
                          selectedFilter.regions.length &&
                          selectedFilter.organizations &&
                          selectedFilter.organizations.length &&
                          selectedFilter.species &&
                          selectedFilter.species.length)) ? (
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

                            {selectedFilter &&
                            selectedFilter.organizations &&
                            selectedFilter.organizations.length ? (
                              <span className="badge">
                                Organization :{" "}
                                <span>
                                  {filterState &&
                                    filterState.organizations &&
                                    filterState.organizations.length &&
                                    filterState.organizations.map(
                                      (i) => i.name
                                    )}
                                </span>
                                <img
                                  className="tag-close-icon"
                                  src={closeIcon}
                                  alt=""
                                  onClick={() => {
                                    const data = { ...filterState };
                                    data.organizations = null;
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
                            ) : (
                              ""
                            )}
                            {selectedFilter &&
                            selectedFilter.species &&
                            selectedFilter.species.length ? (
                              <span className="badge">
                                Species :{" "}
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
                        {!loadingEnvironmentalist ? (
                          `Showing ${EnvironmentalistData.length} of ${totalCountPages} total results`
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
                              Name
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
                              Years of Active
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
                        {loadingEnvironmentalist
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
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              )
                            )
                          : EnvironmentalistData &&
                            EnvironmentalistData.length > 0 &&
                            EnvironmentalistData.map((item, index) => {
                              const smallImg =
                                item.coverImage && item.coverImage.small;
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
                                                      setSelectEnvironmentalist(
                                                        item
                                                      );
                                                      setEditorData(
                                                        item?.description
                                                      );
                                                      setSelectSocialMedia(
                                                        item?.socialMediaLink
                                                      );
                                                      setSelectedImage([
                                                        {
                                                          name: smallImg,
                                                          type: "image/jpg",
                                                        },
                                                      ]);
                                                      setSelectedDetailImage([
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
                                            }}
                                          >
                                            {item?.yearsActive}
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
          <SecondCommonFilterModal
            show={showFilterModal}
            onHide={toggleFilterModal}
            regionsDropdownData={regionsDropdownData}
            speciesDropdownData={speciesDropdownData}
            organizationsDropdownData={organizationDropdownData}
            handleFilter={handleFilter}
            setFilterState={setFilterState}
            filterState={filterState}
            loading={loadingEnvironmentalist}
          />

          <AddEnvironmentalistModal
            show={showEnvironmentalist}
            onHide={toggleEnvironmentalist}
            loading={loadingEnvironmentalist}
            editorLoaded={editorLoaded}
            setEditorLoaded={setEditorLoaded}
            editorData={editorData}
            setEditorData={setEditorData}
            regionsDropdownData={regionsDropdownData}
            speciesDropdownData={speciesDropdownData}
            organizationDropdownData={organizationDropdownData}
            error={error}
            selectEnvironmentalist={selectEnvironmentalist}
            setSelectEnvironmentalist={setSelectEnvironmentalist}
            selectSocialMedia={selectSocialMedia}
            setSelectSocialMedia={setSelectSocialMedia}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            selectedDetailImage={selectedDetailImage}
            setSelectedDetailImage={setSelectedDetailImage}
            handleSubmit={AddEnvironmentalists}
          />

          <EditEnvironmentalistModal
            show={showEditModal}
            onHide={toggleEditModal}
            loading={loadingEnvironmentalist}
            editorLoaded={editorLoaded}
            setEditorLoaded={setEditorLoaded}
            editorData={editorData}
            setEditorData={setEditorData}
            regionsDropdownData={regionsDropdownData}
            organizationDropdownData={organizationDropdownData}
            speciesDropdownData={speciesDropdownData}
            error={error}
            selectEnvironmentalist={selectEnvironmentalist}
            setSelectEnvironmentalist={setSelectEnvironmentalist}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            selectedDetailImage={selectedDetailImage}
            setSelectedDetailImage={setSelectedDetailImage}
            handleSubmit={editHandler}
            selectSocialMedia={selectSocialMedia}
            setSelectSocialMedia={setSelectSocialMedia}
          />

          <DeleteModal
            show={deleteEnvironmentalistModal}
            onHide={toggleDeleteModal}
            loadingDelete={loadingEnvironmentalist}
            deleteHandler={deleteHandler}
          />
          {/* <!-- ============================= Table Container End ============================ --> */}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getEnvironmentalist: (params, callBack) =>
    dispatch(getEnvironmentalist(params, callBack)),
  getSpeciesDropdown: (callBack) => dispatch(getSpeciesDropdown(callBack)),
  getOrganizationDropdown: (callBack) =>
    dispatch(getOrganizationDropdown(callBack)),
  getRegionDropdown: (callBack) => dispatch(getRegionDropdown(callBack)),
  addEnvironmentalistData: (data, callback) =>
    dispatch(addEnvironmentalistData(data, callback)),
  updateEnvironmentalist: (params, data, callback) =>
    dispatch(updateEnvironmentalist(params, data, callback)),
  deleteEnvironmentalist: (params, callback) =>
    dispatch(deleteEnvironmentalist(params, callback)),
  // speciesListReceived: (data) => dispatch(speciesListReceived(data)),
});

const mapStateToProps = (state) => ({
  getEnvironmentalistListing: getEnvironmentalistListing(state),
  getapisForDropdown: getapisForDropdown(state),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Environmentalist));
