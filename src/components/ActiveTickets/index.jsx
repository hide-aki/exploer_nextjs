import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import fetch from "isomorphic-unfetch";
import FusionTable from "../FusionTable";
import TimeAgo from "../TimeAgo";

export default function ActiveTickets({ miner }) {
  const [state, setState] = useState({ tickets: [] });
  const tableOptions = {
    search: false,
    pageSize: 5,
    toolbar: false,
    pageSizeOptions: [5, 10, 20]
  };
  useEffect(() => {
    fetch(`http://localhost:8888/api/address/${miner}/tickets`)
      .then(res => res.json())
      .then(res => res.data)
      .catch(e => [])
      .then(tickets => {
        setState({
          tickets
        });
      });
  }, [miner]);

  return (
    <FusionTable
      data={state.tickets}
      columns={columns}
      options={tableOptions}
    />
  );
}

ActiveTickets.propTypes = {
  miner: PropTypes.string
};

const columns = [
  {
    field: "startTime",
    title: "Start Time",
    render: row => (
      <span className="tk-start">
        <TimeAgo time={row.startTime * 1000} />
      </span>
    )
  },
  {
    field: "expireTime",
    title: "Expire Time",
    sorting: false,
    render: row => (
      <span className="tk-end">
        <TimeAgo time={row.expireTime * 1000} />
      </span>
    )
  },
  {
    field: "value",
    title: "Value",
    sorting: false,
    render: row => <span className="tk-value">{row.value}</span>
  }
];
