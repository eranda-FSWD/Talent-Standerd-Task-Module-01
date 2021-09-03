/* Experience section */
import React, { Fragment } from "react";
import Cookies from "js-cookie";
import { Icon } from "semantic-ui-react";
import { ChildSingleInput } from "../Form/SingleInput.jsx";
import moment from "moment";

export default class Experience extends React.Component {
  constructor(props) {
    super(props);
    const details = props.experienceData
      ? Object.assign({}, props.experienceData)
      : {
          id: "",
          company: "",
          position: "",
          responsibilities: "",
          start: "",
          end: "",
        };

    this.state = {
      showAddSection: false,
      lineEdit: false,
      lineEditId: "",
      newExperiences: details,
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveExperience = this.saveExperience.bind(this);
    this.editExperience = this.editExperience.bind(this);
    this.deleteExperience = this.deleteExperience.bind(this);

    this.renderAdd = this.renderAdd.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
    this.onOpenEdit = this.onOpenEdit.bind(this);
    this.onCloseEdit = this.onCloseEdit.bind(this);
    this.openAdd = this.openAdd.bind(this);
    this.closeAdd = this.closeAdd.bind(this);
  }

  openAdd() {
    this.setState({
      showAddSection: true,
      newExperiences: "",
    });
  }

  closeAdd() {
    this.setState({
      showAddSection: false,
    });
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.newExperiences);
    console.log("Input :", data);
    data[event.target.name] = event.target.value;
    this.setState({
      newExperiences: data,
    });
  }

  onOpenEdit(experience) {
    this.setState({
      lineEditId: experience.id,
      newExperiences: {
        id: experience.id,
        company: experience.company,
        position: experience.position,
        responsibilities: experience.responsibilities,
        start: experience.start,
        end: experience.end,
      },
    });
  }

  onCloseEdit() {
    this.setState({
      lineEditId: "",
    });
  }

  saveExperience() {
    console.log("Saving :", this.state.newExperiences);
    var cookies = Cookies.get("talentAuthToken");
    $.ajax({
      url: "http://localhost:60290/profile/profile/AddExperience",
      headers: {
        Authorization: "Bearer " + cookies,
        "Content-Type": "application/json",
      },
      type: "POST",
      data: JSON.stringify(this.state.newExperiences),
      success: function (res) {
        console.log(res);
        if (res.success == true) {
          this.props.updateProfileData();
          this.closeAdd();
        } else {
          TalentUtil.notification.show(
            "Experience details did not saved successfully",
            "error",
            null,
            null
          );
        }
      }.bind(this),
      error: function (res, a, b) {
        console.log(res);
        console.log(a);
        console.log(b);
      },
    });
  }

  editExperience(experience) {
    experience = this.state.newExperiences;
    console.log("Update :", experience);
    var cookies = Cookies.get("talentAuthToken");
    $.ajax({
      url: "http://localhost:60290/profile/profile/UpdateExperience",
      headers: {
        Authorization: "Bearer " + cookies,
        "Content-Type": "application/json",
      },
      type: "POST",
      data: JSON.stringify(experience),
      success: function (res) {
        if (res.success == true) {
          this.props.updateProfileData();
          this.onCloseEdit();
        } else {
          TalentUtil.notification.show(
            "Experience did not Update successfully",
            "error",
            null,
            null
          );
        }
      }.bind(this),
      error: function (res, a, b) {
        console.log(res);
        console.log(a);
        console.log(b);
      },
    });
  }

  deleteExperience(experience) {
    var cookies = Cookies.get("talentAuthToken");
    $.ajax({
      url: "http://localhost:60290/profile/profile/DeleteExperience",
      headers: {
        Authorization: "Bearer " + cookies,
        "Content-Type": "application/json",
      },
      type: "POST",
      data: JSON.stringify(experience),
      success: function (res) {
        if (res.success == true) {
          this.props.updateProfileData();
        } else {
          TalentUtil.notification.show(
            "Experience did not deleted successfully",
            "error",
            null,
            null
          );
        }
      }.bind(this),
      error: function (res, a, b) {
        console.log(res);
        console.log(a);
        console.log(b);
      },
    });
  }

  render() {
    return this.state.showAddSection ? this.renderAdd() : this.renderDisplay();
  }

  renderAdd() {
    return (
      <React.Fragment>
        <div className="ui equal width grid">
          <div className="ui row">
            <div className="ui eight wide column">
              <ChildSingleInput
                inputType="text"
                label="Company"
                name="company"
                value={this.state.newExperiences.company}
                controlFunc={this.handleChange}
                maxLength={50}
                placeholder="Company"
                errorMessage="Please enter a valid company details"
              />
            </div>
            <div className="ui eight wide column">
              <ChildSingleInput
                inputType="text"
                label="Position"
                name="position"
                value={this.state.newExperiences.position}
                controlFunc={this.handleChange}
                maxLength={50}
                placeholder="Position"
                errorMessage="Please enter a valid position"
              />
            </div>
          </div>

          <div className="ui row">
            <div className="ui eight wide column">
              <input
                type="date"
                name="start"
                placeholder="DD/MM/YYYY"
                // content={this.state.newExperience.start}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui eight wide column">
              <input
                type="date"
                name="end"
                placeholder="DD/MM/YYYY"
                // content={this.state.newExperience.end}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="ui row">
            <div className="ui sixteen wide column">
              <ChildSingleInput
                inputType="text"
                label="Responsibilities"
                name="responsibilities"
                value={this.state.newExperiences.responsibilities}
                controlFunc={this.handleChange}
                maxLength={100}
                placeholder="Responsibilities"
                errorMessage="Please enter a valid responsibilities"
              />
            </div>
          </div>

          <div className="ui row">
            <div className="ui column">
              {this.state.newExperiences ? (
                <button
                  type="button"
                  className="ui teal button"
                  onClick={this.saveExperience}
                >
                  Add
                </button>
              ) : (
                <button
                  disabled
                  type="button"
                  className="ui teal button"
                  onClick={this.saveExperience}
                >
                  Add
                </button>
              )}

              <button className="ui teal button" onClick={this.closeAdd}>
                Cancel
              </button>
            </div>
          </div>
        </div>
        {this.renderDisplay()}
      </React.Fragment>
    );
  }

  renderDisplay() {
    console.log("Experiences :", this.props.ExperienceData);
    return (
      <React.Fragment>
        <div className="row">
          <div className="ui sixteen wide column">
            <table className="ui unstackable table">
              <thead className="">
                <tr className="">
                  <th className="">Company</th>
                  <th className="">Position</th>
                  <th className="">Responsablities</th>
                  <th className="">Start</th>
                  <th className="">End</th>
                  <th className="right aligned">
                    <button
                      type="button"
                      className="ui right floated teal button"
                      onClick={this.openAdd}
                    >
                      <Icon name="plus square outline" />
                      Add New
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {this.props.experienceData.map((experience) =>
                  this.state.lineEditId === experience.id ? (
                    <tr key={experience.id}>
                      <td>
                        <div>
                          <input
                            type="text"
                            name="name"
                            defaultValue={experience.company}
                            onChange={this.handleChange}
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <input
                            type="text"
                            name="name"
                            defaultValue={experience.position}
                            onChange={this.handleChange}
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <input
                            type="text"
                            name="name"
                            defaultValue={experience.responsibilities}
                            onChange={this.handleChange}
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <input
                            type="date"
                            name="start"
                            value={experience.start.split("T")[0]}
                            onChange={this.handleChange}
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <input
                            type="date"
                            name="end"
                            value={experience.end.split("T")[0]}
                            onChange={this.handleChange}
                          />
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="ui blue basic button"
                          onClick={() => this.editExperience(experience)}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="ui red basic button"
                          onClick={this.onCloseEdit}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={experience.id}>
                      <td className="">{experience.company}</td>
                      <td className="">{experience.position}</td>
                      <td className="">{experience.responsibilities}</td>
                      <td className="">
                        {moment(experience.start).format("Do MMM, YYYY")}
                      </td>
                      <td className="">
                        {moment(experience.end).format("Do MMM, YYYY")}
                      </td>
                      <td className="right aligned">
                        <div className="ui small basic buttons">
                          <button
                            type="button"
                            value={experience.id}
                            className="ui icon button"
                            onClick={() => this.onOpenEdit(experience)}
                          >
                            <i aria-hidden="true" className="edit icon"></i>
                          </button>
                          <button
                            type="button"
                            className="ui icon button"
                            onClick={() =>
                              confirm(
                                "Do you really want to Delete this " +
                                  experience.company +
                                  " with your Possition as " +
                                  experience.position +
                                  " Experience?"
                              )
                                ? this.deleteExperience(experience)
                                : null
                            }
                          >
                            <i aria-hidden="true" className="delete icon"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
