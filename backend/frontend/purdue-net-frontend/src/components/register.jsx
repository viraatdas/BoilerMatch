import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    gradYear: "Graduation Year",
    password: "",
    password2: "",
    loading: false,
    error: false,
    msg: "",
    yearList: []
  };

  componentDidMount() {
    // Token processing
    let token = localStorage.getItem("jwtToken");
    if (token) {
      console.log("token", token);
      console.log(token);
      const decoded = jwt_decode(token);
      if (decoded) {
        this.setState({ loggedIn: true });
      }
    }

    // Calculate list of graduation years
    let currYear = new Date().getFullYear();
    let temp = [];
    for (let year = currYear - 60; year < currYear + 11; year++) {
      temp.push(year);
    }
    this.setState({ yearList: temp });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    // Check if password and confirm password fields match
    if (this.state.password !== this.state.password2) {
      this.setState({
        loading: false,
        error: true,
        msg: "Passwords don't match"
      });
      return;
    }

    // Check if email is @purdue.edu or @alumni.purdue.edu
    if (!/.+@(?:(purdue)|(alumni\.purdue))\.edu/.test(this.state.email)) {
      this.setState({
        loading: false,
        error: true,
        msg: "Please enter a Purdue University affiliated email"
      });
      return;
    }

    // Check if graduation year has been filled
    if (this.state.gradYear === "Graduation Year") {
      this.setState({
        loading: false,
        error: true,
        msg: "Please enter your year of graduation"
      });
      return;
    }

    // Send API request
    let userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      graduationYear: this.state.gradYear,
      email: this.state.email,
      password: this.state.password
    };
    console.log(userData);
    try {
      const res = await axios.post("/api/register", userData);
      this.setState({ loading: false, error: false, msg: "Success" });
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false,
        error: true,
        msg: "Registration Failed."
      });
    }
  };

  render() {
    if (this.state.msg === "Success") {
      return <Redirect to="/login" />;
    }

    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="card form-card mx-auto">
            <h3 className="text-center form-title">Create New Account</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.handleChange("firstName")}
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleChange("lastName")}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your @purdue.edu or @alumni.purdue.edu email"
                  value={this.state.email}
                  onChange={this.handleChange("email")}
                  required
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  id="gradYear"
                  value={this.state.gradYear}
                  onChange={this.handleChange("gradYear")}
                  required
                >
                  <option selected disabled hidden>
                    Graduation Year
                  </option>
                  {this.state.yearList.map((year, i) => (
                    <option key={i}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange("password")}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  placeholder="Confirm Password"
                  value={this.state.password2}
                  onChange={this.handleChange("password2")}
                  required
                />
              </div>
              <div className="row">
                <div className="col">
                  <button type="submit" className="btn btn-outline-primary">
                    Create Account
                  </button>
                </div>
                <div className="col text-center">
                  <p className="text-right form-bottom-text">
                    <Link className="form-bottom-text" to="/login">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
            {this.state.error && (
              <div className="alert alert-danger form-alert" role="alert">
                {this.state.msg}
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
