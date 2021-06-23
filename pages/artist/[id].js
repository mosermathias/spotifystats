import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useEffect, useState } from "react"; 
import { useRouter } from 'next/router';
import { Accordion, Badge, Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Avatar } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Bar} from 'react-chartjs-2';
import * as Vibrant from 'node-vibrant'
import { BarChart } from '@material-ui/icons';
import parse from 'html-react-parser';
import { ListGroup } from 'react-bootstrap';
import Track from '../../components/Track';
import Artist from '../../components/Artist';
import Album from '../../components/Album';
import NavComponent from '../../components/Nav';


export async function getServerSideProps(ctx) {
  const id = ctx.query.id;
  console.log(ctx);
  return {
    props: {id}, // will be passed to the page component as props
  };
}


export default function Artists({id}) {
    
    var src = '';

   
    const [artist, setArtist] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [relatedArtists, setRelatedArtists] = useState([]);
    const [audiofeatures, setAudioFeatures] = useState([]);
    const [color1, setColor1] = useState([]);
    const [color2, setColor2] = useState([]);

    const pitch = ["0", "C", "C♯, D♭", "D", "D♯, E♭", "E", "F", "F♯, G♭", "G", "G♯, A♭", "A", "A♯, B♭", "B"];
    const modes = ["minor, moll", "major, dur"];

    const artist_id = id;
    var h = "";
    var songVar = "";
    var delayed;

    function displayFeatures(){
      var artists = songVar.artists;
      var t = false;
      var g = "";
      artists.forEach(a => {
        if(t){
          g += "<br><span>" + a.name + "</span>";
        }
        else{
          g += "<strong>" + a.name + "</strong>";
        }
        
        t = true;
      });
      setFeatures(g);
    }
    
    const loadAudioFeatures = async() =>{
      const url = window.location.protocol + "//" + window.location.host + '/api/song/audio_features?id=' + artist_id;
      const response = await fetch(url);
      switch(response.status){
        case 200:
          const data = await response.json();
          setAudioFeatures(data);
          //alert(data.album.images[0].url);
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
    const loadArtist = async() =>{
      const url = window.location.protocol + "//" + window.location.host + '/api/artist/' + artist_id;
      const response = await fetch(url);
      switch(response.status){
        case 200:
          const data = await response.json();
          setArtist(data);
          src = data.images[0].url;
          getColors();
          //songVar = data;
          //displayFeatures();
          //alert(data.album.images[0].url);
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
    const getTopTracks = async() =>{
      const url = window.location.protocol + "//" + window.location.host + '/api/artist/top-tracks?id=' + artist_id;
      const response = await fetch(url);
      switch(response.status){
        case 200:
          const data = await response.json();
          setTopTracks(data);
          //alert(data.album.images[0].url);
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
    const getAlbums = async() =>{
        const url = window.location.protocol + "//" + window.location.host + '/api/artist/albums?id=' + artist_id;
        const response = await fetch(url);
        switch(response.status){
          case 200:
            const data = await response.json();
            setAlbums(data);
            //alert(data.album.images[0].url);
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
      const getRelatedArtists = async() =>{
        const url = window.location.protocol + "//" + window.location.host + '/api/artist/related-artists?id=' + artist_id;
        const response = await fetch(url);
        switch(response.status){
          case 200:
            const data = await response.json();
            setRelatedArtists(data);
            //alert(data.album.images[0].url);
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
 async function getColors(){
  const paletteData = await Vibrant.from(src).getPalette();
  //alert(JSON.stringify(paletteData));
  setColor1(JSONtoRGB(paletteData.LightVibrant, 0.8));
  setColor2(JSONtoRGB(paletteData.LightMuted, 0.8));
 }

  function JSONtoRGB(jsonData, t){
    var r, g, b, a = "";
    jsonData = jsonData.rgb;
    r= jsonData[0];
    g= jsonData[1];
    b= jsonData[2];
    a= t;
    return "rgba(" + r + "," + g + "," + b+ "," + a + ")";
  }
  useEffect(() => {   
    loadArtist();
    //loadAudioFeatures();
    getTopTracks();
    getAlbums();
    getRelatedArtists();
  }, []);


return (
      <>
  <Head>
       <title>SpotifyStats</title>
       <link rel="icon" href="/favicon.ico" />
  </Head>
  <NavComponent></NavComponent>

   {artist.followers ? (
       
     
<Container className="col-xl-8" style={{marginTop:'30px'}}>
  <Row>
    <Col xl ={6} lg={6} md={12} style={{marginBottom:'60px'}}>

        <a href={artist.popularity}>
        <img alt="Remy Sharp" src={artist.images[1].url} style={{height: '100%', width: 'auto', "box-shadow": "20px 20px 30px grey"}}/>
        </a>
      </Col>
    <Col xl={6} lg={6} md={12} style={{marginBottom:'60px', paddingLeft:'2rem'}}>
      <h1>{artist.name}</h1>
      <Table bordered hover variant="light" style={{"table-layout": 'fixed'}}>
                <tbody>
                  <tr>
                    <td>Followers: </td>
                    <td>{artist.followers.total}</td>
                  </tr>
                  <tr>
                    <td>Gernes: </td>
                    <td>{artist.genres.join(", ")}</td>
                  </tr>
                  <tr>
                    <td>Popularity: </td>
                    <td>{artist.popularity}</td>
                  </tr>
                  <tr>
                    <td>Spotify-ID: </td>
                    <td>{artist.id}</td>
                  </tr>
              </tbody>
      </Table>
    </Col>
  </Row>


  <br></br>
      <h2><Badge variant="secondary">Top Tracks</Badge></h2>
            {topTracks.tracks ? (
                <ListGroup>
                {topTracks.tracks.map((m) => (
                    <Track
                    id = {m.id}
                    name = {m.name}
                    coverurl = {m.album.images[2].url}
                    artists = {m.artists.map((a) =>(
                    a.name + " "
                    ))}
                    ></Track>
              ))}
                </ListGroup>
            ) : (
                <p></p>
            )}

<br></br>
    <h2><Badge variant="secondary">Albums</Badge></h2>
            {albums.items ? (
                <ListGroup>
                {albums.items.map((a) => (
                    <Album
                    id = {a.id}
                    name = {a.name}
                    coverurl = {a.images[2].url}
                    artists = {a.total_tracks + " Track(s)"}
                    ></Album>
              ))}
                </ListGroup>
            ) : (
                <p></p>
            )}

<br></br>
<h2><Badge variant="secondary">Related Artists</Badge></h2>

          {relatedArtists.artists ? (
              <ListGroup>
              {relatedArtists.artists.map((a) => (
                  <Artist
                  id = {a.id}
                  name = {a.name}
                  imageurl = {a.images[2].url}
                  ></Artist>
                  
              
            ))}
              </ListGroup>) : (
              <p></p>
          )}

</Container>

  
  ) : (
    <p></p>
)}
</>)}
