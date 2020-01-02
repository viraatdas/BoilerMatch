import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

class Home extends Component {
  state = {
    loggedIn: false
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
  }

  render() {
    if (!this.state.loggedIn) {
      return <Redirect to="/login" />;
    }
    return <p>Home Page</p>;
  }
}

export default Home;
