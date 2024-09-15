import React from 'react';
import { CSVLink } from 'react-csv';

const TableExport = ({columns, filename }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((Header) => (
              <th>{Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {columns.map((accessor) => (
            <tr >
              {columns.map((accessor) => (
                <td>{accessor}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <CSVLink headers={columns} filename={filename}>
        Export to CSV
      </CSVLink>
    </div>
  );
};

export default TableExport;
