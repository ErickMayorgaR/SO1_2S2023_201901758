import React from 'react';


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
              <tr key={row.pid}>
                <td>{row.pid}</td>
                <td>{row.nombre}</td>
                <td>{row.usuario}</td>
                <td>{row.estado}</td>
                <td>{row.ram}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default Table;