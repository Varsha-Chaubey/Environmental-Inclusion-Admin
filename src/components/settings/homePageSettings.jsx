import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import AlertSuccess from "../../common/alerts/alertSuccess";
import LoadingBar from "react-top-loading-bar";
import Skeleton from "react-loading-skeleton";
import Header from "../common/header";
import Sidebar from "../common/sideBar";
import AlertError from "../../common/alerts/alertError";
import { toast } from "react-toastify";
import { getSetting, getSettingListing, addSettingData } from "../../store/setting";
const HomePageSettings = (props) => {
  var ref = useRef(null);
  const [loadingHomePageSetting, setLoadingHomePageSetting] = useState(false);
  const [homePageText, setHomePageText] = useState("");

  useEffect(() => {
    ref && ref.current && ref.current.continuousStart();
    setLoadingHomePageSetting(true);
    props.getSettingListing((res) => {
      if (res && res.status === 200) {
        setLoadingHomePageSetting(false);
        setHomePageText(res.data.data.homePageText);
        ref && ref.current && ref.current.complete();
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingHomePageSetting(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  }, []);

  const AddHomePageSetting = (e) => {
    e.preventDefault();
    ref && ref.current && ref.current.continuousStart();
    setLoadingHomePageSetting(true);
    const payload = {
      homePageText: homePageText ? homePageText : "",
    };
    props.addSettingData(payload, (res) => {
      if (res.status === 200) {
        props.getSettingListing((res) => {
          ref && ref.current && ref.current.complete();
          if (res.status === 200) {
            setHomePageText(res.data.data.homePageText);
            setLoadingHomePageSetting(false);
            toast(<AlertSuccess message="Information Saved" />);
          } else {
            ref && ref.current && ref.current.complete();
            setLoadingHomePageSetting(false);
            toast(
              <AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />,
            );
          }
        });
      } else {
        ref && ref.current && ref.current.complete();
        setLoadingHomePageSetting(false);
        toast(<AlertError message={res && res.data && res.data.message ? res.data.message : "Something Went Wrong"} />);
      }
    });
  };

  return (
    <div>
      <LoadingBar height={5} color="#47AD1D" ref={ref} />
      <Header />
      <div className="dashboard-insider position-relative d-lg-flex w-100 ">
        <Sidebar page={"Home Page"} />
        <div className="main-container">
          {/* <!--============================== Filter Container Start ==============================--> */}
          <div className="filter-container d-flex align-items-center sticky-top">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center flex-wrap justify-content-between">
                  <div className="filter-title fw-medium text-capitalize">Home Page Setting</div>
                  <div className="filter-widget-right d-flex align-items-center flex-wrap">
                    <div className="fw-item"></div>
                    {loadingHomePageSetting ? (
                      <div style={{ width: "10rem", paddingLeft: "15px" }}>
                        <Skeleton height="30px" width="50px" />
                      </div>
                    ) : (
                      <div className="fw-item">
                        <a className="btn btn-default" onClick={(e) => AddHomePageSetting(e)}>
                          Save
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
                <div class="custom-modal-body flex-grow-1 w-100 overflow-hidden">
                  <div class="full-width-textarea-row d-flex flex-wrap">
                    <div class="pt-2 fwtr-label-box ">Home Page Banner Text</div>
                    <div class="fwtr-input-box flex-grow-1">
                      <textarea
                        value={homePageText}
                        type="text"
                        className="form-control w-100 "
                        onChange={(e) => {
                          setHomePageText(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="tb-filter-right d-flex align-items-center justify-content-end">
                  <div className="showing-result-text"></div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- ============================= Table Container End ============================ --> */}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getSettingListing: (callBack) => dispatch(getSettingListing(callBack)),
  addSettingData: (data, callback) => dispatch(addSettingData(data, callback)),
});

const mapStateToProps = (state) => ({
  getSetting: getSetting(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(HomePageSettings));
