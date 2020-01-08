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
      if (decoded) {
        this.setState({ loading: false, loggedIn: true });
      } else {
        this.setState({ loading: false, loggedIn: false });
      }
    } else {
      this.setState({ loading: false, loggedIn: false });
    }
  }

  logout = e => {
    if (this.state.loggedIn) {
      e.preventDefault();
      localStorage.removeItem("jwtToken");
      this.setState({ loading: false, loggedIn: false });
    }
  };

  render() {
    console.log(this.state);
    if (!this.state.loggedIn && !this.state.loading) {
      return <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        <p>Home Page</p>
        <button onClick={this.logout} className="btn btn-outline-primary">
          Logout
        </button>
      </React.Fragment>
    );
  }
}

export default Home;
