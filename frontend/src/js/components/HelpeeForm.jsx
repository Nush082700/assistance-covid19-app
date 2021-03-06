import React, { Component } from "react";
import axios from "axios";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import "./HelpeeForm.scss";

class RequireAssistanceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helpeeName: "",
      helpeeAddr: "",
      helpeePhone: "",
      helpeeRequest: "",
      error: "",
      pin: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log("the error is here1");
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ ...this.state, [name]: value });
    console.log("the error is here2");
  };

  handleSubmit = event => {
    var hist = this.props.history;
    this.setState({ error: "" });
    console.log("the error is here3");

    if (
      !this.state.helpeeAddr ||
      !this.state.helpeeName ||
      !this.state.helpeePhone ||
      !this.state.helpeeRequest ||
      !this.state.pin
    ) {
      this.setState({
        error: "Error: Field Empty: Please fill all Fields"
      });

      return;
    }
    if (this.state.helpeePhone.length != 10) {
      this.setState({
        error: "Please enter a valid 10 digit phone number"
      });
      return;
    }
    if (this.state.pin.length != 6) {
      console.log("pin");
      this.setState({
        error: "Please enter a valid 6 digit pin code"
      });
      return;
    }
    // for (let i = 0; i != 10; i++) {
    // 	if (
    // 		!(
    // 			this.state.helpeePhone[i] > 31 &&
    // 			(this.state.helpeePhone[i] < 48 ||
    // 				this.state.helpeePhone[i] > 57)
    // 		)
    // 	)
    // 		this.setState({
    // 			error: 'Please enter a valid 10 digit phone number'
    // 		});
    // 	console.log(i);

    // 	return;
    // }
    this.setState({ error: "" });
    console.log("here4");
    var bodyFormData = new FormData();
    console.log("the error is here bodyFormData");
    bodyFormData.set("name_help", this.state.helpeeName);
    console.log("the error is here name_help");
    bodyFormData.set("address_help", this.state.helpeeAddr);
    console.log("the error is here address_help");
    bodyFormData.set("phone_help", this.state.helpeePhone);
    console.log("the error is here phone_help");
    bodyFormData.set("content", this.state.helpeeRequest);
    bodyFormData.set("pincode", this.state.pin);
    axios({
      method: "post",
      url: "/",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(function(response) {
        //handle success
        console.log(response);
        // this.props.history.push('/');
        // window.location = '/';
        // window.location = "/helpeeSuccess";
        hist.push("/helpeeSuccess");
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });
  };

  render() {
    return (
      <div class="home-page">
        <form>
          <div class="segment">
            <h1>Sign up to request Assistance</h1>
          </div>
          <label>
            <input
              type="text"
              placeholder="Name"
              value={this.state.helpeeName}
              name="helpeeName"
              onChange={this.handleChange}
            />
          </label>
          <label>
            <textarea
              // type='password'
              type="text"
              placeholder="Address"
              value={this.state.helpeeAddr}
              name="helpeeAddr"
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              // type='password'
              type="text"
              placeholder="Phone Number"
              value={this.state.helpeePhone}
              name="helpeePhone"
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              // type='password'
              type="nubers"
              placeholder="Pin Code"
              value={this.state.pin}
              name="pin"
              onChange={this.handleChange}
            />
          </label>
          <label>
            <textarea
              // type='password'
              placeholder="You need help with ..."
              value={this.state.helpeeRequest}
              name="helpeeRequest"
              onChange={this.handleChange}
            />
          </label>
          <button class="red" type="button" onClick={this.handleSubmit}>
            Sign Up
          </button>
          {this.state.error && (
            <div class="card-container">
              <h3 class="error"> {this.state.error}</h3>
            </div>
          )}

          {/* <div class='segment'>
						<button class='unit' type='button'>
							<i class='icon ion-md-arrow-back'></i>
						</button>
						<button class='unit' type='button'>
							<i class='icon ion-md-bookmark'></i>
						</button>
						<button class='unit' type='button'>
							<i class='icon ion-md-settings'></i>
						</button>
					</div> */}

          {/* <div class='input-group'>
						<label>
							<input type='text' placeholder='Email Address' />
						</label>
						<button class='unit' type='button'>
							<i class='icon ion-md-search'></i>
						</button>
					</div> */}
        </form>
      </div>
    );
  }
}

export default RequireAssistanceForm;
