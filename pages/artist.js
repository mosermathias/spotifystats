import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react"; 

export default function Artist() {
  
  const [Artist, setArtist] = useState([]);
  const [ArtistImg, setArtistImg] = useState([]);

  const loadArtist = async() =>{
    const artist_id = "3TVXtAsR1Inumwj472S9r4";
    const url = 'http://localhost:3000/api/artist/' + artist_id;
    const response = await fetch(url);
    switch(response.status){
      case 200:
        const data = await response.json();
        setArtist(data);
        setArtistImg(data.images[2].url);
        break;
      case 401:
        window.location.replace('/api/login');
        break;
      case 403:
        window.location.replace('/error');
        break;
      default:
        window.location.replace('/error');
        break;
    }   
    }
  

  useEffect(() => {
    loadArtist();
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>SpotifyStats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul className="list-group">
     <li>{Artist.name}</li>
     <li>{Artist.genres}</li>
     <img src={ArtistImg}></img>
    </ul>




      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
