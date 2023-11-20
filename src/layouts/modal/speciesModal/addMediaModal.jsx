import React, { useState, useRef } from "react";
import { Offcanvas } from "react-bootstrap";
import deleteIcon from "../../../include/images/trash-20x20.svg";
import {
  addSpeciesMedia,
  deleteSpeciesMedia,
  getSpecies,
  getSpeciesList,
} from "../../../store/species";
import { connect } from "react-redux";
import AlertError from "../../../common/alerts/alertError";
import AlertSuccess from "../../../common/alerts/alertSuccess";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { Amplify, Storage, Auth } from "aws-amplify";
import DeleteModal from "../delete/deleteModal";

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

const AddSpeciesMediaModal = (props) => {
  var ref = useRef(null);
  const { show, onHide, sId, speciesMediaData, sort, order } = props;
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [deleteMediaModal, setDeleteMediaModal] = useState(false);
  const [media, setMedia] = useState();
  const [loadingUpload, setLoadingUpload] = useState(false);

  const toggleDeleteModal = (item) => {
    if (item !== undefined) {
      setMedia(item?.original);
      setDeleteMediaModal(!deleteMediaModal);
    } else setDeleteMediaModal(false);
  };

  const handleFileUpload = (event) => {
    let images = [];
    for (let i = 0; i < event.target.files?.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }
    setSelectedFiles(event.target.files);
  };

  const AddMediaHandler = (e) => {
    e.preventDefault()
    if (selectedFiles?.length) {
      setLoadingUpload(true);
   
      ref && ref.current && ref.current.continuousStart();
    }
    for (let i = 0; i < selectedFiles?.length; i++) {
      const file = selectedFiles[i];
      const fSize = Math.round(file.size / 1048576);
      const fType = file.type;
      const ext = file.name.split(".").pop();
      if (fSize > 25) {
        return (
          toast(
            <AlertError message="Media size exceeds maximum allowable size. Maximum allowable size is 25MB." />
          ),
          ref && ref.current && ref.current.complete(),
          setLoadingUpload(false)
       
        );
      } else if (
        ![
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "video/MP4",
          "video/webm",
        ].includes(fType)
      ) {
        return (
          toast(
            <AlertError message="Media is not of correct format and hence cannot be uploaded. Valid Media formats are jpeg, jpg, png, webp, MP4 and webm." />
          ),
          ref && ref.current && ref.current.complete(),
          setLoadingUpload(false)
        );
      } else {
        const fileName = uuidv4() + "." + ext;
        Storage.put(fileName, file, {
          completeCallback: (event) => {},
          progressCallback: (progress) => {},
          errorCallback: (err) => {
            setLoadingUpload(false);

            toast(
              <AlertError
                message={
                  err && err.message ? err.message : "Something went wrong"
                }
              />
            );
          },
        }).then((result) => {
          
          const data = {
            files: [
              {
                media: "public/" + result.key,
                mediaType: fType.split("/").shift(),
              },
            ],
          };
          props.addSpeciesMedia(sId, data, (res) => {
            if (res.status === 200) {
              ref && ref?.current && ref?.current?.complete();
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
                ref && ref?.current && ref?.current?.complete();
                if (res.status === 200) {
                  setSelectedFiles([]);
                  setLoadingUpload(false);
                  toast(<AlertSuccess message="Information Saved" />);
                } else {
                  ref && ref?.current && ref?.current?.complete();
                  setLoadingUpload(false);
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
              ref && ref?.current && ref?.current?.complete();
              setLoadingUpload(false);
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
  };

  const deleteHandler = () => {
    ref && ref.current && ref.current.continuousStart();
    const id = sId;
    const data = {
      media: media,
    };
    props.deleteSpeciesMedia(id, data, (res) => {
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
        <h5 class="offcanvas-title">Add Species Media</h5>
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
          <div class="owr-column">
            <div class="large-upload-box position-relative d-flex flex-column align-items-center justify-content-center">
              <label for="formFileSm">+ Upload Media</label>
              <div class="supported-file-format">
                Supported file format : Jpeg, Png, MP4, Svg, Jpg
              </div>
              <div class="supported-file-size">
                Videos and images cannot be more than 25MB
              </div>
              <input
                class="form-control position-absolute"
                id="formFileSm"
                type="file"
                multiple
                onChange={handleFileUpload}
              />
            </div>
          </div>

          <div class="owr-column-button d-grid gap-2 d-md-flex justify-content-md-end mt-40">
            <button
              type="button"
              class="btn btn-default"
              onClick={(e) => AddMediaHandler(e)}
            >
              {loadingUpload ? "Processing..." : "Upload"}
            </button>
          </div>
        </div>
        <div class="offcanvas-widget-row">
          {speciesMediaData &&
          speciesMediaData?.media &&
          speciesMediaData?.media?.length ? (
            <div class="page-title mb-3">All Media</div>
          ) : (
            ""
          )}

          <ul class="imageCard-list d-flex flex-wrap">
            {speciesMediaData &&
            speciesMediaData?.media &&
            speciesMediaData?.media?.length
              ? speciesMediaData?.media.map((item) => {
                  const originalImg = item && item.original;
                  const ext = item.original.split(".").pop();

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
  getSpeciesList: (params, callBack) =>
    dispatch(getSpeciesList(params, callBack)),
  addSpeciesMedia: (params, data, callback) =>
    dispatch(addSpeciesMedia(params, data, callback)),
  deleteSpeciesMedia: (params, data, callback) =>
    dispatch(deleteSpeciesMedia(params, data, callback)),
});

const mapStateToProps = (state) => ({
  getSpecies: getSpecies(state),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(AddSpeciesMediaModal));
