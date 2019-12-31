import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    loading: false,
    error: "",
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
    // event.preventDefault();
    // this.setState({ loading: true });
    // if (this.state.password != this.state.password2) {
    //   this.setState({ loading: false, msg: "Passwords don't match" });
    // } else {
    //   let userData = {
    //     name: this.state.name,
    //     email: this.state.email,
    //     password: this.state.password
    //   };
    //   console.log(userData);
    //   try {
    //     const res = await axios.post("/api/register", userData);
    //     this.setState({ loading: false, msg: "Success" });
    //   } catch (err) {
    //     console.log(err);
    //     this.setState({ loading: false, msg: "Registration Failed." });
    //   }
    // }
  };

  render() {
    // if (this.state.msg == "Success") {
    //   return <Redirect to="/login" />;
    // }
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="card form-card mx-auto">
            <h3 className="text-center form-title">Create New Account</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <div className="col">
                  {/* <label>First Name</label> */}
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="First Name"
                    value={this.state.name}
                    onChange={this.handleChange("name")}
                  />
                </div>
                <div className="col">
                  {/* <label>Last Name</label> */}
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Last Name"
                    value={this.state.name}
                    onChange={this.handleChange("name")}
                  />
                </div>
              </div>
              <div className="form-group">
                {/* <label>Email address</label> */}
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your @purdue.edu email"
                  value={this.state.email}
                  onChange={this.handleChange("email")}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <select className="form-control" id="gradYear">
                  {this.state.yearList.map(year => (
                    <option>{year}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                {/* <label>Password</label> */}
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange("password")}
                />
              </div>
              <div className="form-group">
                {/* <label className="form-label">Confirm Password</label> */}
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  placeholder="Confirm Password"
                  value={this.state.password2}
                  onChange={this.handleChange("password2")}
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
              <div class="alert alert-primary form-alert" role="alert">
                {this.state.error}
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
