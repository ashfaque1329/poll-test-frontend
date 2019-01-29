import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";

class PollsTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: poll => <Link to={`/polls/${poll.id}`}>{poll.title}</Link>
    }
  ];

  deleteColumn = {
    key: "delete",
    content: poll => (
      <button
        onClick={() => this.props.onDelete(poll)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    console.log(user);
    if (user) this.columns.push(this.deleteColumn);
  }

  render() {
    const { polls, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={polls}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default PollsTable;
