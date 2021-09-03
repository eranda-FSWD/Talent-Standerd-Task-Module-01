/* Social media JSX */
import React from "react";
import { ChildSingleInput } from "../Form/SingleInput.jsx";
import { Popup, Button, Icon } from "semantic-ui-react";

export default class SocialMediaLinkedAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditSection: false,
      newlinkedAccounts: { linkedIn: "", github: "" },
    };
    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveLinkedAccounts = this.saveLinkedAccounts.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
  }

  openEdit() {
    const linkedAccounts = Object.assign({}, this.props.linkedAccounts);
    this.setState({
      showEditSection: true,
      newlinkedAccounts: linkedAccounts,
    });
  }

  closeEdit() {
    this.setState({
      showEditSection: false,
    });
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.newlinkedAccounts);
    data[event.target.name] = event.target.value;
    this.setState({
      newlinkedAccounts: data,
    });
  }

  saveLinkedAccounts() {
    const data = Object.assign({}, this.state.newlinkedAccounts);
    console.log("Linked Account", data);
    this.props.saveProfileData({
      linkedAccounts: {
        linkedIn: data.linkedIn,
        github: data.github,
      },
    });
    this.closeEdit();
  }

  render() {
    return this.state.showEditSection
      ? this.renderEdit()
      : this.renderDisplay();
  }

  renderEdit() {
    return (
      <div className="ui sixteen wide column">
        <ChildSingleInput
          inputType="text"
          label="LinkedIn"
          name="linkedIn"
          value={this.state.newlinkedAccounts.linkedIn}
          controlFunc={this.handleChange}
          maxLength={80}
          placeholder="Enter your LinkedIn Profile URL"
          errorMessage="Please enter a valid LinkedIn Profile URL"
        />
        <ChildSingleInput
          inputType="text"
          label="GitHub"
          name="github"
          value={this.state.newlinkedAccounts.github}
          controlFunc={this.handleChange}
          maxLength={80}
          placeholder="Enter your GitHub Profile URL"
          errorMessage="Please enter a valid GitHub Profile URL"
        />
        <button
          type="button"
          className="ui teal button"
          onClick={this.saveLinkedAccounts}
        >
          Save
        </button>
        <button type="button" className="ui button" onClick={this.closeEdit}>
          Cancel
        </button>
      </div>
    );
  }

  renderDisplay() {
    let linkedIn = this.props.linkedAccounts
      ? `${this.props.linkedAccounts.linkedIn}`
      : "https://www.linkedin.com/";
    let github = this.props.linkedAccounts
      ? `${this.props.linkedAccounts.github}`
      : "https://www.github.com/";

    return (
      <div className="row">
        <div className="ui sixteen wide column">
          <React.Fragment>
            <Button
              href={linkedIn}
              target="_blank"
              disabled={this.props.linkedAccounts.linkedIn.length === 0}
              color="linkedin"
            >
              <Icon name="linkedin" /> LinkedIn
            </Button>

            <Button
              href={github}
              target="_blank"
              disabled={this.props.linkedAccounts.github.length === 0}
              color="black"
            >
              <Icon name="github" /> GitHub
            </Button>
          </React.Fragment>
          <button
            type="button"
            className="ui right floated teal button"
            onClick={this.openEdit}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }
}
