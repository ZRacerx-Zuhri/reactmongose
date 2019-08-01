import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../config/axios";
import { Jumbotron } from "reactstrap";

class Profile extends Component {
  state = {
    data: undefined
  };

  componentDidMount() {
    // Get Profile
    axios.get(`/User/${this.props.id}`).then(res => {
      this.setState({ data: res.data });
    });
  }

  render() {
    if (!this.props.id) {
      return <h1>Loading User Not Found Please Login</h1>;
    }
    return (
      <div className="container mt-5">
        <Jumbotron>
          <img
            alt="Please choose your avatar"
            src={`http://localhost:2019/User/avatar/${this.props.id}`}
            key={new Date()}
          />
          <h1 className="display-3">Hello,{this.props.name} !</h1>
          <p className="lead" />
        </Jumbotron>
      </div>
    );
  }
}

const mps = state => {
  return {
    id: state.auth.id,
    name: state.auth.name
  };
};

export default connect(mps)(Profile);
