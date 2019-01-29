import React, { Component } from "react";
import { PieChart } from "react-easy-chart";
import { getPoll, saveVote } from "../services/pollService";

class Vote extends Component {
  state = {
    data: {
      title: "",
      options: []
    }
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    const res = await getPoll(id);
    const data = res.data;
    this.setState({ data });
  }

  handleVote = async () => {
    const newOptions = this.state.data["options"].filter(o => {
      return o.id === parseInt(this.refs.vote.value, 10);
    });
    newOptions[0].votes = 1;
    var data = { ...this.state.data };
    data.options = newOptions;
    const res = await saveVote(data.id, data);
    const newData = res.data;
    this.setState({ data: newData });
  };

  render() {
    let pieData = this.state.data.options.map(o => {
      return { key: o.option_text, value: o.votes };
    });
    console.log(pieData);
    return (
      <React.Fragment>
        <h1>{this.state.data.title}</h1>
        <h3>Vote</h3>

        <div className="form-group">
          <label htmlFor="voteSelect">Select</label>
          <select ref="vote" className="form-control" id="voteSelect">
            {this.state.data.options.map(o => {
              const o_value = o.id;
              const o_name = o.option_text;
              return (
                <option key={o_value} value={o_value}>
                  {o_name}
                </option>
              );
            })}
          </select>
          <button onClick={this.handleVote} className="btn btn-primary">
            Submit
          </button>
        </div>
        <div className="container">
          <PieChart
            labels
            size={400}
            data={pieData}
            styles={{
              ".chart_text": {
                fontSize: "1em",
                fill: "#fff"
              }
            }}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Vote;
