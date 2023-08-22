import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa axios

function App() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');

  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    let headers = new Headers();

    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers: headers  "proxy":"https://10.0.2.2:8080"   mode: 'no-cors',
      // credentials: 'include',
      // method: 'GET',

    fetch('http://localhost:8080/api/getMusic' )
      .then(response => {
        if(!response.ok) {
          throw new Error(`HttpError: ${response.status}, ${response.statusText}`);
        }else{
          return response.json()
        }
      })
      .then(data => setAlbums(data))
      .catch(error => console.error('Error fetching albums:', error));
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const albumData = {
      Titulo: title,
      Artista: artist,
      AnioLanzamiento: releaseYear,
      Genero: genre
    };

    axios.post('http://localhost:8080/api/insertMusic', albumData) // Reemplaza con la URL de tu API
      .then(response => {
        // Realiza alguna acción después de guardar, si es necesario
        console.log('Álbum guardado con éxito:', response.data);

        // Limpia los valores de los campos del formulario
        setTitle('');
        setArtist('');
        setReleaseYear('');
        setGenre('');
      })
      .catch(error => {
        console.error('Error guardando el álbum:', error);
      });


    setTitle('');
    setArtist('');
    setReleaseYear('');
    setGenre('');
  };
  return (
    <div className="App">
  <div>
    <h2>Ingresar Nuevo Álbum</h2>
    <form className="album-form" onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Artista:
        <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
      </label>
      <label>
        Año de Lanzamiento:
        <input type="text" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
      </label>
      <label>
        Género Musical:
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
      </label>
      <button type="submit">Guardar</button>
    </form>
  </div>

  <div className="table-container">
    <h2>Lista de Álbumes</h2>
    <table className="album-table">
      <thead>
        <tr>
          <th scope="col">Título</th>
          <th scope="col">Artista</th>
          <th scope="col">Año</th>
          <th scope="col">Género</th>
        </tr>
      </thead>
      <tbody>
        {albums.map((album, index) => (
          <tr key={index}>
            <td>{album.titulo}</td>
            <td>{album.artista}</td>
            <td>{album.anioLanzamiento}</td>
            <td>{album.genero}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
}

export default App;
