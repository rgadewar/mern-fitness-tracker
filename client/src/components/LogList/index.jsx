import React from 'react';
import { Table } from 'reactstrap';

const LogList = ({ logs }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Date</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => (
          <tr key={index}>
            <td>{log.date}</td>
            <td>{log.value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default LogList;
