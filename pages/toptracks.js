import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react"; 
import Track from '../components/Track';
import { ListGroup, Spinner, Tab, Tabs } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import NavComponent from '../components/Nav';


export default function TopTracks() {
  
  const [topTracksShort, setTopTracksShort] = useState([]);
  const [topTracksMedium, setTopTracksMedium] = useState([]);
  const [topTracksLong, setTopTracksLong] = useState([]);
  const [isLiked, setIsLiked] = useState([]);
  const loadTopTracksShort = async() =>{
    const time_range = 
    {
      short_term: "short_term",
      medium_term: "medium_term",
      long_term: "long_term"
    }
    const url = window.location.protocol + "//" + window.location.host + '/api/api_topTracks?time_range=' + time_range.short_term;
    const response = await fetch(url);
    alert(response.status);
    switch(response.status){
      case 200:
        const data = await response.json();
        setTopTracksShort(data);
        data.items.forEach(e => {
          //alert(e.id);
          //checkIsLiked(e.id);
        });
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
  };
  const loadTopTracksMedium = async() =>{
    const time_range = 
    {
      short_term: "short_term",
      medium_term: "medium_term",
      long_term: "long_term"
    }
    const url = window.location.protocol + "//" + window.location.host + '/api/api_topTracks?time_range=' + time_range.medium_term;
    const response = await fetch(url);
    switch(response.status){
      case 200:
        const data = await response.json();
        setTopTracksMedium(data);
        data.items.forEach(e => {
          //alert(e.id);
          //checkIsLiked(e.id);
        });
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
  };
  const loadTopTracksLong = async() =>{
    const time_range = 
    {
      short_term: "short_term",
      medium_term: "medium_term",
      long_term: "long_term"
    }
    const url = window.location.protocol + "//" + window.location.host + '/api/api_topTracks?time_range=' + time_range.long_term;
    const response = await fetch(url);
    switch(response.status){
      case 200:
        const data = await response.json();
        setTopTracksLong(data.items);
        data.items.forEach(e => {
          //alert(e.id);
          //checkIsLiked(e.id);
        });
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
  };
async function checkIsLiked(id){
  const url = window.location.protocol + "//" + window.location.host + '/api/api_isliked?id=' + id;
  const response = await fetch(url);
  const data = await response.json();
  switch(response.status){
    case 200:
      //alert(data);
      const element = 
      {
        id: id,
        isLiked: data
      };
      const elements = [...isLiked, element];
      
      setIsLiked(elements);
      //alert(JSON.stringify(elements));
      //alert(JSON.stringify(isLiked));
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
};

  useEffect(() => {
    //loadTopTracksShort();
    loadTopTracksMedium();
    //loadTopTracksLong();
    
  }, [])
  return (
    <>

    <NavComponent></NavComponent>
    <br></br>
    {topTracksMedium.items ? (
      
    <div className={styles.container}>
      <h4>Your top Tracks</h4>
      <br></br>
      <Head>
        <title>SpotifyStats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Tabs defaultActiveKey="short">
      
        <Tab eventKey="short" title="4 weeks">
          <br></br>
        <ListGroup>
     
      {topTracksShort.items.map((m) => (
        <Track
        rank = {m.rank}
        id = {m.id}
        name = {m.name}
        coverurl = {m.album.images[2].url}
        artists = {m.artists.map((a) =>(
          a.name + " "
        ))}
        
        ></Track>
        
      ))}
     
       
      </ListGroup>
        </Tab>
        
        <Tab eventKey="medium" title="6 months">
        <br></br>
        <ListGroup>
      {
      topTracksMedium.items.map((m) => (
        <Track
        rank = {m.rank}
        id = {m.id}
        name = {m.name}
        coverurl = {m.album.images[2].url}
        artists = {m.artists.map((a) =>(
          a.name + " "
        ))}
        
        ></Track>
        
      ))
    
    }
      
      </ListGroup>
        </Tab>
        <Tab eventKey="long" title="all time">
        <br></br>
        <ListGroup>
      
      {topTracksLong.map((m) => (
        <Track
        rank = {m.rank}
        id = {m.id}
        name = {m.name}
        coverurl = {m.album.images[2].url}
        artists = {m.artists.map((a) =>(
          a.name + " "
        ))}
        
        ></Track>
        
      ))})
      
      </ListGroup>
        </Tab>
      </Tabs>
      
     



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
    ):(
      <>
      <div className={styles.container}>
      <Spinner animation="border" />
      </div>
      </>
    )
    }
    </>
    
  )
    }
