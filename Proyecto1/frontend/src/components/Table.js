import React from 'react';
import "./tableStyles.css"

const Table = ({ data, header }) => {
  return (
    <div>
      <h3>Lista de Procesos</h3>
      <table>
        <thead>
          <tr>
            {header.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.PID}>
              <td>{row.PID}</td>
              <td>{row.Nombre}</td>
              <td>{row.UID}</td>
              <td>{row.Status}</td>
              <td>{row.Size}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;