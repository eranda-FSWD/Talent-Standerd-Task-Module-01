import React from "react";
import Cookies from "js-cookie";
import { default as countries } from "../../../../util/jsonFiles/countries.json";
import { default as nationalities } from "../../../../util/jsonFiles/nationalities.json";
import { ChildSingleInput } from "../Form/SingleInput.jsx";

export class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditSection: false,
      newAddress: {
        city: "",
        country: "",
        number: "",
        postCode: 0,
        street: "",
        suburb: "",
      },
    };
    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveNewAddress = this.saveNewAddress.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
  }

  openEdit() {
    const addressData = Object.assign({}, this.props.addressData);
    this.setState({
      showEditSection: true,
      newAddress: addressData,
    });
  }

  closeEdit() {
    this.setState({
      showEditSection: false,
    });
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.newAddress);
    data[event.target.name] = event.target.value;
    this.setState({
      newAddress: data,
    });
  }

  saveNewAddress() {
    const data = Object.assign({}, this.state.newAddress);
    console.log("Address Data", data);
    this.props.saveProfileData({
      address: {
        city: data.city,
        country: data.country,
        number: data.number,
        postCode: data.postCode,
        street: data.street,
        suburb: data.suburb,
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
    let cityOptionsList = [];
    const selectedCountry = this.state.newAddress.country;
    const selectedCity = this.state.newAddress.city;

    let countriesOptions = Object.keys(countries).map((x) => (
      <option key={x} value={x}>
        {x}
      </option>
    ));

    if (selectedCountry != "" && selectedCountry != null) {
      var cityOptions = countries[selectedCountry].map((x) => (
        <option key={x} value={x}>
          {" "}
          {x}
        </option>
      ));

      cityOptionsList = (
        <select
          className="ui dropdown"
          placeholder="City"
          label="Select City"
          value={selectedCity}
          onChange={this.handleChange}
          name="city"
        >
          <option value="0"> Select a town or city</option>
          {cityOptions}
        </select>
      );
    }

    return (
      <React.Fragment>
        <div className="ui equal width grid">
          <div className="ui row">
            <div className="ui column">
              <ChildSingleInput
                inputType="text"
                label="Number"
                name="number"
                value={this.state.newAddress.number}
                controlFunc={this.handleChange}
                maxLength={5}
                placeholder="Enter your Street/Flat Number"
                errorMessage="Please enter a valid House Number"
              />
            </div>
            <div className="ui eight wide column">
              <ChildSingleInput
                inputType="text"
                label="Street"
                name="street"
                value={this.state.newAddress.street}
                controlFunc={this.handleChange}
                maxLength={30}
                placeholder="Enter your Street Name"
                errorMessage="Please enter a valid Street Name"
              />
            </div>
            <div className="ui column">
              <ChildSingleInput
                inputType="text"
                label="Suburb"
                name="suburb"
                value={this.state.newAddress.suburb}
                controlFunc={this.handleChange}
                maxLength={20}
                placeholder="Enter your Suburb Name"
                errorMessage="Please enter a valid Suberb Name"
              />
            </div>
          </div>
          <div className="ui row">
            <div className="ui column">
              <h5>Country</h5>
              <select
                className="ui right labeled dropdown"
                label="Select Country"
                placeholder="Country"
                value={selectedCountry}
                onChange={this.handleChange}
                name="country"
              >
                <option value="">Select a country</option>
                {countriesOptions}
              </select>
            </div>
            <div className="ui column">
              <h5>City</h5>
              {cityOptionsList}
            </div>
            <div className="ui column">
              <ChildSingleInput
                inputType="number"
                label="Post Code"
                name="postCode"
                value={this.state.newAddress.postCode}
                controlFunc={this.handleChange}
                maxLength={8}
                placeholder="Enter your Post Code"
                errorMessage="Please enter a valid Post Code"
              />
            </div>
          </div>
        </div>
        <div className="ui row">
          <div className="ui column">
            <button
              type="button"
              className="ui teal button"
              onClick={this.saveNewAddress}
            >
              Save
            </button>
            <button
              type="button"
              className="ui button"
              onClick={this.closeEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderDisplay() {
    let address = this.props.addressData
      ? `${this.props.addressData.number}, ${this.props.addressData.street}, ${this.props.addressData.suburb}, ${this.props.addressData.postCode}`
      : "";
    let city = this.props.addressData ? this.props.addressData.city : "";
    let country = this.props.addressData ? this.props.addressData.country : "";

    return (
      <div className="row">
        <div className="ui sixteen wide column">
          <React.Fragment>
            <p>Address: {address}</p>
            <p>City: {city}</p>
            <p>Country: {country}</p>
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

export class Nationality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNationality: this.props.nationalityData,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.newNationality);
    data["nationality"] = event.target.value;
    console.log("Selected Nationality :", data);
    this.setState({
      newNationality: data,
    });
    this.props.saveProfileData(data);
  }

  render() {
    let selectedNationality = this.props.nationalityData;
    let nationalityOptions = [];
    nationalityOptions = Object.values(nationalities).map((x) => (
      <option key={x} value={x}>
        {x}
      </option>
    ));
    return (
      <div className="row">
        <div className="ui six wide column">
          <select
            className="ui right labeled dropdown"
            label="Select Nationality"
            value={selectedNationality}
            onChange={this.handleChange}
            name="nationality"
          >
            <option value="">Select your Nationality</option>
            {nationalityOptions}
          </select>
        </div>
      </div>
    );
  }
}
