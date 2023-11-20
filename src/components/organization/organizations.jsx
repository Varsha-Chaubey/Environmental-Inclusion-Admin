import React, { useEffect, useState, useRef } from "react";
import addIcon from "../../include/images/plus-icon.svg";
import closeIcon from "../../include/images/close.svg";
import dotIcon from "../../include/images/more-icon.svg";
import { connect } from "react-redux";
import {
  getOrganization,
  getOrganizationListing,
  updateOrganization,
  addOrganizationData,
  deleteOrganizationData,
} from "../../store/organization";
import {
  getRegionDropdown,
  getapisForDropdown,
  getSpeciesDropdown,
  getCountriesDropdown,
  getUsStateDropdown,
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
import AddOrganizationModal from "../../layouts/modal/organizationModal/addOrganizationModal";
import DeleteModal from "../../layouts/modal/delete/deleteModal";
import OrganizationFilterModal from "../../layouts/modal/organizationModal/organizationFilterModal";
import OrganizationEdit from "../../layouts/modal/organizationModal/organizationEditModal";

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

const ListingOrganizations = (props) => {
  var ref = useRef(null);
  const [loadingOrganization, setLoadingOrganization] = useState(false);
  const [showOrganization, setshowOrganization] = useState(false);
  const [showOrganizationFilter, setShowOrganizationFilter] = useState(false);
  const [filterState, setFilterState] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [speciesDropdownData, setSpeciesDropdownData] = useState(null);
  const [regionsDropdownData, setRegionsDropdownData] = useState(null);
  const [error, setError] = useState({});
  const [selectOrganization, setSelectOrganization] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalCountPages, setTotalCountPages] = useState("");
  const [organizationId, setOrganizationId] = useState(null);
  const [deleteOrganization, setDeleteOrganization] = useState(false);
  const [editOrganization, setEditOrganization] = useState(false);
  const [countriesDropdownData, setCountriesDropdownData] = useState(null);
  const [usStateDropdownData, setUsStateDropdownData] = useState(null);
  const [selectOrganizationLocation, setSelectOrganizationLocation] =
    useState(null);
  const [isCheck, setIsCheck] = useState(false);
  const [selectedBannerImage, setSelectedBannerImage] = useState(null);
  const [selectedDetailTabImage, setSelectedDetailTabImage] = useState(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorData, setEditorData] = useState("");
  const [selectSocialMedia, setSelectSocialMedia] = useState(null);
  const toggleFilterModal = () => {
    setShowOrganizationFilter(!showOrganizationFilter);
  };

  const toggleAddOrganization = () => {
    setshowOrganization(!showOrganization);
    setError({});
    setSelectOrganization("");
    setSelectedImage(null);
    setSelectOrganizationLocation("");
    setSelectSocialMedia("");
    setIsCheck(false);
    setSelectedDetailTabImage(null);
    setSelectedBannerImage(null);
    setEditorData("");
  };

  const toggleDeleteOrganization = (item) => {
    if (item !== undefined) {
      setOrganizationId(item._id);
      setDeleteOrganization(!deleteOrganization);
    } else setDeleteOrganization(false);
  };

  const toggleEditOrganization = () => {
    setEditOrganization(!editOrganization);
    setError({});
  };

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingOrganization(true);
    const param = {
      isActive: true,
      isAddedToDonation: false,
      keyword: "",
      regions: "",
      species: "",
      page: 1,
      order,
      sort,
    };
    props.getOrganizationListing(param, (res) => {
      if (res && res.status === 200) {
        setTotalCountPages(res.data.totalCount);
        setLoadingOrganization(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingOrganization(false);
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
    setLoadingOrganization(true);
    const params = {
      isActive: true,
      keyword: "",
      regions: "",
      species: "",
      page: currentPage,
      isAddedToDonation: false,
      order,
      sort,
    };
    props.getOrganizationListing(params, (res) => {
      if (res && res.status === 200) {
        setTotalCountPages(res.data.totalCount);
        setLoadingOrganization(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingOrganization(false);
      }
    });
  }, [currentPage]);

  // apis for dropdowns
  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingOrganization(true);

    props.getSpeciesDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingOrganization(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingOrganization(false);
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
    setLoadingOrganization(true);

    props.getRegionDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingOrganization(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingOrganization(false);
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
    setLoadingOrganization(true);

    props.getCountriesDropdown((res) => {
      if (res && res.status === 200) {
        setLoadingOrganization(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingOrganization(false);
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
    setLoadingOrganization(true);
    const payload = {
      id: 230,
    };
    props.getUsStateDropdown(payload, (res) => {
      if (res && res.status === 200) {
        setLoadingOrganization(false);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingOrganization(false);
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

  const regions =
    props.getapisForDropdown &&
    props.getapisForDropdown.regionItems &&
    props.getapisForDropdown.regionItems.data;

  const species =
    props.getapisForDropdown &&
    props.getapisForDropdown.speciesItems &&
    props.getapisForDropdown.speciesItems.data;

  const countries =
    props.getapisForDropdown &&
    props.getapisForDropdown.countriesItem &&
    props.getapisForDropdown.countriesItem.data;

  const usStates =
    props.getapisForDropdown &&
    props.getapisForDropdown.usStateItems &&
    props.getapisForDropdown.usStateItems.data;

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

    const regionData =
      regions &&
      regions.length > 0 &&
      regions.map((item) => ({
        _id: item._id,
        state:
          item.country === "US"
            ? `${item.state}, ${item.countryName}`
            : item.state,
      }));
    setRegionsDropdownData(regionData);

    const cData =
      countries &&
      countries.length > 0 &&
      countries.map((item) => ({
        id: item.id,
        code: item.code,
        name: item.name,
      }));
    setCountriesDropdownData(cData);

    const sData =
      usStates &&
      usStates.length > 0 &&
      usStates.map((item) => ({
        id: item.id,
        name: item.name,
      }));
    setUsStateDropdownData(sData);
  }, [showOrganization, showOrganizationFilter, editOrganization]);

  // for validations
  const validateHandler = () => {
    const errors = {};

    if (!selectOrganization || !selectOrganization.name) {
      errors.name = "Name is required";
    }
    if (!selectOrganization || !selectOrganization.donationUrl) {
      errors.donationUrl = "Donation Url is required";
    }
    if (
      !selectOrganization ||
      (selectOrganization &&
        _.isEmpty(selectOrganization.coverImage) &&
        _.isNull(selectedImage))
    ) {
      errors.image = "Image is required";
    }

    if (
      !selectOrganization ||
      (selectOrganization &&
        _.isEmpty(selectOrganization.bannerImage) &&
        _.isNull(selectedBannerImage))
    ) {
      errors.BannerImage = "Banner Image is required";
    }

    if (
      !selectOrganization ||
      (selectOrganization &&
        _.isEmpty(selectOrganization.detailTabImage) &&
        _.isNull(selectedDetailTabImage))
    ) {
      errors.DetailImage = "Detail Tab Image is required";
    }

    if (!selectOrganizationLocation || !selectOrganizationLocation.cityName) {
      errors.cityName = "City is required";
    }

    if (!selectOrganizationLocation || !selectOrganizationLocation.stateName) {
      errors.stateName = "State is required";
    }
    if (!selectOrganization || !selectOrganization.address) {
      errors.address = "Address is required";
    }

    if (!selectOrganization || !selectOrganization.zipCode) {
      errors.zipCode = "Zip Code is required";
    }

    if (!selectOrganization || !selectOrganization.yearsOfWorking) {
      errors.yearsOfWorking = "Years Of Working is required";
    }
    if (!selectOrganization || !selectOrganization.animalLivesSaved) {
      errors.animalLivesSaved = "Animal Lives Saved is required";
    }
    if (!selectOrganization || !selectOrganization.areaOfHabitatCovered) {
      errors.areaOfHabitatCovered = "Area of Habitat covered is required";
    }
    if (!selectOrganization || !selectOrganization.amountInvested) {
      errors.amountInvested = "Amount Invested is required";
    }
    if (!selectOrganization || !selectOrganization.animalReceivingCare) {
      errors.animalReceivingCare = "Animals Receiving Care is required";
    }
    if (!selectOrganization || !selectOrganization.helpingHands) {
      errors.helpingHands = "Helping Hands is required";
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
    const isEmpty = Object.values(errors).every((x) => x === null || x === "");

    if (!isEmpty) {
      setError(errors);
      return false;
    } else {
      setError(errors);
      return true;
    }
  };

  const organizationItems =
    (props.getOrganization &&
      props.getOrganization.organizationItem &&
      props.getOrganization.organizationItem.data) ||
    {};

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
    removeSpecies = false
  ) => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingOrganization(true);
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

    setSelectedFilter({
      keyword: removeKeyword
        ? ""
        : filterValues && filterValues.keyword
        ? filterValues.keyword
        : "",
      regions: removeRegion ? "" : regions ? regions.toString() : [],
      species: removeSpecies ? "" : species ? species.toString() : [],
    });
    const params = {
      isActive: true,
      page: 1,
      sort,
      order,
      isAddedToDonation: false,
      keyword: removeKeyword
        ? ""
        : filterValues && filterValues.keyword
        ? filterValues.keyword
        : "",
      regions: removeRegion ? "" : regions ? regions.toString() : [],
      species: removeSpecies ? "" : species ? species.toString() : [],
    };
    props.getOrganizationListing(params, (res) => {
      if (res && res.status === 200) {
        ref && ref.current && ref.current.complete();
        setLoadingOrganization(false);
        if (!isModalOpen) {
          toggleFilterModal();
        }
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingOrganization(false);
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


  const addOrganizationHandler = (e) => {
    if (validateHandler()) {
      if (
        selectOrganization?.newImage &&
        selectOrganization?.newBannerImage &&
        selectOrganization?.newDetailImage &&
        selectedImage &&
        selectedBannerImage &&
        selectedDetailTabImage
      ) {
        const value = { ...selectOrganization };
        const lValue = { ...selectOrganizationLocation };
        const socialMediaLink = { ...selectSocialMedia };
        setError({});
        e.preventDefault();
        ref && ref.current && ref.current.continuousStart();
        setLoadingOrganization(true);

        const file1 = selectedImage;
        const file2 = selectedBannerImage;
        const file3 = selectedDetailTabImage;
        const fSize1 = Math.round(file1?.size / 1048576);
        const fSize2 = Math.round(file2?.size / 1048576);
        const fSize3 = Math.round(file3?.size / 1048576);
        const fType1 = file1?.type;
        const fType2 = file2?.type;
        const fType3 = file3?.type;
        const ext1 = file1?.name.split(".").pop();
        const ext2 = file2?.name.split(".").pop();
        const ext3 = file3?.name.split(".").pop();
        if (fSize1 > 25 || fSize2 > 25 || fSize3 > 25) {
          toast(
            <AlertError message="Size exceeds maximum allowable size. Maximum allowable size is 25MB." />
          );
          return setLoadingOrganization(false);
        } else if (
          !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            fType1
          ) ||
          !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            fType2
          ) ||
          !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            fType3
          )
        ) {
          return (
            toast(
              <AlertError message="Image is not of correct format and hence cannot be uploaded. Valid image formats are jpg, jpeg, png and webp." />
            ),
            setLoadingOrganization(false)
          );
        } else {
          const fileName1 = uuidv4() + "." + ext1;
          const fileName2 = uuidv4() + "." + ext2;
          const fileName3 = uuidv4() + "." + ext3;

          const img = [];
          img.push(
            Storage.put(fileName1, file1, {
              completeCallback: (event) => {},
              progressCallback: (progress) => {},
              errorCallback: (err) => {
                return (
                  setLoadingOrganization(false),
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
                  setLoadingOrganization(false),
                  toast(<AlertError message={"Something Went Wrong"} />)
                );
              },
            })
          );

          img.push(
            Storage.put(fileName3, file3, {
              completeCallback: (event) => {},
              progressCallback: (progress) => {},
              errorCallback: (err) => {
                return (
                  setLoadingOrganization(false),
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
              bannerImage: `public/${result && result[1].key}`,
              detailTabImage: `public/${result && result[2].key}`,
              name: value.name ? value.name : "",
              yearsOfWorking: value.yearsOfWorking ? value.yearsOfWorking : "",
              animalLivesSaved: value.animalLivesSaved
                ? value.animalLivesSaved
                : "",
              areaOfHabitatCovered: value.areaOfHabitatCovered
                ? value.areaOfHabitatCovered
                : "",
              amountInvested: value.amountInvested ? value.amountInvested : "",
              animalReceivingCare: value.animalReceivingCare
                ? value.animalReceivingCare
                : "",
              helpingHands: value.helpingHands ? value.helpingHands : "",
              socialMediaLink: socialMediaLink ? socialMediaLink : "",
              websiteUrl: value.websiteUrl ? value.websiteUrl : "",
              donationUrl: value.donationUrl ? value.donationUrl : "",
              country: lValue.country ? lValue.country : "",
              state: lValue.stateName ? lValue.stateName : "",
              city: lValue.cityName ? lValue.cityName : "",
              isAddedToDonation: value?.isAddedToDonation
                ? value?.isAddedToDonation
                : false,
              address: value.address ? value.address : "",
              zipCode: value.zipCode ? value.zipCode : "",
              species:
                value.species && value.species.length > 0
                  ? value.species.map((item) => item._id)
                  : [],
              regions:
                value.regions && value.regions.length > 0
                  ? value.regions.map((item) => item._id)
                  : [],
              description: editorData ? editorData : "",
            };
            props.addOrganizationData(payload, (res) => {
              if (res.status === 200) {
                const params = {
                  isActive: true,
                  isAddedToDonation: value?.isAddedToDonation
                    ? value?.isAddedToDonation
                    : false,
                  page: 1,
                  sort,
                  order,
                  keyword: "",
                  regions: "",
                  species: "",
                };
                props.getOrganizationListing(params, (res) => {
                  ref && ref.current && ref.current.complete();
                  if (res.status === 200) {
                    setSelectedImage(null);
                    setSelectOrganization("");
                    setSelectSocialMedia("");
                    setLoadingOrganization(false);
                    toggleAddOrganization();
                    setTotalCountPages(res.data.totalCount);
                    setSelectOrganizationLocation("");
                    setIsCheck(false);
                    setSelectedDetailTabImage(null);
                    setSelectedBannerImage(null);
                    toast(<AlertSuccess message="Information Saved" />);
                  } else {
                    ref && ref.current && ref.current.complete();
                    setLoadingOrganization(false);
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
                setLoadingOrganization(false);
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
      selectOrganization?.newImage ||
      selectOrganization?.newBannerImage ||
      selectOrganization?.newDetailImage ||
      selectedImage ||
      selectedBannerImage ||
      selectedDetailTabImage
    ) {
      const value = { ...selectOrganization };
      const lValue = { ...selectOrganizationLocation };
      const socialMediaLink = { ...selectSocialMedia };
      if (validateHandler()) {
        setError({});
        e.preventDefault();
        ref && ref.current && ref.current.continuousStart();
        setLoadingOrganization(true);
        const file1 = selectedImage || {};
        const file2 = selectedBannerImage || {};
        const file3 = selectedDetailTabImage || {};
        const fSize1 = file1.size ? Math.round(file1.size / 1048576) : {};
        const fSize2 = file2.size ? Math.round(file2.size / 1048576) : {};
        const fSize3 = file3.size ? Math.round(file3?.size / 1048576) : {};
        const fType1 = file1.type ? file1.type : "image/jpg";
        const fType2 = file2.type ? file2.type : "image/jpg";
        const fType3 = file3.type ? file3.type : "image/jpg";
        const ext1 = file1 && file1.name ? file1.name.split(".").pop() : "";
        const ext2 = file2 && file2.name ? file2.name.split(".").pop() : "";
        const ext3 = file3 && file3.name ? file3.name.split(".").pop() : "";
        if (fSize1 > 25 || fSize2 > 25 || fSize3 > 25) {
          toast(
            <AlertError message="Size exceeds maximum allowable size. Maximum allowable size is 25MB." />
          );
          return setLoadingOrganization(false);
        } else if (
          !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            fType1
          ) ||
          !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            fType2
          ) ||
          !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            fType3
          )
        ) {
          return (
            toast(
              <AlertError message="Image is not of correct format and hence cannot be uploaded. Valid image formats are jpg, jpeg, png and webp." />
            ),
            setLoadingOrganization(false)
          );
        } else {
          const fileName1 = uuidv4() + "." + ext1;
          const fileName2 = uuidv4() + "." + ext2;
          const fileName3 = uuidv4() + "." + ext3;

          const img = [];

          if (selectedImage) {
            img.push(
              Storage.put(fileName1, file1, {
                completeCallback: (event) => {},
                progressCallback: (progress) => {},
                errorCallback: (err) => {
                  return (
                    setLoadingOrganization(false),
                    toast(<AlertError message={"Something Went Wrong"} />)
                  );
                },
              })
            );
          }
          if (selectedBannerImage) {
            img.push(
              Storage.put(fileName2, file2, {
                completeCallback: (event) => {},
                progressCallback: (progress) => {},
                errorCallback: (err) => {
                  return (
                    setLoadingOrganization(false),
                    toast(<AlertError message={"Something Went Wrong"} />)
                  );
                },
              })
            );
          }

          if (selectedDetailTabImage) {
            img.push(
              Storage.put(fileName3, file3, {
                completeCallback: (event) => {},
                progressCallback: (progress) => {},
                errorCallback: (err) => {
                  return (
                    setLoadingOrganization(false),
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
              bannerImage:
                value?.newBannerImage === true
                  ? `public/${result && result[1].key}`
                  : value?.bannerImage,
              detailTabImage:
                value?.newDetailImage === true
                  ? `public/${result && result[2].key}`
                  : value?.detailTabImage,
              name: value.name ? value.name : "",
              yearsOfWorking: value.yearsOfWorking ? value.yearsOfWorking : "",
              animalLivesSaved: value.animalLivesSaved
                ? value.animalLivesSaved
                : "",
              areaOfHabitatCovered: value.areaOfHabitatCovered
                ? value.areaOfHabitatCovered
                : "",
              amountInvested: value.amountInvested ? value.amountInvested : "",
              animalReceivingCare: value.animalReceivingCare
                ? value.animalReceivingCare
                : "",
              helpingHands: value.helpingHands ? value.helpingHands : "",

              websiteUrl: value.websiteUrl ? value.websiteUrl : "",
              donationUrl: value.donationUrl ? value.donationUrl : "",
              address: value.address ? value.address : "",
              zipCode: value.zipCode ? value.zipCode : "",
              country: lValue.country ? lValue.country : "",
              state: lValue.stateName ? lValue.stateName : "",
              city: lValue.cityName ? lValue.cityName : "",
              isAddedToDonation: value?.isAddedToDonation
                ? value?.isAddedToDonation
                : false,

              species:
                value.species && value.species.length > 0
                  ? value.species.map((item) => item._id)
                  : [],
              regions:
                value.regions && value.regions.length > 0
                  ? value.regions.map((item) => item._id)
                  : [],
              description: editorData ? editorData : "",
              socialMediaLink: socialMediaLink ? socialMediaLink : "",
            };

            props.updateOrganization(value._id, payload, (res) => {
              if (res.status === 200) {
                const param = {
                  isActive: true,
                  isAddedToDonation: value?.isAddedToDonation
                    ? value?.isAddedToDonation
                    : false,
                  page: 1,
                  sort,
                  order,
                  keyword: "",
                  regions: "",
                  species: "",
                };
                props.getOrganizationListing(param, (res) => {
                  ref && ref.current && ref.current.complete();
                  if (res.status === 200) {
                    setSelectedImage(null);
                    setSelectOrganization("");
                    setSelectSocialMedia("");
                    setLoadingOrganization(false);
                    toggleEditOrganization();
                    setSelectedDetailTabImage(null);
                    setSelectedBannerImage(null);
                    setIsCheck(false);

                    toast(<AlertSuccess message="Information Saved" />);
                  } else {
                    ref && ref.current && ref.current.complete();
                    setLoadingOrganization(false);
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
                setLoadingOrganization(false);
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
      setLoadingOrganization(true);
      const value = { ...selectOrganization };
      const lValue = { ...selectOrganizationLocation };
      const socialMediaLink = { ...selectSocialMedia };
      const Image =
        value.coverImage && value.coverImage.original
          ? value.coverImage.original
          : "";
      const payload = {
        isActive: true,
        name: value.name ? value.name : "",
        yearsOfWorking: value.yearsOfWorking ? value.yearsOfWorking : "",
        animalLivesSaved: value.animalLivesSaved ? value.animalLivesSaved : "",
        areaOfHabitatCovered: value.areaOfHabitatCovered
          ? value.areaOfHabitatCovered
          : "",
        amountInvested: value.amountInvested ? value.amountInvested : "",
        animalReceivingCare: value.animalReceivingCare
          ? value.animalReceivingCare
          : "",
        helpingHands: value.helpingHands ? value.helpingHands : "",

        websiteUrl: value.websiteUrl ? value.websiteUrl : "",
        donationUrl: value.donationUrl ? value.donationUrl : "",
        address: value.address ? value.address : "",
        zipCode: value.zipCode ? value.zipCode : "",
        country: lValue.country ? lValue.country : "",
        state: lValue.stateName ? lValue.stateName : "",
        city: lValue.cityName ? lValue.cityName : "",
        isAddedToDonation: value?.isAddedToDonation
          ? value?.isAddedToDonation
          : false,
        species:
          value.species && value.species.length > 0
            ? value.species.map((item) => item._id)
            : [],
        regions:
          value.regions && value.regions.length > 0
            ? value.regions.map((item) => item._id)
            : [],
        coverImage: value.coverImage,
        bannerImage: value.bannerImage,
        detailTabImage: value.detailTabImage,
        description: editorData ? editorData : "",
        socialMediaLink: socialMediaLink ? socialMediaLink : "",
      };
      props.updateOrganization(value._id, payload, (res) => {
        if (res.status === 200) {
          const param = {
            isActive: true,
            isAddedToDonation: value?.isAddedToDonation
              ? value?.isAddedToDonation
              : false,
            page: 1,
            sort,
            order,
            keyword: "",
            regions: "",
            species: "",
          };
          props.getOrganizationListing(param, (res) => {
            ref && ref.current && ref.current.complete();
            if (res.status === 200) {
              setSelectOrganization("");
              setSelectSocialMedia("");
              setSelectedImage(null);
              setLoadingOrganization(false);
              toggleEditOrganization();
              setIsCheck(false);
              setSelectedDetailTabImage(null);
              setSelectedBannerImage(null);
              ref && ref.current && ref.current.complete();
              toast(<AlertSuccess message="Information Saved" />);
            } else {
              ref && ref.current && ref.current.complete();
              setLoadingOrganization(false);
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
          setLoadingOrganization(false);
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
    setLoadingOrganization(true);
    ref && ref.current && ref.current.continuousStart();
    const id = organizationId;
    props.deleteOrganizationData(id, (res) => {
      if (res && res.status === 200) {
        const params = {
          isActive: true,
          isAddedToDonation: false,
          page: 1,
          sort,
          order,
          keyword: "",
          regions: "",
          species: "",
        };
        props.getOrganizationListing(params, (res) => {
          if (res && res.status === 200) {
            setTotalCountPages(res.data.totalCount);
            ref && ref.current && ref.current.complete();
            setLoadingOrganization(false);
            toggleDeleteOrganization();
            toast(<AlertSuccess message={"Record deleted"} />);
          }
        });
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingOrganization(false);
        toggleDeleteOrganization();
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
        <Sidebar page={"Organization"} />
        <div className="main-container">
          {/* <!--============================== Filter Container Start ==============================--> */}
          <div className="filter-container d-flex align-items-center sticky-top">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center flex-wrap justify-content-between">
                  <div className="filter-title fw-medium text-capitalize">
                    All Organizations
                  </div>
                  <div className="filter-widget-right d-flex align-items-center flex-wrap">
                    <div className="fw-item">
                      {loadingOrganization ? (
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
                    {loadingOrganization ? (
                      <div style={{ width: "10rem", paddingLeft: "15px" }}>
                        <Skeleton height="30px" width="50px" />
                      </div>
                    ) : (
                      <div className="fw-item">
                        <a
                          className="btn btn-default"
                          onClick={() => toggleAddOrganization()}
                        >
                          <img src={addIcon} alt="" />
                          Add an Organization
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
                      {!loadingOrganization &&
                      ((selectedFilter && selectedFilter.keyword) ||
                        (selectedFilter && selectedFilter.regions) ||
                        (selectedFilter && selectedFilter.species) ||
                        (selectedFilter.keyword &&
                          selectedFilter.regions &&
                          selectedFilter.regions.length &&
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
                                    handleFilter(true, true, false, false);
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
                                    handleFilter(true, false, true, false);
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
                                    handleFilter(true, false, false, true);
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
                        {!loadingOrganization ? (
                          `Showing ${organizationItems.length} of ${totalCountPages} total results`
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
                              Organization Name
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
                        {loadingOrganization
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
                          : organizationItems &&
                            organizationItems.length > 0 &&
                            organizationItems.map((item, index) => {
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
                                                      setEditorData(
                                                        item?.description
                                                      );
                                                      setIsCheck(
                                                        item?.isAddedToDonation
                                                      );
                                                      toggleEditOrganization();
                                                      setSelectOrganization(
                                                        item
                                                      );
                                                      setSelectSocialMedia(
                                                        item?.socialMediaLink
                                                      );
                                                      setSelectOrganizationLocation(
                                                        item?.headQuarter
                                                      );
                                                      setSelectedImage([
                                                        {
                                                          name: smallImg,
                                                          type: "image/jpg",
                                                        },
                                                      ]);
                                                      setSelectedDetailTabImage(
                                                        [
                                                          {
                                                            name: smallImg,
                                                            type: "image/jpg",
                                                          },
                                                        ]
                                                      );
                                                      setSelectedBannerImage([
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
                                                      toggleDeleteOrganization(
                                                        item
                                                      );
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
                                            {item?.name}
                                          </td>

                                          <td style={{ width: "12%" }}>
                                            <div class="td-img-group d-flex align-items-center">
                                              {regions &&
                                              regions.length &&
                                              regions[0] &&
                                              regions[0]?.country === "US"
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
                                                        {regions &&
                                                        regions.length >= 2
                                                          ? `+ ${
                                                              regions.length - 1
                                                            }`
                                                          : ""}
                                                      </u>
                                                    </a>
                                                  </Dropdown.Toggle>

                                                  <Dropdown.Menu bsPrefix="dropdown-menu dropdown-menu-end">
                                                    <Dropdown.Item>
                                                      {regions &&
                                                        regions.length &&
                                                        regions.map((item) => {
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

          <AddOrganizationModal
            show={showOrganization}
            onHide={toggleAddOrganization}
            loading={loadingOrganization}
            regionsDropdownData={regionsDropdownData}
            speciesDropdownData={speciesDropdownData}
            selectOrganization={selectOrganization}
            setSelectOrganization={setSelectOrganization}
            setSelectSocialMedia={setSelectSocialMedia}
            selectSocialMedia={selectSocialMedia}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            error={error}
            handleSubmit={addOrganizationHandler}
            countriesDropdownData={countriesDropdownData}
            usStateDropdownData={usStateDropdownData}
            setLoadingOrganization={setLoadingOrganization}
            selectOrganizationLocation={selectOrganizationLocation}
            setSelectOrganizationLocation={setSelectOrganizationLocation}
            isCheck={isCheck}
            setIsCheck={setIsCheck}
            selectedDetailTabImage={selectedDetailTabImage}
            setSelectedDetailTabImage={setSelectedDetailTabImage}
            selectedBannerImage={selectedBannerImage}
            setSelectedBannerImage={setSelectedBannerImage}
            editorLoaded={editorLoaded}
            setEditorLoaded={setEditorLoaded}
            editorData={editorData}
            setEditorData={setEditorData}
          />
          <OrganizationFilterModal
            show={showOrganizationFilter}
            onHide={toggleFilterModal}
            loading={loadingOrganization}
            regionsDropdownData={regionsDropdownData}
            speciesDropdownData={speciesDropdownData}
            setFilterState={setFilterState}
            filterState={filterState}
            handleFilter={handleFilter}
          />
          <OrganizationEdit
            isCheck={isCheck}
            setIsCheck={setIsCheck}
            show={editOrganization}
            onHide={toggleEditOrganization}
            loading={loadingOrganization}
            regionsDropdownData={regionsDropdownData}
            speciesDropdownData={speciesDropdownData}
            selectOrganization={selectOrganization}
            setSelectOrganization={setSelectOrganization}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            error={error}
            handleSubmit={editHandler}
            countriesDropdownData={countriesDropdownData}
            usStateDropdownData={usStateDropdownData}
            setLoadingOrganization={setLoadingOrganization}
            selectOrganizationLocation={selectOrganizationLocation}
            setSelectOrganizationLocation={setSelectOrganizationLocation}
            selectedDetailTabImage={selectedDetailTabImage}
            setSelectedDetailTabImage={setSelectedDetailTabImage}
            selectedBannerImage={selectedBannerImage}
            setSelectedBannerImage={setSelectedBannerImage}
            editorLoaded={editorLoaded}
            setEditorLoaded={setEditorLoaded}
            editorData={editorData}
            setEditorData={setEditorData}
            setSelectSocialMedia={setSelectSocialMedia}
            selectSocialMedia={selectSocialMedia}
          />

          <DeleteModal
            show={deleteOrganization}
            onHide={toggleDeleteOrganization}
            loadingDelete={loadingOrganization}
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
  getSpeciesDropdown: (callBack) => dispatch(getSpeciesDropdown(callBack)),
  getOrganizationListing: (param, callBack) =>
    dispatch(getOrganizationListing(param, callBack)),
  addOrganizationData: (data, callback) =>
    dispatch(addOrganizationData(data, callback)),
  updateOrganization: (params, data, callback) =>
    dispatch(updateOrganization(params, data, callback)),
  deleteOrganizationData: (params, callback) =>
    dispatch(deleteOrganizationData(params, callback)),
  getCountriesDropdown: (callBack) => dispatch(getCountriesDropdown(callBack)),
  getUsStateDropdown: (param, callBack) =>
    dispatch(getUsStateDropdown(param, callBack)),
});

const mapStateToProps = (state) => ({
  getOrganization: getOrganization(state),
  getapisForDropdown: getapisForDropdown(state),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ListingOrganizations));
