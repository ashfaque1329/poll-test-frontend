import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PollsTable from "./pollsTable";
import Pagination from "./common/pagination";
import { getPolls, deletePoll } from "../services/pollService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Polls extends Component {
  state = {
    polls: [],
    currentPage: 1,
    pageSize: 3,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data: polls } = await getPolls();
    console.log(polls);
    this.setState({ polls });
  }

  handleDelete = async poll => {
    const originalPolls = this.state.polls;
    const polls = originalPolls.filter(p => p.id !== poll.id);
    console.log(polls);
    this.setState({ polls });
    console.log(poll);

    try {
      await deletePoll(poll.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This poll has already been deleted.");

      this.setState({ polls: originalPolls });
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      polls: allPolls
    } = this.state;

    let filtered = allPolls;

    if (searchQuery)
      filtered = allPolls.filter(polls =>
        polls.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const polls = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: polls };
  };

  render() {
    //const { length: count } = this.state.polls;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    //if (count === 0) return <p>There are no polls in the database.</p>;

    const { totalCount, data: polls } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          {user && (
            <Link
              to="/polls/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Poll
            </Link>
          )}
          <p>Showing {totalCount} polls in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <PollsTable
            polls={polls}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Polls;
