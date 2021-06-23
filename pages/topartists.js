import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react"; 
import Artist from '../components/Artist';
import { ListGroup, Spinner, Tab, Tabs } from 'react-bootstrap';
import NavComponent from '../components/Nav';

export default function TopArtists() {
  
  const [topArtistsShort, setTopArtistsShort] = useState([]);
  const [topArtistsMedium, setTopArtistsMedium] = useState([]);
  const [topArtistsLong, setTopArtistsLong] = useState([]);

  async function loadTopArtistsShort(){
    const time_range = 
    {
      short_term: "short_term",
      medium_term: "medium_term",
      long_term: "long_term"
    }
    const url = window.location.protocol + "//" + window.location.host + '/api/api_topArtists?time_range=' + time_range.short_term;
    const response = await fetch(url);
    switch(response.status){
      case 200:
        const data = await response.json();
        setTopArtistsShort(data);
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
    async function loadTopArtistsMedium(){
      const time_range = 
      {
        short_term: "short_term",
        medium_term: "medium_term",
        long_term: "long_term"
      }
      const url = window.location.protocol + "//" + window.location.host + '/api/api_topArtists?time_range=' + time_range.medium_term;
      const response = await fetch(url);
      switch(response.status){
        case 200:
          const data = await response.json();
          setTopArtistsMedium(data.items);
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
      async function loadTopArtistsLong(){
        const time_range = 
        {
          short_term: "short_term",
          medium_term: "medium_term",
          long_term: "long_term"
        }
        const url = window.location.protocol + "//" + window.location.host + '/api/api_topArtists?time_range=' + time_range.long_term;
        const response = await fetch(url);
        switch(response.status){
          case 200:
            const data = await response.json();
            setTopArtistsLong(data.items);
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
    loadTopArtistsShort();
    loadTopArtistsMedium();
    loadTopArtistsLong();
  }, [])
  return (
    <>
    <NavComponent></NavComponent>
    <div className={styles.container}>
      <Head>
        <title>SpotifyStats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <br></br>
      {topArtistsShort.items ? (
        <>
        <h4>Your top artists</h4>
        <br></br>
      <Tabs defaultActiveKey="short" id="uncontrolled-tab-example">
        <Tab eventKey="short" title="Short">
        <br></br>
          <ListGroup>
            {
            topArtistsShort.items.map((a) => (
              <Artist
              id = {a.id}
              rank ={a.rank}
              name = {a.name}
              imageurl = {a.images[0].url}
              ></Artist>
            ))
           }
          
      </ListGroup>
        </Tab>
        <Tab eventKey="medium" title="Medium">
        <br></br>
          <ListGroup>
            {
            topArtistsMedium.map((a) => (
              <Artist
              id = {a.id}
              rank ={a.rank}
              name = {a.name}
              imageurl = {a.images[0].url}
              ></Artist>
            ))
            }
          
      </ListGroup>
        </Tab>
        <Tab eventKey="long" title="Long">
        <br></br>
          <ListGroup>
            {
            topArtistsLong.map((a) => (
              <Artist
              id = {a.id}
              rank ={a.rank}
              name = {a.name}
              imageurl = {a.images[0].url}
              ></Artist>
            ))}
          
          
      </ListGroup>
        </Tab>
        
       
      </Tabs>
      </>
      ) : (
        <div className={styles.container}>
      <Spinner animation="border" />
      </div>
      )}
     



    </div>
    </>
  )
}
