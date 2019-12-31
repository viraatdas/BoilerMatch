import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    loggedIn: false,
    error: ""
  };

  componentDidMount() {
    let token = localStorage.getItem("jwtToken");
    if (token) {
      console.log("token", token);
      const decoded = jwt_decode(token);
      if (decoded) {
        this.setState({ loggedIn: true });
      }
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = async event => {
    // event.preventDefault();
    // this.setState({ loading: true });
    // let userData = { email: this.state.email, password: this.state.password };
    // try {
    //   const res = await axios.post("/api/login", userData);
    //   // Save to localStorage
    //   // Set token to localStorage
    //   const { token } = res.data;
    //   localStorage.setItem("jwtToken", token);
    //   this.setState({ loading: false, loggedIn: true });
    // } catch (err) {
    //   console.log("Incorrect login: " + err);
    //   this.setState({ loading: false, error: "Login Failed" });
    // }
  };

  render() {
    // if (this.state.loggedIn === true) {
    //   return <Redirect to="/" />;
    // }

    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="card form-card mx-auto">
            <h3 className="form-title text-center">Purdue Network Login</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={this.state.email}
                  placeholder="Email"
                  onChange={this.handleChange("email")}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  value={this.state.password}
                  id="password"
                  placeholder="Password"
                  onChange={this.handleChange("password")}
                />
              </div>
              <div className="row">
                <div className="col">
                  <button type="submit" className="btn btn-outline-primary">
                    Login
                  </button>
                </div>
                <div className="col text-center">
                  <p className="text-right form-bottom-text">
                    <Link className="form-bottom-text" to="/register">
                      Create Account
                    </Link>
                  </p>
                </div>
              </div>
            </form>
            {this.state.error && (
              <div className="alert alert-primary form-alert" role="alert">
                {this.state.error}
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
