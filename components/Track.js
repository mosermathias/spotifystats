import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Track({id, name, coverurl, artists, rank}){
function openSong(){
  window.location.replace('/song/' + id);
}
    return(

      <ListGroupItem onClick={() => {openSong()}} className="lgi">
      <ListItem style={{padding:'0px'}}>
          <p style={{margin: 'auto', marginRight:'15px'}}>{rank}</p>
        <ListItemAvatar style={{margin:'0px'}}>
          <Avatar alt="Remy Sharp" src={coverurl} style={{height: '50px', width: '50px', margin:'auto', marginRight:'20px'}}/>
        </ListItemAvatar>
        <div style={{margin: 'auto'}}>
          <strong style={{color:'black', }}>{name}</strong>
          <p style={{marginBottom:'0px'}}>{artists}</p>
          </div>

        <ListItemText style={{margin:'auto'}}/>
          <FavoriteBorderIcon style={{float: 'right', margin:'auto', marginLeft:'30px'}}></FavoriteBorderIcon>
      </ListItem>
    </ListGroupItem>

    )
}