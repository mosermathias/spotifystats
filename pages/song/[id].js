import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useEffect, useState } from "react"; 
import { useRouter } from 'next/router';
import { Col, Container, ListGroup, ListGroupItem, Row, Table } from 'react-bootstrap';
import { Avatar, ListItem } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Bar} from 'react-chartjs-2';
import * as Vibrant from 'node-vibrant'
import { BarChart } from '@material-ui/icons';
import parse from 'html-react-parser';
import NavComponent from '../../components/Nav';


export async function getServerSideProps(ctx) {
  const id = ctx.query.id;

  return {
    props: {id}, // will be passed to the page component as props
  };
}


export default function Song({id}) {
    //const router = useRouter();
    
    var src = '';

   
    const [song, setSong] = useState([]);
    const [features, setFeatures] = useState("");
    const [isLiked, setIsLiked] = useState([]);
    const [audiofeatures, setAudioFeatures] = useState([]);
    const [color1, setColor1] = useState([]);
    const [color2, setColor2] = useState([]);

    const pitch = ["0", "C", "C♯, D♭", "D", "D♯, E♭", "E", "F", "F♯, G♭", "G", "G♯, A♭", "A", "A♯, B♭", "B"];
    const modes = ["minor, moll", "major, dur"];

    const song_id = id;
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
          g += "<h3>" + a.name + "</h3>";
        }
        
        t = true;
      });
      setFeatures(g);
    }
    
    const loadAudioFeatures = async() =>{
      const url = 'http://localhost:3000/api/song/audio_features?id=' + song_id;
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
    const loadSong = async() =>{
      const url = 'http://localhost:3000/api/song/' + song_id;
      const response = await fetch(url);
      switch(response.status){
        case 200:
          const data = await response.json();
          setSong(data);
          src = data.album.images[0].url;
          getColors();
          songVar = data;
          displayFeatures();
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
    const getisLiked = async() =>{
      const url = 'http://localhost:3000/api/api_isliked?id=' + song_id;
      const response = await fetch(url);
      switch(response.status){
        case 200:
          const data = await response.json();
          setIsLiked(data);
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
    //song_id = router.query.id;
    loadSong();
    loadAudioFeatures();
    getisLiked();
    
  }, []);

  //Seconds to Minutes
  function convert(value) {
    return Math.floor(value / 60) + ":" + (value % 60 ? value % 60 : '00').toFixed(2)
  }

  const state = {
    labels: ['danecebility', "energy", "speechiness", "acousticness",  "liveness", "valence"],
    datasets: [
      {
        label: "",
        backgroundColor: [color1, color2],
        //borderColor: [""],
        //borderWidth: 0,
        data: [audiofeatures.danceability, audiofeatures.energy, audiofeatures.speechiness, audiofeatures.acousticness, audiofeatures.liveness, audiofeatures.valence]
      }
    ]
  };
  
  
  return (
      <>
      
    
      <Head>
        <title>SpotifyStats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavComponent></NavComponent>
<Container className="col-xl-8" style={{marginTop:'30px'}}>
      {
          song.artists ? (
            <> 
            
          
      <Row >
          
        <Col xl ={6} lg={6} md={12} style={{marginBottom:'60px'}}>
              <a href={song.external_urls.spotify}>
                <img alt="Remy Sharp" src={song.album.images[1].url} style={{height: '100%', width: 'auto', "box-shadow": "20px 20px 30px grey"}}/>
                </a>
        </Col>

        <Col xl={6} lg={6} md={12} style={{marginBottom:'60px', paddingLeft:'2rem'}}>
        <h1>{song.name} </h1>
        <strong>{parse(features)}</strong>
              <Table bordered hover variant="light" style={{"table-layout": 'fixed'}}>
                <tbody>
                  <tr>
                    <td>Album</td>
                    <td>{song.album.name}</td>
                  </tr>
                  <tr>
                    <td>Release</td>
                    <td>{song.album.release_date}</td>
                  </tr>
                  <tr>
                    <td>Duration</td>
                    <td>{convert(song.duration_ms / 1000)}s</td>
                  </tr>
              </tbody>
              </Table>

              <audio controls style={{width:'100%'}}>
                    <source src={song.preview_url} type="audio/mpeg"/>
                    Your browser does not support the audio element.
              </audio>
        </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col>
             <Table bordered hover variant="light" style={{"table-layout": 'fixed'}}>
              <tbody>
                <tr>
                  <td>Popularity: </td>
                  <td>{song.popularity}</td>
                </tr>
                <tr>
                  <td>ISRC-Code: </td>
                  <td>{song.external_ids.isrc}</td>
                </tr>
                <tr>
                  <td>Explicit: </td>
                  <td>{song.explicit.toString()}</td>
                </tr>
                <tr>
                  <td>Spotify-ID: </td>
                  <td>{song.id}</td>
                </tr>
                <tr>
                  <td>Is Liked: </td>
                  <td>{isLiked.toString()}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
    </Row> 
    </>
    
           ):(
            <></>
        )}

      
            
  <Row>
    <Col>
          {audiofeatures.key ? (
            <>
            <hr></hr>
            <h1>Audio Features</h1>
            <Table bordered hover variant="light" style={{"table-layout": 'fixed'}}>
            <tbody>
              <tr>
                <td>Pitch Class: </td>
                <td>{pitch[+audiofeatures.key]}</td>
              </tr>
              <tr>
                <td>Mode: </td>
                <td>{modes[+audiofeatures.mode]}</td>
              </tr>
              <tr>
                <td>Loudness: </td>
                <td>{audiofeatures.loudness} db</td>
              </tr>
              <tr>
                <td>Tempo: </td>
                <td>{audiofeatures.tempo} bpm</td>
              </tr>
              <tr>
                <td>Instrumentalness: </td>
                <td>{audiofeatures.instrumentalness}</td>
              </tr>
            </tbody>
            </Table>
            <Bar
            // style={{backgroundColor: "none"}}
             data={state}
             options={{
              title:{
                display:true,
                text:'Audio features'
              }
              
            }}
            >

            </Bar>
            </>
          ) : (
            <></>
          )}
           
    </Col>
  </Row>
</Container>
      

</>

      
    
  )
}
