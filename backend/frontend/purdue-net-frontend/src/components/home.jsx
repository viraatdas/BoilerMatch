import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

class Home extends Component {
  state = {
    loading: true,
    loggedIn: false
  };

  componentDidMount() {
    // Token processing
    let token = localStorage.getItem("jwtToken");
    if (token) {
      console.log("token", token);
      const decoded = jwt_decode(token);
      console.log("decoded? ", decoded);
      if (decoded) {
        this.setState({ loading: false, loggedIn: true });
      } else {
        this.setState({ loading: false, loggedIn: false });
      }
    } else {
      this.setState({ loading: false, loggedIn: false });
    }
  }

  render() {
    console.log(this.state);
    if (!this.state.loggedIn && !this.state.loading) {
      return <Redirect to="/login" />;
    }
    return <p>Home Page</p>;
  }
}

export default Home;
