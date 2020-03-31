import React, { Component } from "react";
import axios from "axios";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import "./HelpeeForm.scss";

export default class PreHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      req: {},
      pin: "",
      error: ""
    };
  }
  componentWillMount() {
    const { req } = this.props.location.state;
    this.setState({ req: req });
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = event => {
    var hist = this.props.history;
    this.setState({ error: "" });

    if (!this.state.pin) {
      this.setState({
        error: "Error: Field Empty: Please fill in the Pincode"
      });

      return;
    }
    var bodyFormData = new FormData();
    bodyFormData.set("pincode", this.state.pin);
    //     bodyFormData.set("address_helper", this.state.addr);
    //     bodyFormData.set("phone_helper", this.state.phone);
    // bodyFormData.set('content', this.state.helpeeRequest);
    axios({
      method: "post",
      url: `/requests/all`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(function(response) {
        //handle success
        console.log(response);
        hist.push("/home");
        // window.location = "/helperSuccess";
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });
  };

  render() {
    const { req } = this.state;
    return (
      <div class="form-page">
        {/* <h1>
					{' '}
					Register to Help {req.name} with {req.content} at{' '}
					{req.address_help}. Phone Number: {req.phone_help}
				</h1> */}
        <form>
          <div class="segment">
            <h1> Enter Pin to Get Started</h1>
          </div>

          <label>
            <input
              type="text"
              placeholder="Pincode"
              value={this.state.pin}
              name="pin"
              onChange={this.handleChange}
            />
          </label>
          {/* <label>
            <textarea
              // type='password'
              type="text"
              placeholder="Address"
              value={this.state.helpeeAddr}
              name="addr"
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              // type='password'
              type="text"
              placeholder="Phone Number"
              value={this.state.helpeePhone}
              name="phone"
              onChange={this.handleChange}
            />
          </label> */}
          <button class="red" type="button" onClick={this.handleSubmit}>
            Get Started
          </button>
          {this.state.error && (
            <div class="card-container">
              <h3 class="error"> {this.state.error}</h3>
            </div>
          )}
        </form>
      </div>
    );
  }
}
