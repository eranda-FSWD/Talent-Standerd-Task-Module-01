import React, { Fragment } from "react";
import moment from "moment";
import { SingleInput } from "../Form/SingleInput.jsx";

export default class VisaStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visaStatus: "",
      visaExpiryDate: "",
      // openVisaExpiory: this.props.visaExpiryDate === "" ? false : true,
    };
    this.handleVisaChange = this.handleVisaChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.saveVisaStatus = this.saveVisaStatus.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.visaStatus) {
      this.setState({
        visaStatus: props.visaStatus,
        visaExpiryDate: props.visaExpiryDate,
      });
    }
  }

  handleVisaChange(event) {
    let value = event.target.value;
    if (value != "Work Visa" || value != "Student Visa") {
      console.log("Input Visa Values: ", event.target.value);
      this.setState(
        {
          visaStatus: event.target.value,
          visaExpiryDate: "",
        },
        this.saveVisaStatus
      );
    }
  }

  handleDateChange(event) {
    console.log("Input Date Values: ", event.target.value);
    this.setState({
      visaExpiryDate: event.target.value,
    });
  }

  saveVisaStatus() {
    let data = {};
    data["visaStatus"] = this.state.visaStatus;
    data["visaExpiryDate"] = this.state.visaExpiryDate;
    console.log("Saving Date :", data);
    this.props.saveProfileData(data);
    this.setState({
      openVisaExpiory: false,
      visaStatus: "",
      visaExpiryDate: "",
    });
    // this.props.updateProfileData();
  }
  render() {
    return (
      <div className="row">
        <div className="ui five wide column">
          <select
            className="ui right labeled dropdown"
            name="visa"
            value={this.state.visaStatus}
            onChange={this.handleVisaChange}
          >
            <option value="Citizen">Citizen</option>
            <option value="Permanent Resident">Permanent Resident</option>
            <option value="Work Visa">Work Visa</option>
            <option value="Student Visa">Student Visa</option>
          </select>
        </div>

        {this.state.visaStatus &&
        this.state.visaStatus != "Citizen" &&
        this.state.visaStatus != "Permanent Resident" ? (
          <Fragment>
            <div className="ui five wide column">
              <input
                type="date"
                name="visaExpiry"
                // content={visaDate.split("T")[0]}
                defaultValue={this.state.visaExpiryDate.split("T")[0]}
                onChange={this.handleDateChange}
                //min={moment().format("YYYY-MM-DD")}
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
