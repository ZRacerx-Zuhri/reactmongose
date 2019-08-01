import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import Header from "./Header";
import Profile from "./Profile";
import { keepLogin } from "../actions";
import { connect } from "react-redux";
import cookies from "universal-cookie";
import Editprofile from "./Editprofile";
const cookie = new cookies();

class App extends Component {
  componentWillMount() {
    var user = cookie.get("dataUser");

    // User pada cookie di temukan
    if (user) {
      // Kirim id dan name ke redux
      this.props.keepLogin(user);
    } //else {
    //   cookie.remove("dataUser");
    // }
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/editprofile" component={Editprofile} />
      </BrowserRouter>
    );
  }
}

const mps = state => {
  return {
    id: state.auth.id,
    name: state.auth.name
  };
};

export default connect(
  mps,
  { keepLogin }
)(App);
