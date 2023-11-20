import React, { useEffect, useRef, useState } from "react";
import menuIcon from "../../include/images/menu-icon.svg";
import { getProfile } from "../../utils/localStorageServices";
import { Accordion, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const showRef = useRef();
  const settingRef = useRef();
  const blogRef = useRef();
  const newsRef = useRef();
  const scienceRef = useRef();
  const organizationRef = useRef();

  const [showMenu, setShowMenu] = useState(false);
  const [activeKeys, setActiveKeys] = useState(["0"]);
  const [showEndangeredAccor, setShowEndangeredAccor] = useState(false);
  const [settingsAccor, setSettingsAccor] = useState(false);
  const [blogsAccor, setBlogsAccor] = useState(false);
  const [newsAccor, setNewsAccor] = useState(false);
  const [scienceAccor, setScienceAccor] = useState(false);
  const [organizationAccor, setOrganizationAccor] = useState(false);
  const member = getProfile();

  const toggleNavMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSelect = (eventKey) => setActiveKeys(eventKey);

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("open-menu");
      if (showEndangeredAccor) {
        setShowEndangeredAccor(false);
      }
      if (settingsAccor) {
        setSettingsAccor(false);
      }
      if (blogsAccor) {
        setBlogsAccor(false);
      }
      if (newsAccor) {
        setNewsAccor(false);
      }
      if (scienceAccor) {
        setScienceAccor(false);
      }
      if (organizationAccor) {
        setOrganizationAccor(false);
      }
    } else {
      document.body.classList.remove("open-menu");
    }
  }, [showMenu]);

  useEffect(() => {
    let handler = (e) => {
      if (!showRef?.current?.contains(e.target)) {
        setShowEndangeredAccor(false);
      }

      if (!settingRef?.current?.contains(e.target)) {
        setSettingsAccor(false);
      }

      if (!blogRef?.current?.contains(e.target)) {
        setBlogsAccor(false);
      }

      if (!newsRef?.current?.contains(e.target)) {
        setNewsAccor(false);
      }
      if (!scienceRef?.current?.contains(e.target)) {
        setScienceAccor(false);
      }
      if (!organizationRef?.current?.contains(e.target)) {
        setOrganizationAccor(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    if (props.page === "Regions") {
      setActiveKeys(["0"]);
    }
    if (props.page === "Wet Market") {
      setActiveKeys(["1"]);
    }
    if (props.page === "Zoos") {
      setActiveKeys(["2"]);
    }
    if (
      props.page === "Species" ||
      props.page === "Danger Level" ||
      props.page === "Species Category"
    ) {
      setActiveKeys(["3"]);
    }
    if (
      props.page === "Organization" ||
      props.page === "Our Work" ||
      props.page === "Our Team" ||
      props.page === "Our Partner" ||
      props.page === "Add Media" ||
      props.page === "Our Program" ||
      props.page === "Reports"
    ) {
      setActiveKeys(["4"]);
    }

    if (props.page === "News" || props.page === "News Categories") {
      setActiveKeys(["7"]);
    }
    if (props.page === "Blog" || props.page === "Blog Category") {
      setActiveKeys(["9"]);
    }
    if (props.page === "Users") {
      setActiveKeys(["11"]);
    }
    if (
      props.page === "Home Page" ||
      props.page === "Newsletter Subscriptions" ||
      props.page === "Donation List"
    ) {
      setActiveKeys(["12"]);
    }
    if (
      props.page === "Science And Education" ||
      props.page === "Science And Education Categories"
    ) {
      setActiveKeys(["17"]);
    }
    if (props.page === "Environmentalists") {
      setActiveKeys(["18"]);
    }
  }, []);
  return (
    <>
      <div className="side-nav position-relative ">
        <div
          className="profile-area d-flex flex-wrap align-items-center "
          onClick={() => toggleNavMenu()}
        >
          <div
            className=" profile-img d-flex align-items-center justify-content-center "
            data-bs-toggle="popover"
            data-bs-placement="right"
            data-bs-trigger="hover focus"
            data-content-id="popover-d"
          >
            <img src={menuIcon} alt="" />
          </div>

          <div style={{ display: "none" }} id="popover-d">
            <div className="popover " role="tooltip">
              <p>
                Amet, turpis dui pellentesque sed eget aliquam quis felis. Et
                interdum
              </p>
            </div>
          </div>

          <div className="profile-text-box open-menu">
            <h4 style={{ textTransform: "capitalize" }}>
              {member && member.profile && member.profile.firstName} {""}
              {member && member.profile && member.profile.lastName} !
            </h4>
          </div>
        </div>

        <div className="side-nav-inside opacity-class ">
          <Accordion
            className="accordion"
            id="sideNav"
            // defaultActiveKey="0"
            activeKey={activeKeys}
            onSelect={(eventKey) => handleSelect(eventKey)}
          >
            <Accordion.Item className="accordion-item" eventKey="0">
              <Link exact to="/">
                <Accordion.Header
                  className="accordion-header side-nav-accordion-header"
                  // aria-expanded="true"
                >
                  <OverlayTrigger
                    key={"top"}
                    placement={"top"}
                    overlay={
                      <Tooltip id={`Regions`}>
                        <strong>Region</strong>
                      </Tooltip>
                    }
                  >
                    <Accordion.Button
                      className="accordion-button side-nav-accordion-button "
                      // aria-expanded="true"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke={
                            activeKeys == "0" ? "#47AD1D" : "currentColor"
                          }
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2 12H22"
                          stroke={
                            activeKeys == "0" ? "#47AD1D" : "currentColor"
                          }
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                          stroke={
                            activeKeys == "0" ? "#47AD1D" : "currentColor"
                          }
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span>Region</span>
                    </Accordion.Button>
                  </OverlayTrigger>
                </Accordion.Header>
              </Link>
            </Accordion.Item>

            <Accordion.Item eventKey="1" className="accordion-item">
              <Link exact to="/wet-market">
                <Accordion.Header className="accordion-header side-nav-accordion-header">
                  <OverlayTrigger
                    key={"top"}
                    placement={"top"}
                    overlay={
                      <Tooltip id={`Threat`}>
                        <strong>War on the environment - Threat</strong>
                      </Tooltip>
                    }
                  >
                    <Accordion.Button className="accordion-button collapsed side-nav-accordion-button">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 18V16.5175C3 14.6775 4.2552 13.0748 6.04158 12.634L6.27273 12.5769L8.12243 12.1204C9.04124 11.8937 9.84989 11.3485 10.4047 10.5818L10.9091 9.88462L11.0751 9.65518C11.8273 8.6156 13.0326 8 14.3158 8H14.4545H16.6364H17C19.2091 8 21 9.79086 21 12V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18Z"
                          stroke={
                            activeKeys == "1" ? "#47AD1D" : "currentColor"
                          }
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17.2659 2.25821C16.9354 1.58505 16.1232 1.30325 15.4502 1.64599C14.7824 1.98604 14.5202 2.80467 14.8483 3.4729L15.5991 5.00238C15.9385 5.6937 15.8431 6.52408 15.359 7.11578C14.1115 8.64042 13.9483 10.799 14.9498 12.499L15.4641 13.3721C15.8452 14.0189 16.6771 14.2354 17.3214 13.8417C17.9601 13.4514 18.1609 12.6156 17.7829 11.974L17.2686 11.101C16.8509 10.3919 16.9199 9.49066 17.4384 8.85702C18.6038 7.43266 18.8297 5.44363 18.0167 3.78768L17.2659 2.25821ZM10.4685 5.71967C10.138 5.04651 9.32588 4.76472 8.65283 5.10746C7.98508 5.4475 7.72285 6.26614 8.05091 6.93437L8.80178 8.46384C9.14117 9.15517 9.04574 9.98554 8.56161 10.5772C7.31411 12.1019 7.15091 14.2604 8.15243 15.9605L8.66677 16.8335C9.04785 17.4804 9.87977 17.6969 10.524 17.3032C11.1627 16.9129 11.3635 16.0771 10.9855 15.4355L10.4712 14.5624C10.0535 13.8534 10.1226 12.9521 10.641 12.3185C11.8065 10.8941 12.0323 8.90509 11.2194 7.24915L10.4685 5.71967Z"
                          fill="black"
                          stroke={
                            activeKeys == "1" ? "#47AD1D" : "currentColor"
                          }
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span>War on the environment - Threat</span>
                      <svg
                        className="chevron-down-icon"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.32812 7.5L10.3281 12.5L15.3281 7.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Accordion.Button>
                  </OverlayTrigger>
                </Accordion.Header>
              </Link>
            </Accordion.Item>

            <Accordion.Item eventKey="2" className="accordion-item">
              <Link exact to="/zoos-and-wildlife">
                <Accordion.Header className="accordion-header side-nav-accordion-header">
                  <OverlayTrigger
                    key={"top"}
                    placement={"top"}
                    overlay={
                      <Tooltip id={`Zoos`}>
                        <strong>Zoos and Wildlife reserve</strong>
                      </Tooltip>
                    }
                  >
                    <Accordion.Button className="accordion-button collapsed side-nav-accordion-button ">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.25 10C20.25 13.9235 16.6418 17.25 12 17.25C7.35816 17.25 3.75 13.9235 3.75 10C3.75 6.07654 7.35816 2.75 12 2.75C16.6418 2.75 20.25 6.07654 20.25 10Z"
                          stroke={
                            activeKeys == "2" ? "#47AD1D" : "currentColor"
                          }
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M12 10V12.5909M12 22H8M12 22H16M12 22V14.5M12 12.5909L9.45455 11.0909M12 12.5909V14.5M12 14.5L14.3636 13"
                          stroke={
                            activeKeys == "2" ? "#47AD1D" : "currentColor"
                          }
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                      <span>Zoos and Wildlife reserve</span>
                      <svg
                        className="chevron-down-icon"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.32812 7.5L10.3281 12.5L15.3281 7.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Accordion.Button>
                  </OverlayTrigger>
                </Accordion.Header>
              </Link>
            </Accordion.Item>

            {!showMenu && (
              <>
                <div class="accordion-item dropdown" ref={showRef}>
                  <div
                    class={`accordion-header side-nav-accordion-header  ${
                      showEndangeredAccor && "show"
                    }`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <OverlayTrigger
                      key={"top"}
                      placement={"top"}
                      overlay={
                        <Tooltip id={`Species`}>
                          <strong>Endangered Species</strong>
                        </Tooltip>
                      }
                    >
                      <div
                        class="accordion-button collapsed side-nav-accordion-button"
                        data-bs-target="#menuOne"
                        aria-expanded="false"
                        onClick={() => {
                          if (showEndangeredAccor) {
                            setShowEndangeredAccor(false);
                          } else {
                            setShowEndangeredAccor(true);
                          }
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.125 12C3.08947 12 2.25 11.1605 2.25 10.125C2.25 9.08947 2.46447 8 3.5 8C4.53553 8 6 9.08947 6 10.125C6 11.1605 5.16053 12 4.125 12Z"
                            stroke={
                              activeKeys == "3" ? "#47AD1D " : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M19.875 12C18.8395 12 18 11.1605 18 10.125C18 9.08947 19.4645 8 20.5 8C21.5355 8 21.75 9.08947 21.75 10.125C21.75 11.1605 20.9105 12 19.875 12Z"
                            stroke={
                              activeKeys == "3" ? "#47AD1D " : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15.375 7.5C14.3395 7.5 13.5 6.66053 13.5 5.625C13.5 4.58947 14.9645 2.5 16 2.5C17.0355 2.5 17.25 4.58947 17.25 5.625C17.25 6.66053 16.4105 7.5 15.375 7.5Z"
                            stroke={
                              activeKeys == "3" ? "#47AD1D " : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.625 7.5C7.58947 7.5 6.75 6.66053 6.75 5.625C6.75 4.58947 6.96447 2.5 8 2.5C9.03553 2.5 10.5 4.58947 10.5 5.625C10.5 6.66053 9.66053 7.5 8.625 7.5Z"
                            stroke={
                              activeKeys == "3" ? "#47AD1D " : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.82162 14.6113C7.7623 14.0888 8.45863 13.216 8.75915 12.1828L8.75923 12.1829C8.9632 11.4812 9.38941 10.8646 9.97381 10.4259C10.5582 9.98718 11.2692 9.75 12 9.75C12.7307 9.75 13.4417 9.98718 14.0261 10.4259C14.6105 10.8646 15.0367 11.4812 15.2407 12.1829L15.2408 12.1828C15.5413 13.216 16.2376 14.0888 17.1783 14.6113C17.8559 14.9786 18.3662 15.5925 18.6034 16.3259C18.8406 17.0593 18.7865 17.8558 18.4523 18.5503C18.1181 19.2449 17.5295 19.7842 16.8084 20.0565C16.0874 20.3288 15.2892 20.3132 14.5793 20.0129C12.9265 19.3352 11.0734 19.3352 9.42062 20.0129C8.7107 20.3135 7.91231 20.3294 7.19103 20.0571C6.46975 19.7849 5.88093 19.2455 5.54667 18.5508C5.21241 17.8561 5.15837 17.0594 5.39575 16.3259C5.63312 15.5924 6.14371 14.9784 6.82162 14.6113Z"
                            stroke={
                              activeKeys == "3" ? "#47AD1D " : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span>Endangered species</span>
                        <svg
                          class="chevron-down-icon"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke={activeKeys == "3" ? "#47AD1D " : " "}
                            d="M5.32812 7.5L10.3281 12.5L15.3281 7.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </OverlayTrigger>
                  </div>
                  <div
                    id="menuOne"
                    class={`menu-dropdown accordion-collapse collapse dropdown-menu ${
                      showEndangeredAccor && "show"
                    }`}
                    data-popper-placement="bottom-start"
                  >
                    <div class="accordion-body">
                      <ul>
                        <li>
                          <Link
                            exact
                            to="/species"
                            className={
                              activeKeys == "3" && props.page === "Species"
                                ? "active"
                                : ""
                            }
                            onClick={() => setShowEndangeredAccor(false)}
                          >
                            Species
                          </Link>
                        </li>
                        <li>
                          <Link
                            exact
                            to="/species/danger-level"
                            className={
                              activeKeys == "3" && props.page === "Danger Level"
                                ? "active"
                                : ""
                            }
                            onClick={() => setShowEndangeredAccor(false)}
                          >
                            Danger Level
                          </Link>
                        </li>
                        <li>
                          <Link
                            exact
                            to="/species/species-category"
                            className={
                              activeKeys == "3" &&
                              props.page === "Species Category"
                                ? "active"
                                : ""
                            }
                            onClick={() => setShowEndangeredAccor(false)}
                          >
                            <a> Species Category</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
            {showMenu && (
              <Accordion.Item className="accordion-item dropdown" eventKey="3">
                <Accordion.Header
                  className="accordion-header side-nav-accordion-header "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Accordion.Button
                    className="accordion-button collapsed side-nav-accordion-button"
                    data-bs-target="#menuOne"
                    aria-expanded="false"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.125 12C3.08947 12 2.25 11.1605 2.25 10.125C2.25 9.08947 2.46447 8 3.5 8C4.53553 8 6 9.08947 6 10.125C6 11.1605 5.16053 12 4.125 12Z"
                        stroke={activeKeys == "3" ? "#47AD1D" : "currentColor"}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M19.875 12C18.8395 12 18 11.1605 18 10.125C18 9.08947 19.4645 8 20.5 8C21.5355 8 21.75 9.08947 21.75 10.125C21.75 11.1605 20.9105 12 19.875 12Z"
                        stroke={activeKeys == "3" ? "#47AD1D" : "currentColor"}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.375 7.5C14.3395 7.5 13.5 6.66053 13.5 5.625C13.5 4.58947 14.9645 2.5 16 2.5C17.0355 2.5 17.25 4.58947 17.25 5.625C17.25 6.66053 16.4105 7.5 15.375 7.5Z"
                        stroke={activeKeys == "3" ? "#47AD1D" : "currentColor"}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.625 7.5C7.58947 7.5 6.75 6.66053 6.75 5.625C6.75 4.58947 6.96447 2.5 8 2.5C9.03553 2.5 10.5 4.58947 10.5 5.625C10.5 6.66053 9.66053 7.5 8.625 7.5Z"
                        stroke={activeKeys == "3" ? "#47AD1D" : "currentColor"}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.82162 14.6113C7.7623 14.0888 8.45863 13.216 8.75915 12.1828L8.75923 12.1829C8.9632 11.4812 9.38941 10.8646 9.97381 10.4259C10.5582 9.98718 11.2692 9.75 12 9.75C12.7307 9.75 13.4417 9.98718 14.0261 10.4259C14.6105 10.8646 15.0367 11.4812 15.2407 12.1829L15.2408 12.1828C15.5413 13.216 16.2376 14.0888 17.1783 14.6113C17.8559 14.9786 18.3662 15.5925 18.6034 16.3259C18.8406 17.0593 18.7865 17.8558 18.4523 18.5503C18.1181 19.2449 17.5295 19.7842 16.8084 20.0565C16.0874 20.3288 15.2892 20.3132 14.5793 20.0129C12.9265 19.3352 11.0734 19.3352 9.42062 20.0129C8.7107 20.3135 7.91231 20.3294 7.19103 20.0571C6.46975 19.7849 5.88093 19.2455 5.54667 18.5508C5.21241 17.8561 5.15837 17.0594 5.39575 16.3259C5.63312 15.5924 6.14371 14.9784 6.82162 14.6113Z"
                        stroke={activeKeys == "3" ? "#47AD1D" : "currentColor"}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>Endangered Species</span>
                    <svg
                      className="chevron-down-icon"
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.32812 7.5L10.3281 12.5L15.3281 7.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Accordion.Button>
                </Accordion.Header>

                <Accordion.Body className="accordion-body">
                  <ul>
                    <li>
                      <Link
                        exact
                        to="/species"
                        className={
                          activeKeys == "3" && props.page === "Species"
                            ? "active"
                            : ""
                        }
                      >
                        Species
                      </Link>
                    </li>
                    <li>
                      <Link
                        exact
                        to="/species/danger-level"
                        className={
                          activeKeys == "3" && props.page === "Danger Level"
                            ? "active"
                            : ""
                        }
                      >
                        Danger Level
                      </Link>
                    </li>
                    <li>
                      <Link
                        exact
                        to="/species/species-category"
                        className={
                          activeKeys == "3" && props.page === "Species Category"
                            ? "active"
                            : ""
                        }
                      >
                        <a> Species Category</a>
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            )}

            {!showMenu && (
              <>
                <div class="accordion-item dropdown" ref={organizationRef}>
                  <div
                    class={`accordion-header side-nav-accordion-header  ${
                      organizationAccor && "show"
                    }`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <OverlayTrigger
                      key={"top"}
                      placement={"top"}
                      overlay={
                        <Tooltip id={`Organization`}>
                          <strong>Organization</strong>
                        </Tooltip>
                      }
                    >
                      <div
                        class="accordion-button collapsed side-nav-accordion-button"
                        data-bs-target="#menuOne"
                        aria-expanded="false"
                        onClick={() => {
                          if (organizationAccor) {
                            setOrganizationAccor(false);
                          } else {
                            setOrganizationAccor(true);
                          }
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.5 20.2485H22.5"
                            stroke={
                              activeKeys == "4" ? "#47AD1D" : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M13.4995 20.2485V3.74853C13.4995 3.54962 13.4205 3.35886 13.2798 3.21821C13.1392 3.07755 12.9484 2.99854 12.7495 2.99854H3.74951C3.5506 2.99854 3.35983 3.07755 3.21918 3.21821C3.07853 3.35886 2.99951 3.54962 2.99951 3.74853V20.2485M20.9995 20.2485V9.74854C20.9995 9.54962 20.9205 9.35886 20.7798 9.21821C20.6392 9.07755 20.4484 8.99854 20.2495 8.99854H13.4995"
                            stroke={
                              activeKeys == "4" ? "#47AD1D" : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.99951 6.74854H8.99951"
                            stroke={
                              activeKeys == "4" ? "#47AD1D" : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.49951 12.7485H10.4995"
                            stroke={
                              activeKeys == "4" ? "#47AD1D" : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.99951 16.4985H8.99951"
                            stroke={
                              activeKeys == "4" ? "#47AD1D" : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.4995 16.4985H17.9995"
                            stroke={
                              activeKeys == "4" ? "#47AD1D" : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.4995 12.7485H17.9995"
                            stroke={
                              activeKeys == "4" ? "#47AD1D" : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span>Organization</span>
                        <svg
                          className="chevron-down-icon"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.32812 7.5L10.3281 12.5L15.3281 7.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </OverlayTrigger>
                  </div>
                  <div
                    id="menuOne"
                    class={`menu-dropdown accordion-collapse collapse dropdown-menu ${
                      organizationAccor && "show"
                    }`}
                    data-popper-placement="bottom-start"
                  >
                    <div class="accordion-body">
                      <ul>
                        <li>
                          <Link
                            exact
                            to="/organization"
                            className={
                              activeKeys == "4" && props.page === "Organization"
                                ? "active"
                                : ""
                            }
                            onClick={() => setOrganizationAccor(false)}
                          >
                            Organization
                          </Link>
                        </li>
                        <li>
                          <Link
                            exact
                            to="/organization/work"
                            className={
                              activeKeys == "4" && props.page === "Our Work"
                                ? "active"
                                : ""
                            }
                            onClick={() => setOrganizationAccor(false)}
                          >
                           Work
                          </Link>
                        </li>
                        <li>
                          <Link
                            exact
                            to="/organization/team"
                            className={
                              activeKeys == "4" && props.page === "Our Team"
                                ? "active"
                                : ""
                            }
                            onClick={() => setOrganizationAccor(false)}
                          >
                           Team
                          </Link>
                        </li>
                        <li>
                          <Link
                            exact
                            to="/organization/partners"
                            className={
                              activeKeys == "4" && props.page === "Our Partner"
                                ? "active"
                                : ""
                            }
                            onClick={() => setOrganizationAccor(false)}
                          >
                             Partners
                          </Link>
                        </li>
                        <li>
                          <Link
                            exact
                            to="/organization/media"
                            className={
                              activeKeys == "4" && props.page === "Add Media"
                                ? "active"
                                : ""
                            }
                            onClick={() => setOrganizationAccor(false)}
                          >
                             Media
                          </Link>
                        </li>
                        <li>
                          <Link
                            exact
                            to="/organization/programs"
                            className={
                              activeKeys == "4" && props.page === "Our Program"
                                ? "active"
                                : ""
                            }
                            onClick={() => setOrganizationAccor(false)}
                          >
                             Programs
                          </Link>
                        </li>
                        <li>
                          <Link
                            exact
                            to="/organization/reports"
                            className={
                              activeKeys == "4" && props.page === "Reports"
                                ? "active"
                                : ""
                            }
                            onClick={() => setOrganizationAccor(false)}
                          >
                            Reports
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
            {showMenu && (
              <Accordion.Item className="accordion-item dropdown" eventKey="4">
                <Accordion.Header
                  className="accordion-header side-nav-accordion-header "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Accordion.Button
                    className="accordion-button collapsed side-nav-accordion-button"
                    data-bs-target="#menuOne"
                    aria-expanded="false"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 20.2485H22.5"
                        stroke={activeKeys == "4" ? "#47AD1D" : "currentColor"}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.4995 20.2485V3.74853C13.4995 3.54962 13.4205 3.35886 13.2798 3.21821C13.1392 3.07755 12.9484 2.99854 12.7495 2.99854H3.74951C3.5506 2.99854 3.35983 3.07755 3.21918 3.21821C3.07853 3.35886 2.99951 3.54962 2.99951 3.74853V20.2485M20.9995 20.2485V9.74854C20.9995 9.54962 20.9205 9.35886 20.7798 9.21821C20.6392 9.07755 20.4484 8.99854 20.2495 8.99854H13.4995"
                        stroke={activeKeys == "4" ? "#47AD1D" : "currentColor"}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.99951 6.74854H8.99951"
                        stroke={activeKeys == "4" ? "#47AD1D" : "currentColor"}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.49951 12.7485H10.4995"
                        stroke={activeKeys == "4" ? "#47AD1D" : "currentColor"}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.99951 16.4985H8.99951"
                        stroke={activeKeys == "4" ? "#47AD1D" : "currentColor"}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16.4995 16.4985H17.9995"
                        stroke={activeKeys == "4" ? "#47AD1D" : "currentColor"}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16.4995 12.7485H17.9995"
                        stroke={activeKeys == "4" ? "#47AD1D" : "currentColor"}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>Organization</span>
                    <svg
                      className="chevron-down-icon"
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.32812 7.5L10.3281 12.5L15.3281 7.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Accordion.Button>
                </Accordion.Header>

                <Accordion.Body className="accordion-body">
                  <ul>
                    <li>
                      <Link
                        exact
                        to="/organization"
                        className={
                          activeKeys == "4" && props.page === "Organization"
                            ? "active"
                            : ""
                        }
                        onClick={() => setOrganizationAccor(false)}
                      >
                        Organization
                      </Link>
                    </li>
                    <li>
                      <Link
                        exact
                        to="/organization/work"
                        className={
                          activeKeys == "4" && props.page === "Our Work"
                            ? "active"
                            : ""
                        }
                        onClick={() => setOrganizationAccor(false)}
                      >
                         Work
                      </Link>
                    </li>
                    <li>
                      <Link
                        exact
                        to="/organization/team"
                        className={
                          activeKeys == "4" && props.page === "Our Team"
                            ? "active"
                            : ""
                        }
                        onClick={() => setOrganizationAccor(false)}
                      >
                         Team
                      </Link>
                    </li>
                    <li>
                      <Link
                        exact
                        to="/organization/partners"
                        className={
                          activeKeys == "4" && props.page === "Our Partner"
                            ? "active"
                            : ""
                        }
                        onClick={() => setOrganizationAccor(false)}
                      >
                        Partners
                      </Link>
                    </li>
                    <li>
                      <Link
                        exact
                        to="/organization/media"
                        className={
                          activeKeys == "4" && props.page === "Add Media"
                            ? "active"
                            : ""
                        }
                        onClick={() => setOrganizationAccor(false)}
                      >
                         Media
                      </Link>
                    </li>
                    <li>
                      <Link
                        exact
                        to="/organization/program"
                        className={
                          activeKeys == "4" && props.page === "Our Program"
                            ? "active"
                            : ""
                        }
                        onClick={() => setOrganizationAccor(false)}
                      >
                         Programs
                      </Link>
                    </li>
                    <li>
                      <Link
                        exact
                        to="/organization/reports"
                        className={
                          activeKeys == "4" && props.page === "Reports"
                            ? "active"
                            : ""
                        }
                        onClick={() => setOrganizationAccor(false)}
                      >
                        Reports
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            )}

            {!showMenu && (
              <>
                <div class="accordion-item dropdown" ref={scienceRef}>
                  <div
                    class={`accordion-header side-nav-accordion-header  ${
                      scienceAccor && "show"
                    }`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <OverlayTrigger
                      key={"top"}
                      placement={"top"}
                      overlay={
                        <Tooltip id={`Education`}>
                          <strong>Science and Education</strong>
                        </Tooltip>
                      }
                    >
                      <div
                        class="accordion-button collapsed side-nav-accordion-button"
                        data-bs-target="#menuOne"
                        aria-expanded="false"
                        onClick={() => {
                          if (scienceAccor) {
                            setScienceAccor(false);
                          } else {
                            setScienceAccor(true);
                          }
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.25 12C16.25 14.6702 15.7072 17.0506 14.8647 18.7357C13.9998 20.4656 12.9436 21.25 12 21.25C11.0564 21.25 10.0002 20.4656 9.13529 18.7357C8.29276 17.0506 7.75 14.6702 7.75 12C7.75 9.32976 8.29276 6.9494 9.13529 5.26434C10.0002 3.53443 11.0564 2.75 12 2.75C12.9436 2.75 13.9998 3.53443 14.8647 5.26434C15.7072 6.9494 16.25 9.32976 16.25 12Z"
                            stroke={
                              activeKeys == "17" ? "#47AD1D" : "currentColor"
                            }
                            stroke-width="1.5"
                          />
                          <path
                            opacity="0.5"
                            d="M13.9119 8.68859C16.2472 10.0369 18.0807 11.6709 19.1683 13.1925C20.2992 14.7746 20.4581 15.9731 20.0642 16.6555C19.6702 17.3379 18.5528 17.7994 16.6172 17.6112C14.7557 17.4301 12.4238 16.6592 10.0885 15.3109C7.75322 13.9626 5.91965 12.3286 4.83204 10.807C3.70119 9.22485 3.54224 8.02639 3.93622 7.34401C4.33019 6.66162 5.44756 6.20005 7.38315 6.38833C9.24471 6.56942 11.5766 7.34032 13.9119 8.68859Z"
                            stroke={
                              activeKeys == "17" ? "#47AD1D" : "currentColor"
                            }
                            stroke-width="1.5"
                          />
                          <path
                            d="M10.0883 8.68864C12.4236 7.34037 14.7555 6.56947 16.6171 6.38838C18.5527 6.20009 19.67 6.66167 20.064 7.34406C20.458 8.02644 20.299 9.2249 19.1682 10.807C18.0806 12.3286 16.247 13.9627 13.9117 15.311C11.5765 16.6592 9.24456 17.4301 7.38299 17.6112C5.44741 17.7995 4.33004 17.3379 3.93606 16.6555C3.54209 15.9731 3.70103 14.7747 4.83189 13.1926C5.91949 11.6709 7.75306 10.0369 10.0883 8.68864Z"
                            stroke={
                              activeKeys == "17" ? "#47AD1D" : "currentColor"
                            }
                            stroke-width="1.5"
                          />
                        </svg>
                        <span>Science and Education</span>
                        <svg
                          className="chevron-down-icon"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.32812 7.5L10.3281 12.5L15.3281 7.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </OverlayTrigger>
                  </div>
                  <div
                    id="menuOne"
                    class={`menu-dropdown accordion-collapse collapse dropdown-menu ${
                      scienceAccor && "show"
                    }`}
                    data-popper-placement="bottom-start"
                  >
                    <div class="accordion-body">
                      <ul>
                        <li>
                          <Link
                            exact
                            to="/science-and-educations"
                            className={
                              activeKeys == "17" &&
                              props.page === "Science And Education"
                                ? "active"
                                : ""
                            }
                            onClick={() => setScienceAccor(false)}
                          >
                            Science and Education
                          </Link>
                        </li>
                        <li>
                          <Link
                            exact
                            to="/science-and-educations/science-and-educations-Categories"
                            className={
                              activeKeys == "17" &&
                              props.page === "Science And Education Categories"
                                ? "active"
                                : ""
                            }
                            onClick={() => setScienceAccor(false)}
                          >
                            Science and Education Categories
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
            {showMenu && (
              <Accordion.Item eventKey="17" className="accordion-item dropdown">
                <Accordion.Header
                  className="accordion-header side-nav-accordion-header"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Accordion.Button
                    className="accordion-button side-nav-accordion-button"
                    data-bs-target="#menuFour"
                    aria-expanded="false"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.25 12C16.25 14.6702 15.7072 17.0506 14.8647 18.7357C13.9998 20.4656 12.9436 21.25 12 21.25C11.0564 21.25 10.0002 20.4656 9.13529 18.7357C8.29276 17.0506 7.75 14.6702 7.75 12C7.75 9.32976 8.29276 6.9494 9.13529 5.26434C10.0002 3.53443 11.0564 2.75 12 2.75C12.9436 2.75 13.9998 3.53443 14.8647 5.26434C15.7072 6.9494 16.25 9.32976 16.25 12Z"
                        stroke={activeKeys == "17" ? "#47AD1D" : "currentColor"}
                        stroke-width="1.5"
                      />
                      <path
                        opacity="0.5"
                        d="M13.9119 8.68859C16.2472 10.0369 18.0807 11.6709 19.1683 13.1925C20.2992 14.7746 20.4581 15.9731 20.0642 16.6555C19.6702 17.3379 18.5528 17.7994 16.6172 17.6112C14.7557 17.4301 12.4238 16.6592 10.0885 15.3109C7.75322 13.9626 5.91965 12.3286 4.83204 10.807C3.70119 9.22485 3.54224 8.02639 3.93622 7.34401C4.33019 6.66162 5.44756 6.20005 7.38315 6.38833C9.24471 6.56942 11.5766 7.34032 13.9119 8.68859Z"
                        stroke={activeKeys == "17" ? "#47AD1D" : "currentColor"}
                        stroke-width="1.5"
                      />
                      <path
                        d="M10.0883 8.68864C12.4236 7.34037 14.7555 6.56947 16.6171 6.38838C18.5527 6.20009 19.67 6.66167 20.064 7.34406C20.458 8.02644 20.299 9.2249 19.1682 10.807C18.0806 12.3286 16.247 13.9627 13.9117 15.311C11.5765 16.6592 9.24456 17.4301 7.38299 17.6112C5.44741 17.7995 4.33004 17.3379 3.93606 16.6555C3.54209 15.9731 3.70103 14.7747 4.83189 13.1926C5.91949 11.6709 7.75306 10.0369 10.0883 8.68864Z"
                        stroke={activeKeys == "17" ? "#47AD1D" : "currentColor"}
                        stroke-width="1.5"
                      />
                    </svg>
                    <span>Science and Education</span>
                    <svg
                      className="chevron-down-icon"
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.32812 7.5L10.3281 12.5L15.3281 7.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Accordion.Button>
                </Accordion.Header>

                <Accordion.Body className="accordion-body">
                  <ul>
                    <li>
                      <Link
                        exact
                        to="/science-and-educations"
                        className={
                          activeKeys == "17" &&
                          props.page === "Science And Education"
                            ? "active"
                            : ""
                        }
                      >
                        Science and Education
                      </Link>
                    </li>
                    <li>
                      <Link
                        exact
                        to="/science-and-educations/science-and-educations-Categories"
                        className={
                          activeKeys == "17" &&
                          props.page === "Science And Education Categories"
                            ? "active"
                            : ""
                        }
                      >
                        Science and Education Categories
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            )}

            <Accordion.Item eventKey="18" className="accordion-item">
              <Link exact to="/environmentalists">
                <Accordion.Header className="accordion-header side-nav-accordion-header">
                  <OverlayTrigger
                    key={"top"}
                    placement={"top"}
                    overlay={
                      <Tooltip id={`Environmentalist`}>
                        <strong>Environmentalists</strong>
                      </Tooltip>
                    }
                  >
                    <Accordion.Button className="accordion-button collapsed side-nav-accordion-button">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.0407 2.40039C6.9311 2.40039 3.59961 5.73188 3.59961 9.84149C3.59961 12.0729 4.58179 14.0749 6.13742 15.4387C6.27664 15.5608 6.36125 15.7349 6.36125 15.9201V18.2629C6.36125 18.5063 6.50509 18.7267 6.72789 18.8246L12.8265 21.5068C13.2321 21.6851 13.6873 21.3881 13.6873 20.945V18.7018C13.6873 18.3628 13.962 18.0881 14.301 18.0881H17.6763C18.0153 18.0881 18.29 17.8133 18.29 17.4744V15.5432C18.29 15.3155 18.4161 15.1065 18.6175 15.0003L19.874 14.3378C20.167 14.1833 20.2845 13.8242 20.1396 13.5264L18.544 10.2475C18.5 10.1572 18.4794 10.0575 18.4809 9.95713C18.4815 9.91865 18.4818 9.8801 18.4818 9.84149C18.4818 5.73188 15.1503 2.40039 11.0407 2.40039Z"
                          stroke={
                            activeKeys == "18" ? "#47AD1D" : "currentColor"
                          }
                          stroke-width="1.5"
                        />
                        <path
                          d="M8.47256 11.7289C6.89345 8.64444 9.44504 6.23928 13.5528 7.22344C13.8425 7.29285 14.0417 7.55888 14.0272 7.85641C13.8998 10.4775 12.7052 11.9629 9.03878 12.0574C8.80258 12.0635 8.58023 11.9392 8.47256 11.7289Z"
                          stroke={
                            activeKeys == "18" ? "#47AD1D" : "currentColor"
                          }
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.32031 13.0706C8.82481 11.2208 8.99295 10.2119 11.0108 9.37109"
                          stroke={
                            activeKeys == "18" ? "#47AD1D" : "currentColor"
                          }
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <span>Environmentalists</span>
                      <svg
                        className="chevron-down-icon"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.32812 7.5L10.3281 12.5L15.3281 7.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Accordion.Button>
                  </OverlayTrigger>
                </Accordion.Header>
              </Link>
            </Accordion.Item>

            {/* {!showMenu && (
              <>
                <div class="accordion-item dropdown" ref={newsRef}>
                  <div
                    class={`accordion-header side-nav-accordion-header  ${
                      newsAccor && "show"
                    }`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <OverlayTrigger
                      key={"top"}
                      placement={"top"}
                      overlay={
                        <Tooltip id={`news`}>
                          <strong>News</strong>
                        </Tooltip>
                      }
                    >
                      <div
                        class="accordion-button collapsed side-nav-accordion-button"
                        data-bs-target="#menuOne"
                        aria-expanded="false"
                        onClick={() => {
                          if (newsAccor) {
                            setNewsAccor(false);
                          } else {
                            setNewsAccor(true);
                          }
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.5 10.5H17"
                            stroke={
                              activeKeys == "7" ? "#47AD1D" : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.5 13.5H17"
                            stroke={
                              activeKeys == "7" ? "#47AD1D" : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M3.5 18.75C3.89782 18.75 4.27936 18.592 4.56066 18.3107C4.84196 18.0294 5 17.6478 5 17.25V6C5 5.80109 5.07902 5.61032 5.21967 5.46967C5.36032 5.32902 5.55109 5.25 5.75 5.25H20.75C20.9489 5.25 21.1397 5.32902 21.2803 5.46967C21.421 5.61032 21.5 5.80109 21.5 6V17.25C21.5 17.6478 21.342 18.0294 21.0607 18.3107C20.7794 18.592 20.3978 18.75 20 18.75H3.5ZM3.5 18.75C3.10218 18.75 2.72064 18.592 2.43934 18.3107C2.15804 18.0294 2 17.6478 2 17.25V8.25"
                            stroke={
                              activeKeys == "7" ? "#47AD1D" : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span>News</span>
                        <svg
                          className="chevron-down-icon"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.32812 7.5L10.3281 12.5L15.3281 7.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </OverlayTrigger>
                  </div>
                  <div
                    id="menuOne"
                    class={`menu-dropdown accordion-collapse collapse dropdown-menu ${
                      newsAccor && "show"
                    }`}
                    data-popper-placement="bottom-start"
                  >
                    <div class="accordion-body">
                      <ul>
                        <li>
                          <Link
                            exact
                            to="/news"
                            className={
                              activeKeys == "7" && props.page === "News"
                                ? "active"
                                : ""
                            }
                            onClick={() => setNewsAccor(false)}
                          >
                            News
                          </Link>
                        </li>
                        <li>
                          <Link
                            exact
                            to="/news-Categories"
                            className={
                              activeKeys == "7" &&
                              props.page === "News Categories"
                                ? "active"
                                : ""
                            }
                            onClick={() => setNewsAccor(false)}
                          >
                            News Categories
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
            {showMenu && (
              <Accordion.Item eventKey="7" className="accordion-item dropdown">
                <Accordion.Header
                  className="accordion-header side-nav-accordion-header"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Accordion.Button
                    className="accordion-button side-nav-accordion-button"
                    data-bs-target="#menuFour"
                    aria-expanded="false"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 10.5H17"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.5 13.5H17"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3.5 18.75C3.89782 18.75 4.27936 18.592 4.56066 18.3107C4.84196 18.0294 5 17.6478 5 17.25V6C5 5.80109 5.07902 5.61032 5.21967 5.46967C5.36032 5.32902 5.55109 5.25 5.75 5.25H20.75C20.9489 5.25 21.1397 5.32902 21.2803 5.46967C21.421 5.61032 21.5 5.80109 21.5 6V17.25C21.5 17.6478 21.342 18.0294 21.0607 18.3107C20.7794 18.592 20.3978 18.75 20 18.75H3.5ZM3.5 18.75C3.10218 18.75 2.72064 18.592 2.43934 18.3107C2.15804 18.0294 2 17.6478 2 17.25V8.25"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>News</span>
                    <svg
                      className="chevron-down-icon"
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.32812 7.5L10.3281 12.5L15.3281 7.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Accordion.Button>
                </Accordion.Header>

                <Accordion.Body className="accordion-body">
                  <ul>
                    <li>
                      <Link
                        exact
                        to="/news"
                        className={
                          activeKeys == "7" && props.page === "News"
                            ? "active"
                            : ""
                        }
                      >
                        News
                      </Link>
                    </li>
                    <li>
                      <Link
                        exact
                        to="/news-Categories"
                        className={
                          activeKeys == "7" && props.page === "News Categories"
                            ? "active"
                            : ""
                        }
                      >
                        News Categories
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            )}

            {!showMenu && (
              <>
                <div class="accordion-item dropdown" ref={blogRef}>
                  <div
                    class={`accordion-header side-nav-accordion-header  ${
                      blogsAccor && "show"
                    }`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <OverlayTrigger
                      key={"top"}
                      placement={"top"}
                      overlay={
                        <Tooltip id={`Settings`}>
                          <strong>Blogs</strong>
                        </Tooltip>
                      }
                    >
                      <div
                        class="accordion-button collapsed side-nav-accordion-button"
                        data-bs-target="#menuOne"
                        aria-expanded="false"
                        onClick={() => {
                          if (blogsAccor) {
                            setBlogsAccor(false);
                          } else {
                            setBlogsAccor(true);
                          }
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.8084 3.37602C19.9276 3.25681 20.0691 3.16224 20.2249 3.09772C20.3807 3.03321 20.5476 3 20.7162 3C20.8848 3 21.0517 3.03321 21.2075 3.09772C21.3632 3.16224 21.5048 3.25681 21.624 3.37602C21.7432 3.49523 21.8378 3.63676 21.9023 3.79251C21.9668 3.94827 22 4.11521 22 4.28381C22 4.4524 21.9668 4.61934 21.9023 4.7751C21.8378 4.93086 21.7432 5.07238 21.624 5.19159L15.4964 11.3192L13 12L13.6808 9.50358L19.8084 3.37602Z"
                            stroke={
                              activeKeys == "9" ? "#47AD1D" : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12.6 5H3V21L7.26667 18.2414H19V13.2759M6.2 9.96552C6.62667 9.96552 8.51111 9.96552 9.4 9.96552M6.2 13.2759H9.4"
                            stroke={
                              activeKeys == "9" ? "#47AD1D" : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span>Blogs</span>
                        <svg
                          className="chevron-down-icon"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.32812 7.5L10.3281 12.5L15.3281 7.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </OverlayTrigger>
                  </div>
                  <div
                    id="menuOne"
                    class={`menu-dropdown accordion-collapse collapse dropdown-menu ${
                      blogsAccor && "show"
                    }`}
                    data-popper-placement="bottom-start"
                  >
                    <div class="accordion-body">
                      <ul>
                        <li>
                          <Link
                            exact
                            to="/blogs"
                            className={
                              activeKeys == "9" && props.page === "Blog"
                                ? "active"
                                : ""
                            }
                            onClick={() => setBlogsAccor(false)}
                          >
                            Blog
                          </Link>
                        </li>
                        <li>
                          <Link
                            exact
                            to="/blog-category"
                            className={
                              activeKeys == "9" &&
                              props.page === "Blog Category"
                                ? "active"
                                : ""
                            }
                            onClick={() => setBlogsAccor(false)}
                          >
                            Blog Categories
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
            {showMenu && (
              <Accordion.Item eventKey="9" className="accordion-item dropdown">
                <Accordion.Header
                  className="accordion-header side-nav-accordion-header"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Accordion.Button
                    className="accordion-button side-nav-accordion-button"
                    data-bs-target="#menuFour"
                    aria-expanded="false"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.8084 3.37602C19.9276 3.25681 20.0691 3.16224 20.2249 3.09772C20.3807 3.03321 20.5476 3 20.7162 3C20.8848 3 21.0517 3.03321 21.2075 3.09772C21.3632 3.16224 21.5048 3.25681 21.624 3.37602C21.7432 3.49523 21.8378 3.63676 21.9023 3.79251C21.9668 3.94827 22 4.11521 22 4.28381C22 4.4524 21.9668 4.61934 21.9023 4.7751C21.8378 4.93086 21.7432 5.07238 21.624 5.19159L15.4964 11.3192L13 12L13.6808 9.50358L19.8084 3.37602Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.6 5H3V21L7.26667 18.2414H19V13.2759M6.2 9.96552C6.62667 9.96552 8.51111 9.96552 9.4 9.96552M6.2 13.2759H9.4"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>Blogs</span>
                    <svg
                      className="chevron-down-icon"
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.32812 7.5L10.3281 12.5L15.3281 7.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Accordion.Button>
                </Accordion.Header>

                <Accordion.Body className="accordion-body">
                  <ul>
                    <li>
                      <Link
                        exact
                        to="/blogs"
                        className={
                          activeKeys == "9" && props.page === "Blog"
                            ? "active"
                            : ""
                        }
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        exact
                        to="/blog-category"
                        className={
                          activeKeys == "9" && props.page === "Blog Category"
                            ? "active"
                            : ""
                        }
                      >
                        Blog Categories
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            )} */}

            {member?.profile?.role !== 2 && (
              <>
                <Accordion.Item eventKey="11" className="accordion-item">
                  <Link exact to="/users">
                    <Accordion.Header className="accordion-header side-nav-accordion-header">
                      <OverlayTrigger
                        key={"top"}
                        placement={"top"}
                        overlay={
                          <Tooltip id={`Users`}>
                            <strong>Users</strong>
                          </Tooltip>
                        }
                      >
                        <Accordion.Button className="accordion-button collapsed side-nav-accordion-button">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                              stroke={
                                activeKeys == "11" ? "#47AD1D" : "currentColor"
                              }
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                              stroke={
                                activeKeys == "11" ? "#47AD1D" : "currentColor"
                              }
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <span>Users</span>
                          <svg
                            className="chevron-down-icon"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.32812 7.5L10.3281 12.5L15.3281 7.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </Accordion.Button>
                      </OverlayTrigger>
                    </Accordion.Header>
                  </Link>
                </Accordion.Item>

                {!showMenu && (
                  <>
                    <div class="accordion-item dropdown" ref={settingRef}>
                      <div
                        class={`accordion-header side-nav-accordion-header  ${
                          settingsAccor && "show"
                        }`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <OverlayTrigger
                          key={"top"}
                          placement={"top"}
                          overlay={
                            <Tooltip id={`Settings`}>
                              <strong>Settings</strong>
                            </Tooltip>
                          }
                        >
                          <div
                            class="accordion-button collapsed side-nav-accordion-button"
                            data-bs-target="#menuOne"
                            aria-expanded="false"
                            onClick={() => {
                              if (settingsAccor) {
                                setSettingsAccor(false);
                              } else {
                                setSettingsAccor(true);
                              }
                            }}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M20.8064 7.62337L20.184 6.54328C19.6574 5.62936 18.4905 5.31408 17.5753 5.83847C17.1397 6.0951 16.6198 6.16791 16.1305 6.04084C15.6411 5.91378 15.2224 5.59727 14.9666 5.16113C14.8021 4.88391 14.7137 4.56815 14.7103 4.2458C14.7251 3.72898 14.5302 3.22816 14.1698 2.85743C13.8094 2.48669 13.3143 2.27762 12.7973 2.27783H11.5433C11.0367 2.27783 10.5511 2.47967 10.1938 2.8387C9.83644 3.19773 9.63693 3.68435 9.63937 4.19088C9.62435 5.23668 8.77224 6.07657 7.72632 6.07646C7.40397 6.07311 7.08821 5.9847 6.81099 5.82017C5.89582 5.29577 4.72887 5.61105 4.20229 6.52497L3.5341 7.62337C3.00817 8.53615 3.31916 9.70236 4.22975 10.2321C4.82166 10.5738 5.18629 11.2053 5.18629 11.8888C5.18629 12.5723 4.82166 13.2038 4.22975 13.5456C3.32031 14.0717 3.00898 15.2351 3.5341 16.1451L4.16568 17.2344C4.4124 17.6795 4.82636 18.0081 5.31595 18.1472C5.80554 18.2863 6.3304 18.2247 6.77438 17.9758C7.21084 17.7211 7.73094 17.6513 8.2191 17.782C8.70725 17.9126 9.12299 18.2328 9.37392 18.6714C9.53845 18.9486 9.62686 19.2644 9.63021 19.5868C9.63021 20.6433 10.4867 21.4998 11.5433 21.4998H12.7973C13.8502 21.4998 14.7053 20.6489 14.7103 19.5959C14.7079 19.0878 14.9086 18.5998 15.2679 18.2405C15.6272 17.8812 16.1152 17.6804 16.6233 17.6829C16.9449 17.6915 17.2594 17.7795 17.5387 17.9392C18.4515 18.4651 19.6177 18.1541 20.1474 17.2435L20.8064 16.1451C21.0615 15.7073 21.1315 15.1858 21.001 14.6961C20.8704 14.2065 20.55 13.7891 20.1108 13.5364C19.6715 13.2837 19.3511 12.8663 19.2206 12.3767C19.09 11.8871 19.16 11.3656 19.4151 10.9277C19.581 10.6381 19.8211 10.398 20.1108 10.2321C21.0159 9.70265 21.3262 8.54325 20.8064 7.63252V7.62337Z"
                                stroke={
                                  activeKeys == "12"
                                    ? "#47AD1D "
                                    : "currentColor"
                                }
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12.1746 14.5249C13.6304 14.5249 14.8106 13.3448 14.8106 11.8889C14.8106 10.4331 13.6304 9.25293 12.1746 9.25293C10.7188 9.25293 9.53857 10.4331 9.53857 11.8889C9.53857 13.3448 10.7188 14.5249 12.1746 14.5249Z"
                                stroke={
                                  activeKeys == "12"
                                    ? "#47AD1D "
                                    : "currentColor"
                                }
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <span>Settings</span>
                            <svg
                              class="chevron-down-icon"
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke={activeKeys == "12" ? "#47AD1D " : " "}
                                d="M5.32812 7.5L10.3281 12.5L15.3281 7.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </OverlayTrigger>
                      </div>
                      <div
                        id="menuOne"
                        class={`menu-dropdown accordion-collapse collapse dropdown-menu ${
                          settingsAccor && "show"
                        }`}
                        data-popper-placement="bottom-start"
                      >
                        <div class="accordion-body">
                          <ul>
                            <li>
                              <Link
                                exact
                                to="/setting/home-page-setting"
                                className={
                                  activeKeys == "12" &&
                                  props.page === "Home Page"
                                    ? "active"
                                    : ""
                                }
                                onClick={() => setSettingsAccor(false)}
                              >
                                Home Page
                              </Link>
                            </li>
                            {/* <li>
                              <Link
                                exact
                                to="/newsletter-subscriptions"
                                className={
                                  activeKeys == "12" &&
                                  props.page === "Newsletter Subscriptions"
                                    ? "active"
                                    : ""
                                }
                                onClick={() => setSettingsAccor(false)}
                              >
                                Newsletter Subscriptions
                              </Link>
                            </li> */}
                            <li>
                              <Link
                                exact
                                to="/setting/donations"
                                className={
                                  activeKeys == "12" &&
                                  props.page === "Donation List"
                                    ? "active"
                                    : ""
                                }
                                onClick={() => setSettingsAccor(false)}
                              >
                                Donations
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {showMenu && (
                  <Accordion.Item
                    eventKey="12"
                    className="accordion-item dropdown"
                  >
                    <Accordion.Header
                      className="accordion-header side-nav-accordion-header"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <Accordion.Button
                        className="accordion-button side-nav-accordion-button"
                        data-bs-target="#menuFour"
                        aria-expanded="false"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.8064 7.62337L20.184 6.54328C19.6574 5.62936 18.4905 5.31408 17.5753 5.83847C17.1397 6.0951 16.6198 6.16791 16.1305 6.04084C15.6411 5.91378 15.2224 5.59727 14.9666 5.16113C14.8021 4.88391 14.7137 4.56815 14.7103 4.2458C14.7251 3.72898 14.5302 3.22816 14.1698 2.85743C13.8094 2.48669 13.3143 2.27762 12.7973 2.27783H11.5433C11.0367 2.27783 10.5511 2.47967 10.1938 2.8387C9.83644 3.19773 9.63693 3.68435 9.63937 4.19088C9.62435 5.23668 8.77224 6.07657 7.72632 6.07646C7.40397 6.07311 7.08821 5.9847 6.81099 5.82017C5.89582 5.29577 4.72887 5.61105 4.20229 6.52497L3.5341 7.62337C3.00817 8.53615 3.31916 9.70236 4.22975 10.2321C4.82166 10.5738 5.18629 11.2053 5.18629 11.8888C5.18629 12.5723 4.82166 13.2038 4.22975 13.5456C3.32031 14.0717 3.00898 15.2351 3.5341 16.1451L4.16568 17.2344C4.4124 17.6795 4.82636 18.0081 5.31595 18.1472C5.80554 18.2863 6.3304 18.2247 6.77438 17.9758C7.21084 17.7211 7.73094 17.6513 8.2191 17.782C8.70725 17.9126 9.12299 18.2328 9.37392 18.6714C9.53845 18.9486 9.62686 19.2644 9.63021 19.5868C9.63021 20.6433 10.4867 21.4998 11.5433 21.4998H12.7973C13.8502 21.4998 14.7053 20.6489 14.7103 19.5959C14.7079 19.0878 14.9086 18.5998 15.2679 18.2405C15.6272 17.8812 16.1152 17.6804 16.6233 17.6829C16.9449 17.6915 17.2594 17.7795 17.5387 17.9392C18.4515 18.4651 19.6177 18.1541 20.1474 17.2435L20.8064 16.1451C21.0615 15.7073 21.1315 15.1858 21.001 14.6961C20.8704 14.2065 20.55 13.7891 20.1108 13.5364C19.6715 13.2837 19.3511 12.8663 19.2206 12.3767C19.09 11.8871 19.16 11.3656 19.4151 10.9277C19.581 10.6381 19.8211 10.398 20.1108 10.2321C21.0159 9.70265 21.3262 8.54325 20.8064 7.63252V7.62337Z"
                            stroke={
                              activeKeys == "12" ? "#47AD1D " : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12.1746 14.5249C13.6304 14.5249 14.8106 13.3448 14.8106 11.8889C14.8106 10.4331 13.6304 9.25293 12.1746 9.25293C10.7188 9.25293 9.53857 10.4331 9.53857 11.8889C9.53857 13.3448 10.7188 14.5249 12.1746 14.5249Z"
                            stroke={
                              activeKeys == "12" ? "#47AD1D " : "currentColor"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span>Settings</span>
                        <svg
                          className="chevron-down-icon"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.32812 7.5L10.3281 12.5L15.3281 7.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Accordion.Button>
                    </Accordion.Header>

                    <Accordion.Body className="accordion-body">
                      <ul>
                        <li>
                          <Link
                            exact
                            to="/home-page-setting"
                            className={
                              activeKeys == "12" && props.page === "Home Page"
                                ? "active"
                                : ""
                            }
                          >
                            Home Page
                          </Link>
                        </li>
                        {/* <li>
                          <Link
                            exact
                            to="/newsletter-subscriptions"
                            className={
                              activeKeys == "12" &&
                              props.page === "Newsletter Subscriptions"
                                ? "active"
                                : ""
                            }
                          >
                            Newsletter Subscriptions
                          </Link>
                        </li> */}
                        <li>
                          <Link
                            exact
                            to="/donations"
                            className={
                              activeKeys == "12" &&
                              props.page === "Donation List"
                                ? "active"
                                : ""
                            }
                            onClick={() => setSettingsAccor(false)}
                          >
                            Donations
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                )}
              </>
            )}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
