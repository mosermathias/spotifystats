import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Artist({id, name, imageurl, rank}){
  function openArtist(){
    window.location.replace('/artist/' + id);
  }
    return(

      <ListGroupItem style={{padding:'none', margin:'none'}} onClick={() => {openArtist()}} className="lgi">
      <ListItem alignItems="flex-start" style={{padding:'0px', display:'flex', justifyContent:'center'}}>

      <p style={{margin: 'auto', marginRight:'20px'}}>{rank}</p>
        <ListItemAvatar style={{margin:'0px'}}>
          <Avatar alt="Remy Sharp" src={imageurl} style={{height: '50px', width: '50px', margin:'auto', marginRight:'20px'}}/>
        </ListItemAvatar>
        <strong style={{margin:'auto'}}>{name}</strong>
        <ListItemText style={{margin:'auto'}}/>
        <PersonAddIcon style={{float: 'right', margin:'auto', marginLeft:'30px'}}></PersonAddIcon>
      </ListItem>
    </ListGroupItem>
    )
}