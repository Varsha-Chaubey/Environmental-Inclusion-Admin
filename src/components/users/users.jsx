import React, { useEffect, useState, useRef } from "react";
import addIcon from "../../include/images/plus-icon.svg";
import dotIcon from "../../include/images/more-icon.svg";
import closeIcon from "../../include/images/close.svg";
import { connect } from "react-redux";
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
import DeleteModal from "../../layouts/modal/delete/deleteModal";
import Pagination from "../common/pagination";
import _ from "lodash";
import { addUser, deleteUser, editUser, getUsers, resetPassword, userListings } from "../../store/users";
import AddUser from "../../layouts/modal/users/addUser";
import Joi from "joi";
import { validateErrorMessage } from "../../common/validation/validationMessages";
import ResetPassword from "../../layouts/modal/users/resetPassword";
import FilterUser from "../../layouts/modal/users/filterUser";

const ListingRegions = (props) => {
  var ref = useRef(null);
  const [loadingMain, setLoadingMain] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedRole, setSelectedRole] = useState({ name: "Super Admin", value: 0 });
  const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [pwd, setPwd] = useState({ password: "", password1: "" });
  const [error, setError] = useState({});
  const [loadingUser, setLoadingUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pageType, setPageType] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isActive, setIsActive] = useState({ name: "Yes", value: true });
  const [showResetPwd, setShowResetPwd] = useState(false);
  const [loadingPwd, setLoadingPwd] = useState(false);
  const [search, setSearch] = useState({ name: "", value: "" });
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("firstName");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [filteredValues, setFilteredValues] = useState({ name: "", value: "" });

  useEffect(() => {
    if (loadingUser || loadingPwd || loadingDelete) {
      setLoadingMain(true);
    } else {
      setLoadingMain(false);
    }
  }, [loadingPwd, loadingDelete, loadingUser]);

  const toggleFilter = () => {
    if (showFilter) {
      setFilteredValues({ name: "", value: "" });
    }
    setShowFilter(!showFilter);
  };

  const toggleResetPwd = () => {
    setError({});
    if (showResetPwd) {
      setPwd({ password: "", password1: "" });
    }
    setShowResetPwd(!showResetPwd);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const pwdSchema = Joi.object({
    password: Joi.string()
      .label("Password")
      .min(8)
      .required()
      .error((errors) => validateErrorMessage(errors)),
    password1: Joi.string()
      .min(8)
      .label("New Password")
      .required()
      .error((errors) => validateErrorMessage(errors)),
  });

  const editSchema = Joi.object({
    firstName: Joi.string()
      .label("First Name")
      .required()
      .trim()
      .error((errors) => validateErrorMessage(errors)),
    lastName: Joi.string()
      .label("Last Name")
      .required()
      .trim()
      .error((errors) => validateErrorMessage(errors)),
    email: Joi.string()
      .label("Email")
      .allow("")
      .trim()
      .error((errors) => validateErrorMessage(errors)),
    password: Joi.string()
      .label("Password")
      .allow("")
      .trim()
      .error((errors) => validateErrorMessage(errors)),
  });

  const schema = Joi.object({
    firstName: Joi.string()
      .label("First Name")
      .required()
      .trim()
      .error((errors) => validateErrorMessage(errors)),
    lastName: Joi.string()
      .label("Last Name")
      .required()
      .trim()
      .error((errors) => validateErrorMessage(errors)),
    email: Joi.string()
      .label("Email")
      .required()
      .trim()
      .error((errors) => validateErrorMessage(errors)),
    password: Joi.string()
      .label("Password")
      .required()
      .trim()
      .error((errors) => validateErrorMessage(errors)),
  });

  const validate = (schemaType, data) => {
    const error = schemaType.validate(data, { abortEarly: false });
    if (error.error && error.error.details) {
      const errors = {};
      error.error.details.forEach((element) => {
        errors[element.context.key] = element.message;
      });
      //   this.setState({ errors });
      setError(errors);
      return false;
    }
    setError("");
    return true;
  };

  const roleType = (role) => {
    if (role == 0) {
      setSelectedRole({ name: "Super Admin", value: 0 });
    }
    if (role == 1) {
      setSelectedRole({ name: "Admin", value: 1 });
    }
    if (role == 2) {
      setSelectedRole({ name: "Content Writer", value: 2 });
    }
  };

  const toggleAddUser = () => {
    setError({});
    if (showAddUser) {
      setPageType("");
      setUserData({ firstName: "", lastName: "", email: "", password: "" });
    }
    setShowAddUser(!showAddUser);
  };

  useEffect(() => {
    if (showAddUser && pageType == "Edit") {
      const data = { ...userData };
      data.firstName = selectedUser.firstName;
      data.lastName = selectedUser.lastName;
      setUserData(data);
      roleType(selectedUser.role);
    }
  }, [showAddUser]);

  useEffect(() => {
    setLoadingUser(false);
    const payload = {
      order,
      sort,
      page: 1,
    };
    if (search && search.value) {
      payload.keyword = search.value;
    }
    props.getUsers(payload, (res) => {
      if (res && res.status == 200) {
      }
    });
  }, [order, sort]);

  useEffect(() => {
    setLoadingUser(false);
    const payload = {
      order,
      sort,
      page,
    };
    if (search && search.value) {
      payload.keyword = search.value;
    }
    props.getUsers(payload, (res) => {
      if (res && res.status == 200) {
      }
    });
  }, [page]);

  const usersData = (props.getUserLists && props.getUserLists.users && props.getUserLists.users.data) || [];

  const roleOptions = [
    { name: "SUPER ADMIN", value: 0 },
    { name: "ADMIN", value: 1 },
    { name: "CONTENT WRITER", value: 2 },
  ];

  const activeOptions = [
    { name: "Yes", value: true },
    { name: "No", value: false },
  ];

  //Add User

  const addHandler = () => {
    if (validate(schema, userData)) {
      setLoadingUser(true);
      ref && ref.current && ref.current.continuousStart();
      const data = { ...userData };
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: selectedRole.value,
      };
      props.addUser(payload, (res) => {
        if (res && res.status == 200) {
          props.getUsers({}, (res1) => {
            if (res1 && res1.status == 200) {
              setLoadingUser(false);
              ref && ref.current && ref.current.complete();
              setUserData({ firstName: "", lastName: "", email: "", password: "" });
              toggleAddUser();
              toast(<AlertSuccess message={"User Added Successfully"} />);
            }
          });
        } else {
          setLoadingUser(false);
          ref && ref.current && ref.current.complete();
          toast(
            <AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />,
          );
        }
      });
    }
  };

  //Edit User

  const editHandler = () => {
    if (validate(editSchema, userData)) {
      setLoadingUser(true);
      ref && ref.current && ref.current.continuousStart();
      const id = selectedUser._id;
      const payload = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        isActive: isActive.value,
        role: selectedRole.value,
      };
      props.editUser(id, payload, (res) => {
        if (res && res.status == 200) {
          props.getUsers({}, (res1) => {
            if (res1 && res1.status == 200) {
              setLoadingUser(false);
              ref && ref.current && ref.current.complete();

              toggleAddUser();
              toast(<AlertSuccess message="Information Updated" />);
            }
          });
        } else {
          setLoadingUser(false);
          ref && ref.current && ref.current.complete();
          toast(
            <AlertError messgae={res && res.data && res.data.message ? res.data.message : "Something went wrong"} />,
          );
        }
      });
    }
  };

  //Change Password

  const pwdHandler = () => {
    if (validate(pwdSchema, pwd)) {
      ref && ref.current && ref.current.continuousStart();
      setLoadingPwd(true);
      const payload = {
        password: pwd.password,
        newPassword: pwd.password1,
      };
      props.resetPassword(payload, (res) => {
        if (res && res.status == 200) {
          ref && ref.current && ref.current.complete();
          setLoadingPwd(false);
          setPwd({ password: "", password1: "" });
          toggleResetPwd();
          toast(<AlertSuccess message={"Password Changed Successfully"} />);
        } else {
          ref && ref.current && ref.current.complete();
          setLoadingPwd(false);
          toast(
            <AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />,
          );
        }
      });
    }
  };

  //Delete User

  const deleteHandler = () => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingDelete(true);
    const id = selectedUser._id;
    props.deleteUser(id, (res) => {
      if (res && res.status == 200) {
        props.getUsers({}, (res1) => {
          if (res1 && res1.status == 200) {
            setLoadingDelete(false);
            ref && ref.current && ref.current.complete();
            toggleDeleteModal();
            toast(<AlertSuccess message="User Deleted Successfully" />);
          }
        });
      } else {
        setLoadingDelete(false);
        ref && ref.current && ref.current.complete();
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went wrong"} />);
      }
    });
  };

  //Filter handler

  const filterHandler = (value = false) => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingUser(true);

    const payload = { page: 1, sort, order };
    if (search && search.value && !value) {
      payload.keyword = search.value;
    }
    props.getUsers(payload, (res) => {
      if (res && res.status == 200) {
        setLoadingUser(false);
        ref && ref.current && ref.current.complete();

        if (!value) {
          toggleFilter();
          const a = { ...search };
          setFilteredValues(a);
        }
      } else {
        setLoadingUser(false);
        ref && ref.current && ref.current.complete();
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went wrong"} />);
      }
    });
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const totalPages = userData ? Math.ceil(usersData?.length / 20) : 0;
  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(i);
  }


  return (
    <div>
      <LoadingBar height={5} color="#47AD1D" ref={ref} />
      <Header />
      <div className="dashboard-insider position-relative d-lg-flex w-100 ">
        <Sidebar page={"Users"} />
        <div className="main-container">
          {/* <!--============================== Filter Container Start ==============================--> */}
          <div className="filter-container d-flex align-items-center sticky-top">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center flex-wrap justify-content-between">
                  <div className="filter-title fw-medium text-capitalize">All Users</div>
                  <div className="filter-widget-right d-flex align-items-center flex-wrap">
                    <div className="fw-item">
                      {loadingMain ? (
                        <Skeleton width="50px" height="30px" />
                      ) : (
                        <div
                          className="filter-row d-flex align-items-center"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRight"
                          aria-controls="offcanvasRight"
                          onClick={() => toggleFilter()}
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
                    {loadingMain ? (
                      <div style={{ width: "10rem", paddingLeft: "15px" }}>
                        <Skeleton height="30px" width="50px" />
                      </div>
                    ) : (
                      <div className="fw-item">
                        <a
                          className="btn btn-default"
                          onClick={() => {
                            setPageType("Add");
                            toggleAddUser();
                          }}
                        >
                          <img src={addIcon} alt="" />
                          Add User
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
                      {filteredValues?.value ? (
                        <>
                          <div className="filter-tag-title">Filters Applied :</div>
                          <div className="tags">
                            {filteredValues?.value ? (
                              <span className="badge">
                                Keyword : <span>{search?.value}</span>
                                <img
                                  className="tag-close-icon"
                                  src={closeIcon}
                                  alt=""
                                  onClick={() => {
                                    const data = { ...search };
                                    const data1 = { ...filteredValues };
                                    data.value = "";
                                    data.name = "";
                                    data1.value = "";
                                    data1.name = "";
                                    setFilteredValues(data1);
                                    setSearch(data);
                                    filterHandler(true);
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
                        {!loadingMain && usersData?.length ? (
                          `Showing ${
                            usersData && usersData.length
                              ? usersData.length < 20
                                ? usersData.length
                                : 20 * page + usersData.length
                              : 0
                          } of ${usersData.length} total results`
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
                              Name
                              <div
                                className={
                                  order === "asc" && sort === "firstName" ? "ascending-icon active" : "ascending-icon"
                                }
                                onClick={() => {
                                  setOrder("asc");
                                  setSort("firstName");
                                }}
                              ></div>
                              <div
                                className={
                                  order === "desc" && sort === "firstName"
                                    ? "descending-icon active"
                                    : "descending-icon"
                                }
                                onClick={() => {
                                  setOrder("desc");
                                  setSort("firstName");
                                }}
                              ></div>
                            </a>
                          </th>

                          <th style={{ width: "25%" }}>
                            <a href="#!" className="sort-by">
                              Email
                            </a>
                          </th>
                          <th style={{ width: "15%" }}>
                            <a href="#!" className="sort-by">
                              Role
                            </a>
                          </th>
                          <th style={{ width: "10%" }}>
                            <a href="#!" className="sort-by">
                              Active
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
                        {loadingMain
                          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4].map((item) => (
                              <tr>
                                <td colspan="8">
                                  <table class="table2">
                                    <tr>
                                      <td style={{ width: "9.9%" }}>
                                        <Skeleton />
                                      </td>
                                      <td style={{ width: "18%" }}>
                                        <Skeleton />
                                      </td>
                                      <td style={{ width: "25%" }} className="word-break">
                                        <Skeleton />
                                      </td>
                                      <td style={{ width: "15%" }} className="word-break">
                                        <Skeleton />
                                      </td>
                                      <td style={{ width: "10%" }}>
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
                          : usersData &&
                            usersData.length > 0 &&
                            usersData.map((item, index) => {
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
                                                      setPageType("Edit");
                                                      setSelectedUser(item);
                                                      toggleAddUser();
                                                    }}
                                                  >
                                                    Edit
                                                  </Dropdown.Item>
                                                  <Dropdown.Item
                                                    onClick={() => {
                                                      setSelectedUser(item);
                                                      toggleResetPwd();
                                                    }}
                                                  >
                                                    Reset Password
                                                  </Dropdown.Item>
                                                  <Dropdown.Item
                                                    onClick={() => {
                                                      setSelectedUser(item);
                                                      toggleDeleteModal();
                                                    }}
                                                  >
                                                    Delete
                                                  </Dropdown.Item>
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>
                                          </td>
                                          <td style={{ width: "18%" }}>
                                            <div className="td-text-box">
                                              {item.firstName ? item.firstName : ""}{" "}
                                              {item.lastName ? item.lastName : ""}
                                            </div>
                                          </td>

                                          <td style={{ width: "25%" }}>
                                            <div className="td-text-box">{item.email ? item.email : "N/A"}</div>
                                          </td>
                                          <td style={{ width: "15%" }}>
                                            {item.role == 0
                                              ? "Super Admin"
                                              : item.role == 1
                                              ? "Admin"
                                              : item.role == 2 && "Content Writer"}
                                          </td>
                                          <td style={{ width: "10%" }}>{item.isActive ? "Yes" : "No"}</td>
                                          <td style={{ width: "18%" }}>
                                            <div className="td-text-box">
                                              {item.createdAt ? moment(item.createdAt).format("MM/DD/YYYY") : "N/A"}
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
                      currentPage={page}
                      setCurrentPage={setPage}
                      pageLinks={pageLinks}
                      totalPages={totalPages}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddUser
        show={showAddUser}
        onHide={toggleAddUser}
        roleOptions={roleOptions}
        userData={userData}
        setUserData={setUserData}
        addHandler={addHandler}
        error={error}
        setError={setError}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        page={pageType}
        isActive={isActive}
        setIsActive={setIsActive}
        activeOptions={activeOptions}
        editHandler={editHandler}
        loadingUser={loadingUser}
      />
      <DeleteModal
        show={showDeleteModal}
        onHide={toggleDeleteModal}
        loadingDelete={loadingDelete}
        deleteHandler={deleteHandler}
      />
      <ResetPassword
        pwd={pwd}
        setPwd={setPwd}
        show={showResetPwd}
        onHide={toggleResetPwd}
        loading={loadingPwd}
        error={error}
        pwdHandler={pwdHandler}
      />
      <FilterUser
        search={search}
        setSearch={setSearch}
        show={showFilter}
        onHide={setShowFilter}
        filterHandler={filterHandler}
        loading={loadingUser}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  //new apis
  getUsers: (params, callback) => dispatch(getUsers(params, callback)),
  addUser: (data, callback) => dispatch(addUser(data, callback)),
  deleteUser: (id, callback) => dispatch(deleteUser(id, callback)),
  editUser: (id, data, callback) => dispatch(editUser(id, data, callback)),
  resetPassword: (data, callback) => dispatch(resetPassword(data, callback)),
});

const mapStateToProps = (state) => ({
  getUserLists: userListings(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ListingRegions));
