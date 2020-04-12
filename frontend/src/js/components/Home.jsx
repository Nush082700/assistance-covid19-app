import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actionCreators from "../actions/actionCreators";
import "./HelpeeForm.scss";

const base =
  process.env.REACT_APP_ENV == "dev" ? "http://localhost:5000/api" : "/api";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getRequests(this.props.user ? parseInt(this.props.user) : null);
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ ...this.state, [name]: value });
  };
  handleClick = (event) => {
    if (this.props.user) {
      this.props.logout();
      this.props.history.push("/");
    } else {
      this.props.history.push("/login");
    }
  };

  render() {
    const userId = this.props.user;
    if (this.props.redirect && this.props.redirect != "/") {
      const redirect = this.props.redirect;
      this.props.routingFinished();
      return <Redirect exact from="/signUp" to={redirect} />;
    }
    return (
      <div class="home-page">
        <div class="card-container">
          <button
            onClick={this.handleClick}
            style={{ visibility: "hidden", margin: 20 }}
          >
            {this.props.user ? `Logout ${this.props.name}` : "Login/Sign Up"}
          </button>
          <div
            style={{
              flexGrow: 1,
              padding: 10,
              alignSelf: "center",
              justifySelf: "center",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <h1>WE NEED A NAME</h1>
          </div>
          <button onClick={this.handleClick} style={{ margin: 20 }}>
            {this.props.user ? `Logout ${this.props.name}` : "Login/Sign Up"}
          </button>
        </div>
        <div class="card-container">
          <button
            onClick={() =>
              this.props.user
                ? this.props.history.push("/helpeeForm")
                : this.props.history.push("/login")
            }
            style={{ visibility: "hidden", margin: 20 }}
          >
            {this.props.user
              ? `Request Assistance`
              : "Login to Request Assistance"}
          </button>
          <div
            style={{
              flexGrow: 1,
              padding: 10,
              alignSelf: "center",
              justifySelf: "center",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <h1 class="need">Requests for Assistance</h1>
          </div>
          <button
            onClick={() =>
              this.props.user
                ? this.props.history.push("/helpeeForm")
                : this.props.history.push("/login")
            }
            style={{ margin: 20 }}
          >
            {this.props.user
              ? `Request Assistance`
              : "Login to Request Assistance"}
          </button>
        </div>
        <div class="card-container" style={{ flexGrow: 1 }}>
          {(this.props.currentRequests || [])
            .filter((req) => req.helper_id == 0)
            .slice(0, 20).length ? (
            (this.props.currentRequests || [])
              .filter((req) => req.helper_id == 0)
              .slice(0, 20)
              .map((req) => {
                return <NeedResponseCard req={req} user={this.props.user} />;
              })
          ) : (
            <h1>None yet.</h1>
          )}
        </div>
        <div class="card-container">
          <div
            style={{
              flexGrow: 1,
              padding: 10,
              alignSelf: "center",
              justifySelf: "center",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <h1 class="got">Success Stories</h1>
          </div>
        </div>
        <div class="card-container" style={{ flexGrow: 1 }}>
          {(this.props.currentRequests || [])
            .filter((req) => req.helper_id !== 0)
            .slice(0, 20).length ? (
            (this.props.currentRequests || [])
              .filter((req) => req.helper_id !== 0)
              .slice(0, 20)
              .map((req) => {
                return <GotResponseCard req={req} user={this.props.user} />;
              })
          ) : (
            <h1>None yet.</h1>
          )}{" "}
        </div>
      </div>
    );
  }
}

const NeedResponseCard = (props) => {
  return (
    <Link
      to={
        props.user
          ? {
              pathname: "/helperForm",
              state: {
                req: props.req,
              },
            }
          : {
              pathname: "/login",
              state: {
                req: props.req,
              },
            }
      }
      style={{ textDecoration: "none" }}
    >
      <button class="card-need" type="button">
        <h3>
          {" "}
          Help with <b>{props.req.short_content}</b>
        </h3>
      </button>
    </Link>
  );
};

const GotResponseCard = (props) => {
  return (
    <button class="card-got" type="button">
      <h3>
        {" "}
        Helped with <b>{props.req.short_content}</b>
      </h3>
    </button>
  );
};

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps, { ...actionCreators })(Home);
