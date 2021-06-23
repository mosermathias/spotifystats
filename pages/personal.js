import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react"; 

export default function Song() {
  
  const [personal, setPersonal] = useState([]);

  const loadSong = async() =>{
    const song_id = "3IvMYBE7A3c7to1aEcfFJk";
    const url = 'http://localhost:3000/api/api_personal';
    const response = await fetch(url);
    switch(response.status){
      case 200:
        const data = await response.json();
        setPersonal(data);
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
    loadSong();
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>SpotifyStats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      {personal.images ? (
         <ul className="list-group">
             <li>
                 {personal.display_name}
             </li>
             <li>{personal.country}</li>
             <li>{personal.email}</li>
             <li>{personal.external_urls.spotify}</li>
             <li>Follower: {personal.followers.total}</li>
             <li>Image: {personal.images[0].url}</li>
             <li>abo: {personal.product}</li>
             <li>type: {personal.type}</li>
             <li>explicit_content.filter_enabled: {personal.explicit_content.filter_enabled.toString()}</li>
             <li>explicit_content.filter_locked :{personal.explicit_content.filter_locked.toString()}</li>
             </ul>
) : (
    <h1>Loading</h1>
  )}
        
    




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
