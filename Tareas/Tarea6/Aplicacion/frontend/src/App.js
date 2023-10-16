import './App.css';
import React, { useState, useEffect } from 'react';
import socket from './socket/socket';

function App() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    socket.emit("keyRedis", "albums");
    socket.on("keyRedis", (album) => {
      const albumsString = JSON.stringify(album);
      const albumsArray = JSON.parse(albumsString);

      //const albumObject = JSON.parse(albumsString);
      setAlbums(albumsArray)
    }
    )

  }, []);


    return (
      <div className="App">
      
        <div className="table-container">
          <h2>Lista de Álbumes</h2>
          <table className="album-table">
            <thead>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Artista</th>
                <th scope="col">Año</th>
              </tr>
            </thead>
            <tbody>
              {albums.map((album, index) => {
                const albumObject = JSON.parse(album);
                return (
                  <tr key={index}>
                    <td>{albumObject.name}</td>
                    <td>{albumObject.artist}</td>
                    <td>{albumObject.year}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
                  </div>
                </div>
              );
  }

export default App;
