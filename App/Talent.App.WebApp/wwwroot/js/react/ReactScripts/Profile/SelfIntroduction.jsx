﻿/* Self introduction section */
import React, { Component } from "react";
import Cookies from "js-cookie";
import { Button } from "semantic-ui-react";

export default class SelfIntroduction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempSummary: "",
      tempDescription: "",
      showEditSection: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.saveSelfIntroData = this.saveSelfIntroData.bind(this);
  }

  handleChange(event) {
    if (event.target.name == "summary") {
      this.setState({
        tempSummary: event.target.value,
      });
    } else {
      this.setState({
        tempDescription: event.target.value,
      });
    }
  }

  openEdit() {
    this.setState({
      showEditSection: true,
    });
  }

  closeEdit() {
    this.setState({
      showEditSection: false,
    });
  }

  saveSelfIntroData() {
    let data = {};
    data["summary"] = this.state.tempSummary ? "" : this.props.summary;
    data["description"] = this.state.tempDescription
      ? ""
      : this.props.description;
    this.props.saveProfileData(data);
    this.closeEdit();
  }

  render() {
    return this.state.showEditSection
      ? this.renderEdit()
      : this.renderDisplay();
  }

  renderEdit() {
    return (
      <div className="row">
        <div className="ui sixteen wide column">
          <React.Fragment>
            <input
              type="text"
              maxLength={150}
              name="summary"
              placeholder="Please provide a short summary about yourself"
              defaultValue={this.props.summary}
              onChange={this.handleChange}
            ></input>
            <p>Summary must be no more than 150 characters.</p>
            <textarea
              rows={10}
              minLength={150}
              maxLength={600}
              name="description"
              placeholder="Please tell us about any hobbies, additional experties, or anythinh else you'd like to add"
              defaultValue={this.props.description}
              onChange={this.handleChange}
            ></textarea>
            <p>Description must be between 150-600 characters.</p>
          </React.Fragment>
          <Button
            type="button"
            className="ui right floated teal button"
            onClick={this.saveSelfIntroData}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }

  renderDisplay() {
    return (
      <div className="row">
        <div className="ui sixteen wide column">
          <React.Fragment>
            <input
              type="text"
              maxLength={150}
              name="summary"
              value={this.props.summary}
              onClick={this.openEdit}
            ></input>

            <textarea
              //rows={10}
              minLength={150}
              maxLength={600}
              name="description"
              value={this.props.description}
              onClick={this.openEdit}
            ></textarea>
            <p>
              Note: If you want to edit above please click any of the typing
              areas.
            </p>
          </React.Fragment>
          <Button type="button" className="ui right floated teal button">
            Save
          </Button>
        </div>
      </div>
    );
  }
}
