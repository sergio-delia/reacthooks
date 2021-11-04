import { useState } from 'react';
import './App.css';

function App() {
  const API = 'https://jsonplaceholder.typicode.com/photos';
  const [photos, setPhotos] = useState([])
  
  return (
    <div className="App">
      <h1>Albums</h1>
      <ul>
      {
        photos.map(photo => <li key={photo.id}>
          <img src={photo.url} alt={photo.title} />
        </li>)
      }
      </ul>
      {API}
    </div>
  );
}

export default App;
