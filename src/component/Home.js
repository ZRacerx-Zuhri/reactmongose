import React, { Component } from "react";
import axios from "../config/axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Home extends Component {
  state = {
    task: [],
    taskcompleted: false
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
        this.get();
      });
  };

  get = () => {
    axios.get("/tasks/" + this.props.id).then(res => {
      this.setState({ task: res.data });
    });
  };

  componentWillMount() {
    axios.get(`/tasks/${this.props.id}`).then(res => {
      this.setState({ task: res.data });
    });
  }

  Edittask = val => {
    axios
      .patch(`/tasks/${this.props.id}/${val}`, {
        completed: true
      })
      .then(() => {
        axios.get(`/tasks/${this.props.id}`).then(res => {
          this.setState({ task: res.data });
        });
      });
  };

  Cancel = val => {
    axios
      .patch(`/tasks/${this.props.id}/${val}`, {
        completed: false
      })
      .then(() => {
        axios.get(`/tasks/${this.props.id}`).then(res => {
          this.setState({ task: res.data });
        });
      });
  };
  Deletetask = val => {
    axios.delete(`/tasks/${val}`).then(() => {
      this.get();
    });
  };

  rendelist = () => {
    return this.state.task.map(val => {
      if (!val.completed) {
        return (
          <li className="list-group-item d-flex justify-content-between">
            <span>{val.description}</span>

            <span>
              <button
                className="btn btn-outline-primary"
                onClick={() => this.Edittask(val._id)}
              >
                Done
              </button>
              <button
                className="btn btn-outline-danger ml-2"
                onClick={() => this.Deletetask(val._id)}
              >
                Delete
              </button>
            </span>
          </li>
        );
      }
      return (
        <li className="list-group-item d-flex justify-content-between">
          <span>{val.description}</span>

          <span>
            <button className="btn btn-outline-success">Selesai</button>
            <button
              className="btn btn-outline-primary ml-2"
              onClick={() => this.Cancel(val._id)}
            >
              Cancel
            </button>
          </span>
        </li>
      );
    });
  };

  render() {
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
            {this.rendelist()}
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
