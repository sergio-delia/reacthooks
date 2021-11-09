import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const photosUrl = 'https://jsonplaceholder.typicode.com/photos';
  const albumUrl = 'https://jsonplaceholder.typicode.com/albums';
  const userUrl = 'https://jsonplaceholder.typicode.com/users';
  const [photos, setPhotos] = useState([])

  const [albums, setAlbums] = useState([])

  const [users, setUsers] = useState([])

  const [userSelected, setUserSelected] = useState(1)

  const [albumSelected, setAlbumSelected] = useState(1)

  useEffect(() => {

    const getPhotos = async () => {
      const url = albumSelected ? photosUrl + '?albumId='+ albumSelected : photosUrl;

      const photo = await fetch(url).then(res => res.json());
      setPhotos(photo);
    }
    if(albumSelected){
      getPhotos();
    }
    
    return () => {

    }
  }, [albumSelected])


  /* USE EFFECT PER ALBUMBS */
  useEffect(() => {

    const getAlbums = async () => {

      const url = albumUrl ? albumUrl + '?userId='+ userSelected : albumUrl;

      const albums = await fetch(url).then(res => res.json());
      setAlbums(albums);
    }

    getAlbums();
    return () => {

    }
  }, [userSelected])


  useEffect(() => {

    const getUsers = async () => {
      const users = await fetch(userUrl).then(res => res.json());
      setUsers(users);
    }

    getUsers();
    return () => {

    }
  }, [])


  function manageChangeUser(e){
    const {target} = e;
    setUserSelected(target.value);
    console.log(userSelected);
  }

  function manageChangeAlbum(e){
    const {target} = e;
    setAlbumSelected(target.value);
    console.log(albumSelected);
  }


  const Opt = ({id, name, userId, title}) => {

    const selectedOpt = id == (userId? albumSelected : userSelected) ? 'selected' : null;

    const optName = userId? title : name;

    return(
      <option selected={selectedOpt} value={id} key={id}>
                  {optName}
                </option>
    );
  }

  return (
    <div className="App">
      <h1>Albums</h1>
      <form className="gallery">
        <div>

          <label htmlFor="users">USERS

            <select name="users" id="users" onChange={manageChangeUser}>
              <option>SELECT</option>
              {
                users.map(a => <Opt {...a} />)
              }
            </select>

          </label>
        </div>
        <div className="form-group">
          <label htmlFor="albums">ALBUMS

            <select name="albums" id="albums" onChange={manageChangeAlbum}>
              <option>SELECT</option>
              {
                albums.map(a => <Opt {...a} />)
              }
            </select>

          </label>



        </div>
      </form>
      <ul className="photos">
        {
          photos.map(photo => <li key={photo.id} >
            <img src={photo.url} alt={photo.title} />
          </li>)
        }
      </ul>
    </div>
  );
}

export default App;
