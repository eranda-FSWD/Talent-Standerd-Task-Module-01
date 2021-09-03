import React from "react";
import { Form, Checkbox } from "semantic-ui-react";
import { SingleInput } from "../Form/SingleInput.jsx";

export default class TalentStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      talentStatus: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log("Selected Status :", event.target.value);
    this.setState({
      talentStatus: event.target.value,
    });
    this.props.saveProfileData({
      jobSeekingStatus: {
        status: event.target.value,
        AvailableDate: null,
      },
    });
  }

  render() {
    const selctedvalue = this.props.status.status
      ? this.props.status.status
      : this.state.talentStatus;
    return (
      <React.Fragment>
        <form class="ui form">
          <div class="field">
            <b>Current Status</b>
          </div>
          <div class="field">
            <div class="ui radio checkbox">
              <input
                type="radio"
                id="1"
                value="Actively looking for a job"
                checked={
                  selctedvalue === "Actively looking for a job" ? true : false
                }
                onChange={this.handleChange}
              />
              <label for="1">Actively looking for a job</label>
            </div>
          </div>

          <div class="field">
            <div class="ui radio checkbox">
              <input
                type="radio"
                id="2"
                value="Not looking for a job at the moment"
                checked={
                  selctedvalue === "Not looking for a job at the moment"
                    ? true
                    : false
                }
                onChange={this.handleChange}
              />
              <label for="2">Not looking for a job at the moment</label>
            </div>
          </div>

          <div class="field">
            <div class="ui radio checkbox">
              <input
                type="radio"
                id="3"
                value="Currently employed but open for offers"
                checked={
                  selctedvalue === "Currently employed but open for offers"
                    ? true
                    : false
                }
                onChange={this.handleChange}
              />
              <label for="3">Currently employed but open for offers</label>
            </div>
          </div>

          <div class="field">
            <div class="ui radio checkbox">
              <input
                type="radio"
                id="4"
                value="Will be available for later date"
                checked={
                  selctedvalue === "Will be available for later date"
                    ? true
                    : false
                }
                onChange={this.handleChange}
              />
              <label for="4">Will be available for later date</label>
            </div>
          </div>
          <br />
        </form>
      </React.Fragment>
    );
  }
}
