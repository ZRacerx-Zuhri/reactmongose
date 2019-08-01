import React, { Component } from "react";
import axios from "../config/axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Home extends Component {
  state = {
    tasks: []
  };

  addTask = userid => {
    const description = this.task.value;

    // Post task baru
    axios
      .post("/tasks/" + userid, {
        description
      })
      .then(() => {
        // Get tasks
        axios.get("/tasks/" + this.props.id).then(res => {
          this.setState({ tasks: res.data });
        });
      });
  };

  componentDidMount() {
    // Get Tasks
    axios.get("/tasks/" + this.props.id).then(res => {
      this.setState({ tasks: res.data });
    });
  }

  renderTasks = () => {
    return this.state.tasks.map(item => {
      if (!item.completed) {
        return (
          <li className="list-group-item d-flex justify-content-between">
            <span>{item.description}</span>
            <span>
              <button
                className="btn btn-outline-primary"
                onClick={() => this.Edittask(item)}
              >
                Done
              </button>
            </span>
          </li>
        );
      }

      return (
        <li className="list-group-item d-flex justify-content-between">
          <span>{item.description}</span>
          <span>Selesai</span>
        </li>
      );
    });
  };

  render() {
    // Jika user sudah login
    if (this.props.id) {
      return (
        <div className="container">
          <h1 className="display-4 text-center animated bounce delay-1s">
            List Tasks
          </h1>
          <form className="form-group mt-5">
            <input
              type="text"
              className="form-control"
              placeholder="What do you want to do ?"
              ref={input => (this.task = input)}
            />
          </form>
          <button
            type="submit"
            className="btn btn-block btn-primary mt-3"
            onClick={() => this.addTask(this.props.id)}
          >
            Up !
          </button>

          <ul className="list-group list-group-flush mb-5">
            {this.renderTasks()}
          </ul>
        </div>
      );
    }

    return <Redirect to="/login" />;
  }
}

const mps = state => {
  return {
    id: state.auth.id
  };
};

export default connect(mps)(Home);
