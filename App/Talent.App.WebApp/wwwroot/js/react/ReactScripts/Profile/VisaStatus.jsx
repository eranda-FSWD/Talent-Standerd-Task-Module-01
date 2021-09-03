import React, { Fragment } from "react";
import moment from "moment";
import { SingleInput } from "../Form/SingleInput.jsx";

export default class VisaStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visaStatus: "",
      visaExpiryDate: "",
      openVisaExpiory: this.props.visaExpiryDate === "" ? false : true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveVisaStatus = this.saveVisaStatus.bind(this);
  }

  handleChange(event) {
    console.log("Input Values: ", event.target.value);

    if (event.target.name === "visaStatus") {
      if (event.target.value === "Student Visa") {
        this.setState({
          visaStatus: event.target.value,
          openVisaExpiory: true,
        });
      } else if (event.target.value == "Work Visa") {
        this.setState({
          visaStatus: event.target.value,
          openVisaExpiory: true,
        });
      } else {
        this.setState({
          visaStatus: event.target.value,
          visaExpiryDate: "",
          openVisaExpiory: false,
        });
        this.saveVisaStatus();
      }
    } else {
      this.setState({
        visaExpiryDate: event.target.value,
      });
    }
  }

  saveVisaStatus() {
    let data = {};
    data["visaStatus"] = this.state.visaStatus;
    data["visaExpiryDate"] = this.state.visaExpiryDate;
    console.log("Saving Date :", data);
    this.props.saveProfileData(data);

    this.setState({
      openVisaExpiory: false,
    });
  }
  render() {
    let visa = this.props.visaStatus;
    let visaDate = this.props.visaExpiryDate;

    return (
      <div className="row">
        <div className="ui five wide column">
          <select
            className="ui right labeled dropdown"
            name="visaStatus"
            value={visa}
            onChange={this.handleChange}
          >
            <option value="Citizen">Citizen</option>
            <option value="Permanent Resident">Permanent Resident</option>
            <option value="Work Visa">Work Visa</option>
            <option value="Student Visa">Student Visa</option>
          </select>
        </div>

        {this.state.openVisaExpiory ||
        visa === "Student Visa" ||
        visa === "Work Visa" ? (
          <Fragment>
            <div className="ui five wide column">
              <input
                type="date"
                name="visaExpiry"
                // content={visaDate.split("T")[0]}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui two wide column">
              <button
                type="button"
                className="ui right floated teal button"
                onClick={this.saveVisaStatus}
              >
                Save
              </button>
            </div>
          </Fragment>
        ) : null}
      </div>
    );
  }
}
