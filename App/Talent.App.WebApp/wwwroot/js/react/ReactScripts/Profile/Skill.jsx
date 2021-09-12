/* Skill section */
import React, { Fragment } from "react";
import Cookies from "js-cookie";
import { Icon } from "semantic-ui-react";

export default class Skill extends React.Component {
  constructor(props) {
    super(props);
    const details = props.skillData
      ? Object.assign({}, props.skillData)
      : {
          id: "",
          name: "",
          level: "",
        };

    this.state = {
      showAddSection: false,
      lineEdit: false,
      lineEditId: "",
      newSkills: details,
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveSkill = this.saveSkill.bind(this);
    this.editSkill = this.editSkill.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);

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
      newSkills: "",
    });
  }

  closeAdd() {
    this.setState({
      showAddSection: false,
    });
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.newSkills);
    console.log("Input :", data);
    data[event.target.name] = event.target.value;
    this.setState({
      newSkills: data,
    });
  }

  onOpenEdit(skill) {
    this.setState({
      lineEditId: skill.id,
      newSkills: {
        id: skill.id,
        name: skill.name,
        level: skill.level,
      },
    });
  }

  onCloseEdit() {
    this.setState({
      lineEditId: "",
    });
  }

  saveSkill() {
    console.log("Saving :", this.state.newSkills);
    var cookies = Cookies.get("talentAuthToken");
    $.ajax({
      url: "https://talent-standerd-module-01-pro.azurewebsites.net/profile/profile/AddSkill",
      headers: {
        Authorization: "Bearer " + cookies,
        "Content-Type": "application/json",
      },
      type: "POST",
      data: JSON.stringify(this.state.newSkills),
      success: function (res) {
        console.log(res);
        if (res.success == true) {
          this.props.updateProfileData();
          this.props.update();
          this.closeAdd();
        } else {
          TalentUtil.notification.show(
            "Skill details did not saved successfully",
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

  editSkill(skill) {
    skill = this.state.newSkills;
    console.log("Update :", skill);
    var cookies = Cookies.get("talentAuthToken");
    $.ajax({
      url: "https://talent-standerd-module-01-pro.azurewebsites.net/profile/profile/UpdateSkill",
      headers: {
        Authorization: "Bearer " + cookies,
        "Content-Type": "application/json",
      },
      type: "POST",
      data: JSON.stringify(skill),
      success: function (res) {
        if (res.success == true) {
          this.props.updateProfileData();
          this.props.update();
          this.onCloseEdit();
        } else {
          TalentUtil.notification.show(
            "Skill did not Update successfully",
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

  deleteSkill(skill) {
    var cookies = Cookies.get("talentAuthToken");
    $.ajax({
      url: "https://talent-standerd-module-01-pro.azurewebsites.net/profile/profile/DeleteSkill",
      headers: {
        Authorization: "Bearer " + cookies,
        "Content-Type": "application/json",
      },
      type: "POST",
      data: JSON.stringify(skill),
      success: function (res) {
        if (res.success == true) {
          this.props.updateProfileData();
          this.props.update();
        } else {
          TalentUtil.notification.show(
            "Skill did not deleted successfully",
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
          <div className="row">
            <div className="ui column">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Add Skill"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="ui column">
              <div>
                <select required name="level" onChange={this.handleChange}>
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Fluent">Expert</option>
                </select>
              </div>
            </div>
            {this.state.newSkills ? (
              <button
                type="button"
                className="ui black button"
                onClick={this.saveSkill}
              >
                Add
              </button>
            ) : (
              <button
                disabled
                type="button"
                className="ui black button"
                onClick={this.saveSkill}
              >
                Add
              </button>
            )}

            <button className="ui button" onClick={this.closeAdd}>
              Cancel
            </button>
          </div>
        </div>
        {this.renderDisplay()}
      </React.Fragment>
    );
  }

  renderDisplay() {
    console.log("Skills :", this.props.skillData);
    return (
      <React.Fragment>
        <div className="row">
          <div className="ui sixteen wide column">
            <table className="ui unstackable table">
              <thead className="">
                <tr className="">
                  <th className="">Skill</th>
                  <th className="">Level</th>
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
                {this.props.skillData.map((skill) =>
                  this.state.lineEditId === skill.id ? (
                    <tr key={skill.id}>
                      <td>
                        <div>
                          <input
                            type="text"
                            name="name"
                            defaultValue={skill.name}
                            onChange={this.handleChange}
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <select
                            name="level"
                            defaultValue={skill.level}
                            onChange={this.handleChange}
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Fluent">Expert</option>
                          </select>
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="ui blue basic button"
                          onClick={() => this.editSkill(skill)}
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
                    <tr key={skill.id}>
                      <td className="">{skill.name}</td>
                      <td className="">{skill.level}</td>
                      <td className="right aligned">
                        <div className="ui small basic buttons">
                          <button
                            type="button"
                            value={skill.id}
                            className="ui icon button"
                            onClick={() => this.onOpenEdit(skill)}
                          >
                            <i aria-hidden="true" className="edit icon"></i>
                          </button>
                          <button
                            type="button"
                            className="ui icon button"
                            onClick={() =>
                              confirm(
                                "Do you really want to Delete this " +
                                  skill.name +
                                  " Skill?"
                              )
                                ? this.deleteSkill(skill)
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
