import React from "react";
import logo from "../../include/images/logo.svg";
import searchImg from "../../include/images/search.svg";
import notificationBell from "../../include/images/bell.svg";
import adminImg from "../../include/images/pannel-admin-icon.svg";
import { Dropdown } from "react-bootstrap";
import { getProfile, clearAllToken } from "../../utils/localStorageServices";
const Header = () => {
  const member = getProfile();
  
  return (
    <div>
      <header id="header">
        <nav class="navbar navbar-expand-sm">
          <div class="container-fluid">
            <div class="nav-inside d-flex align-items-center justify-content-between">
              <a class="navbar-brand" href="#!">
                <img src={logo} alt="jj" />
              </a>
              {/* <div class="collapse navbar-collapse justify-content-end" id="mainNav">
                                <div class="navbar-inside w-100 d-flex align-items-center justify-content-end">
                                    <div class="header-search-box position-relative">
                                        <input class="w-100" type="search" placeholder="Search" />
                                        <img class="search__icon" src={searchImg} alt="search" />
                                    </div>
                                </div>
                            </div> */}
              <div class="header-right d-flex flex-wrap align-items-center">
                <div class="header-icon-item">
                  {/* <div class="header-notify-box w-100 h-100 position-relative">
                                        <span class="notify-count">12</span>
                                        <img src={notificationBell} alt="" />
                                    </div> */}
                </div>

                <div class="header-menu-icon fw-medium dropdown">
                  {/* <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={adminImg} alt="" />
                                    </button> */}
                  <Dropdown bsPrefix="header-name-box fw-medium dropdown cursor-pointer">
                    <Dropdown.Toggle as="span" id="dropdown-basic" className="dropdown-toggle" style={{textTransform:'capitalize'}}>
                      {" "}
                      Welcome, {member && member.profile && member.profile.firstName} {""} {member && member.profile && member.profile.lastName} !
                    </Dropdown.Toggle>

                    <Dropdown.Menu bsPrefix="dropdown-menu dropdown-menu-end">
                      <Dropdown.Item
                        href="/signin"
                        onClick={() => {
                          clearAllToken();
                        }}
                      >
                        Sign Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
