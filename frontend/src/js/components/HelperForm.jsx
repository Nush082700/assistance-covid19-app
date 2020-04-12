import React, { Component } from "react";
import axios from "axios";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../actions/actionCreators";
import "./HelpeeForm.scss";
const base =
  process.env.REACT_APP_ENV == "dev" ? "http://localhost:5000/api" : "/api";

class HelperForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      req: {},
      name: "",
      phone: "",
      addr: "",
      error: "",
      helpee: null,
    };
  }
  async componentWillMount() {
    const { req } = this.props.location.state;
    await this.setState({ req: req });
    const helpee = await axios({
      method: "get",
      baseURL: base,
      url: `/user/${req.helpee_id}`,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
    console.log(helpee);
    this.setState({ helpee: helpee });
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = (event) => {
    var hist = this.props.history;
    this.setState({ error: "" });

    var bodyFormData = new FormData();

    bodyFormData.set("helper_id", this.props.user);
    axios({
      method: "post",
      baseURL: base,
      url: `/request/accept/${this.state.req.id}`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        hist.push("/helperSuccess");
        // window.location = "/helperSuccess";
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  render() {
    console.log(this.state);
    const { req, helpee } = this.state;
    return (
      <div class="form-page">
        <form>
          <div class="segment">
            <h1>
              {" "}
              Register to Help {(helpee && helpee.name) || "Helpee"} with{" "}
              {req.short_content}{" "}
            </h1>
          </div>
          <div class="segment">
            <h1> Details: {req.content}</h1>
          </div>
          <div class="segment">
            <h1>
              {" "}
              <a
                href={
                  helpee == null
                    ? "https://maps.google.com"
                    : `https://www.google.com/maps/search/?api=1&query=${helpee.latitude},${helpee.longitude}`
                }
              >
                Click here for directions
              </a>
            </h1>
          </div>

          <button class="red" type="button" onClick={this.handleSubmit}>
            Sign Up
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

function mapStateToProps(state) {
  console.log(state);
  return {
    ...state,
  };
}

export default connect(mapStateToProps, { ...actionCreators })(HelperForm);
