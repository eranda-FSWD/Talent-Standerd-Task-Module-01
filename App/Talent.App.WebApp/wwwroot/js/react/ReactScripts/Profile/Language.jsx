/* Language section */
import React, { Fragment } from "react";
import Cookies from "js-cookie";
import { Button, Dropdown, Icon } from "semantic-ui-react";

export default class Language extends React.Component {
  constructor(props) {
    super(props);
    const details = props.languageData
      ? Object.assign({}, props.languageData)
      : {
          id: "",
          Language: "",
          LanguageLevel: "",
        };

    this.state = {
      showAddSection: false,
      lineEdit: false,
      lineEditId: "",
      newlanguage: details,
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveLanguage = this.saveLanguage.bind(this);
    this.editLanguage = this.editLanguage.bind(this);
    this.deleteLanguage = this.deleteLanguage.bind(this);

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
      newlanguage: "",
    });
  }

  closeAdd() {
    this.setState({
      showAddSection: false,
    });
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.newlanguage);
    data[event.target.name] = event.target.value;
    this.setState({
      newlanguage: data,
    });
  }

  onOpenEdit(lag) {
    this.setState({
      lineEditId: lag.id,
      newlanguage: {
        id: lag.id,
        Language: lag.language,
        LanguageLevel: lag.languageLevel,
      },
    });
  }

  onCloseEdit() {
    this.setState({
      lineEditId: "",
    });
  }

  saveLanguage() {
    var cookies = Cookies.get("talentAuthToken");
    $.ajax({
      url: "http://localhost:60290/profile/profile/AddLanguage",
      headers: {
        Authorization: "Bearer " + cookies,
        "Content-Type": "application/json",
      },
      type: "POST",
      data: JSON.stringify(this.state.newlanguage),
      success: function (res) {
        console.log(res);
        if (res.success == true) {
          this.props.updateProfileData();
          this.closeAdd();
        } else {
          TalentUtil.notification.show(
            "Language details did not saved successfully",
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

  editLanguage(language) {
    language = this.state.newlanguage;
    var cookies = Cookies.get("talentAuthToken");
    $.ajax({
      url: "http://localhost:60290/profile/profile/UpdateLanguage",
      headers: {
        Authorization: "Bearer " + cookies,
        "Content-Type": "application/json",
      },
      type: "POST",
      data: JSON.stringify(language),
      success: function (res) {
        if (res.success == true) {
          this.props.updateProfileData();
          this.onCloseEdit();
        } else {
          TalentUtil.notification.show(
            "Language did not Update successfully",
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

  deleteLanguage(language) {
    var cookies = Cookies.get("talentAuthToken");
    $.ajax({
      url: "http://localhost:60290/profile/profile/DeleteLanguage",
      headers: {
        Authorization: "Bearer " + cookies,
        "Content-Type": "application/json",
      },
      type: "POST",
      data: JSON.stringify(language),
      success: function (res) {
        if (res.success == true) {
          this.props.updateProfileData();
        } else {
          TalentUtil.notification.show(
            "Language did not deleted successfully",
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
                  name="Language"
                  placeholder="Add Language"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="ui column">
              <div>
                <select
                  required
                  name="LanguageLevel"
                  onChange={this.handleChange}
                >
                  <option value="">Select Level</option>
                  <option value="Basic">Basic</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Native/Bilingual">Native/Bilingual</option>
                </select>
              </div>
            </div>
            {this.state.newlanguage ? (
              <button
                type="button"
                className="ui black button"
                onClick={this.saveLanguage}
              >
                Add
              </button>
            ) : (
              <button
                disabled
                type="button"
                className="ui black button"
                onClick={this.saveLanguage}
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
    return (
      <React.Fragment>
        <div className="row">
          <div className="ui sixteen wide column">
            <table className="ui unstackable table">
              <thead className="">
                <tr className="">
                  <th className="">Language</th>
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
                {this.props.languageData.map((lag) =>
                  this.state.lineEditId === lag.id ? (
                    <tr key={lag.id}>
                      <td>
                        <div>
                          <input
                            type="text"
                            name="Language"
                            defaultValue={lag.language}
                            onChange={this.handleChange}
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <select
                            name="LanguageLevel"
                            defaultValue={lag.languageLevel}
                            onChange={this.handleChange}
                          >
                            <option value="Basic">Basic</option>
                            <option value="Conversational">
                              Conversational
                            </option>
                            <option value="Fluent">Fluent</option>
                            <option value="Native/Bilingual">
                              Native/Bilingual
                            </option>
                          </select>
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="ui blue basic button"
                          onClick={() => this.editLanguage(lag)}
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
                    <tr key={lag.id}>
                      <td className="">{lag.language}</td>
                      <td className="">{lag.languageLevel}</td>
                      <td className="right aligned">
                        <div className="ui small basic buttons">
                          <button
                            type="button"
                            value={lag.id}
                            className="ui icon button"
                            onClick={() => this.onOpenEdit(lag)}
                          >
                            <i aria-hidden="true" className="edit icon"></i>
                          </button>
                          <button
                            type="button"
                            className="ui icon button"
                            onClick={() =>
                              confirm(
                                "Do you really want to Delete this " +
                                  lag.language +
                                  " Language?"
                              )
                                ? this.deleteLanguage(lag)
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
