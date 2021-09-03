/* Photo upload section */
import React, { Component, Fragment } from "react";
import { Icon } from "semantic-ui-react";
import Cookies from "js-cookie";

export default class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    let placeHolderImg =
      "https://downloadfreesvgicons.com/icons/camera-and-video-icons/svg-camera-long-shadow-icon-2/svg-camera-long-shadow-icon-2.svg";
    this.state = {
      src: placeHolderImg,
      selectedFile: null,
      selectedFileName: "",
      imageSrc: "",
      imageId: "",
      showUpload: false,
    };

    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.handleUplaod = this.handleUpload.bind(this);
    this.handleCancelUpload = this.handleCancelUpload.bind(this);
    this.maxFileSize = 2097152;
    this.acceptedFileType = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    this.placeHolderImg = placeHolderImg;
  }

  handleChangeImage() {
    document.getElementById("imgupload").click();
  }

  fileSelectedHandler(event) {
    let localSelectedFile = this.state.selectedFile;
    let localSelectedFileName = this.state.selectedFileName;
    let localImageSrc = this.state.imageSrc;

    if (
      event.target.files[0].size > this.maxFileSize ||
      this.acceptedFileType.indexOf(event.target.files[0].type) == -1
    ) {
      TalentUtil.notification.show(
        "Max file size is 2 MB and supported file types are *.jpg, *.jpeg, *.png, *.gif",
        "error",
        null,
        null
      );
    } else {
      localSelectedFile = event.target.files[0];
      localSelectedFileName = event.target.files[0].name;
      localImageSrc = window.URL.createObjectURL(event.target.files[0]);
    }

    this.setState({
      selectedFile: localSelectedFile,
      selectedFileName: localSelectedFileName,
      imageSrc: localImageSrc,
      src: localImageSrc,
      showUpload: true,
    });
  }
  handleCancelUpload() {
    let image = this.state.placeHolderImg;
    this.setState({
      showUpload: false,
      src: image,
    });
  }
  handleUpload() {
    let data = new FormData();
    data.append("file", this.state.selectedFile);
    var cookies = Cookies.get("talentAuthToken");

    $.ajax({
      url: this.props.savePhotoUrl,
      headers: {
        Authorization: "Bearer " + cookies,
      },
      type: "POST",
      data: data,
      cache: false,
      processData: false,
      contentType: false,
      success: function (res) {
        if (res.success) {
          const data = {
            profilePhoto: this.state.localSelectedFileName,
            profilePhotoUrl: this.state.localImageSrc,
          };
          TalentUtil.notification.show(
            "Profile photo updated sucessfully",
            "success",
            null,
            null
          );
          this.setState(
            {
              showUpload: false,
            },
            this.props.updateProfileData(data)
          );
        } else {
          TalentUtil.notification.show(res.message, "error", null, null);
        }
      }.bind(this),
      error: function (res, status, error) {
        //Display error
        TalentUtil.notification.show(
          "There is an error when updating Images - " + error,
          "error",
          null,
          null
        );
      },
    });
  }

  render() {
    return (
      <React.Fragment>
        <div class="ui container three column grid">
          <div className="column">
            <p>
              Please click on the camera to upload an image.
              <br />
              Accepted image types: <b>.gif, .jpeg, .png, .jpg</b>
              <br />
              Size max Size: <b>2MB</b>
            </p>
          </div>
          <div className="column">
            <img
              src={this.state.src}
              style={{
                height: 112,
                width: 112,
                borderRadius: 55,
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: 1,
                alignContent: "right",
                verticalAlign: "top",
              }}
              onClick={this.handleChangeImage}
            />

            {this.state.showUpload ? (
              <Fragment>
                <button
                  type="button"
                  className="ui black button"
                  onClick={this.handleUplaod}
                >
                  <Icon name="upload" />
                  Upload
                </button>
                <button
                  type="button"
                  className="ui black button"
                  onClick={this.handleCancelUpload}
                >
                  <Icon name="cancel" />
                  Cancel
                </button>
              </Fragment>
            ) : null}
            <input
              type="file"
              id="imgupload"
              style={{ display: "none" }}
              accept="image/*"
              onChange={this.fileSelectedHandler}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
