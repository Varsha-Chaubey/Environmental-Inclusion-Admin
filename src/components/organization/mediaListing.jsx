import React, { useState, useRef } from "react";
import { Offcanvas } from "react-bootstrap";
import deleteIcon from "../../include/images/trash-20x20.svg";
import { connect } from "react-redux";
import {
  getOrganization,
  getMediaListing,
  deleteMediaData,
} from "../../store/organization";
import AlertError from "../../common/alerts/alertError";
import AlertSuccess from "../../common/alerts/alertSuccess";
import { toast } from "react-toastify";
import DeleteModal from "../../layouts/modal/delete/deleteModal";
const OrganizationMediaListing = (props) => {
  var ref = useRef(null);
  const { show, onHide, MediaData, sort, order } = props;
  const [deleteMediaModal, setDeleteMediaModal] = useState(false);
  const [media, setMedia] = useState();
  const [mediaId, setMediaId] = useState();
  const toggleDeleteModal = (item) => {
    if (item !== undefined) {
      setMedia(item?.file);
      setMediaId(item?._id);
      setDeleteMediaModal(!deleteMediaModal);
    } else setDeleteMediaModal(false);
  };

  const deleteHandler = () => {
    ref && ref.current && ref.current.continuousStart();
    const id = mediaId;
    const data = {
      media: media,
    };
    props.deleteMediaData(id, data, (res) => {
      if (res && res.status === 200) {
        const params = {
          isActive: true,
          page: 1,
          sort,
          order,
          organization: "",
        };
        props.getMediaListing(params, (res) => {
          if (res && res.status === 200) {
            ref && ref.current && ref.current.complete();
            toast(<AlertSuccess message={"Record deleted"} />);
            toggleDeleteModal();
          }
        });
      } else {
        ref && ref.current && ref.current.complete();
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
    <Offcanvas
      placement="end"
      backdropclassName="upload-documnets-backdrop"
      show={show}
      onHide={() => onHide()}
      className="offcanvas offcanvas-end xl-offcanvas border-0"
      id="uploadImageOffcanvas"
      enforceFocus={false}
    >
      <Offcanvas.Header className="offcanvas-header ">
        <h5 class="offcanvas-title">All Media</h5>
        <button
          type="button"
          class="offcanvas-close-btn d-flex align-items-center justify-content-center "
          data-bs-dismiss="offcanvas"
          onClick={() => onHide()}
        >
          <img src="include/images/close-12x12.svg" alt="" />
        </button>
      </Offcanvas.Header>
      <Offcanvas.Body className="offcanvas-body p-0 position-relative">
        <div class="offcanvas-widget-row">
          {MediaData && MediaData?.length ? (
            <div class="page-title mb-3">All Media</div>
          ) : (
            ""
          )}
          <ul class="imageCard-list d-flex flex-wrap">
            {MediaData && MediaData.files && MediaData.files?.length
              ? MediaData.files.map((item) => {
                  const originalImg = item && item.file;
                  const ext = item && item.file.split(".").pop();
                  return (
                    <>
                      {
                        <li class="imageCard-item">
                          <div class="imageCard-box w-100 h-100 d-flex flex-column">
                            <div class="imageCard-image-box position-relative">
                              {item && item?.mediaType === "image" ? (
                                <img
                                  class="imageCard-image media-img"
                                  src={
                                    process.env.REACT_APP_MEDIA +
                                    `${originalImg}`
                                  }
                                  alt=""
                                />
                              ) : (
                                <video
                                  className="imageCard-image"
                                  type={`${item.mediaType}/${ext}`}
                                  controls
                                >
                                  <source
                                    src={
                                      process.env.REACT_APP_MEDIA +
                                      `${originalImg}`
                                    }
                                  />
                                </video>
                              )}
                             
                            </div>
                            <div class="imageCard-icon-list d-flex flex-wrap align-items-center ">
                              <div class="imageCard-icon-item">
                                <div class="imageCard-icon d-flex position-relative align-items-center">
                                  <img
                                    src={deleteIcon}
                                    alt=""
                                    onClick={() => toggleDeleteModal(item)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      }
                    </>
                  );
                })
              : ""}
          </ul>
        </div>
        <div class="popover-overlay">
          <DeleteModal
            show={deleteMediaModal}
            onHide={toggleDeleteModal}
            deleteHandler={deleteHandler}
          />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getMediaListing: (param, callBack) =>
    dispatch(getMediaListing(param, callBack)),

  deleteMediaData: (params, data, callback) =>
    dispatch(deleteMediaData(params, data, callback)),
});

const mapStateToProps = (state) => ({
  getOrganization: getOrganization(state),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(OrganizationMediaListing));
