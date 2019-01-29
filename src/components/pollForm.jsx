import React, { Component } from "react";
import Input from "./common/input";
import { savePoll } from "../services/pollService";

class PollForm extends Component {
  state = {
    data: {
      title: "",
      options: []
    },
    errors: {}
  };

  handleSubmit = e => {
    e.preventDefault();
    this.doSubmit();
  };

  doSubmit = async () => {
    await savePoll(this.state.data);

    this.props.history.push("/polls");
  };

  handleTitleChange = e => {
    const data = { ...this.state.data };
    data["title"] = e.target.value;
    this.setState({ data });
  };

  handleOptionChange = e => {
    const data = { ...this.state.data };
    const temp = e.target.value.split(",");

    let options_arr = [];

    for (let i of temp) {
      let obj = {};
      obj["option_text"] = i;
      obj["votes"] = 0;
      console.log(obj);
      options_arr.push(obj);
    }
    console.log(options_arr);

    data["options"] = options_arr;
    this.setState({ data });
  };

  render() {
    return (
      <div>
        <h1>Poll Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="title"
            value={this.state.data.title}
            label="Title"
            error={this.state.errors.title}
            onChange={this.handleTitleChange}
            required
          />
          <Input
            type="text"
            name="options"
            value={this.state.data.options}
            label="Options"
            error={this.state.errors.options}
            onChange={this.handleOptionChange}
            required
          />
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}

export default PollForm;
