const express = require("express");
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const request = require('request'); // "Request" library
const cors = require('cors');
import Cookies from 'cookies';

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

var stateKey = 'spotify_auth_state';

export default async(req, res) => {
  var state = generateRandomString(16);
  const cookies = new Cookies(req, res);
  cookies.set(stateKey, state);

  
  //res.cookie(stateKey, state);

  var scopes = 'user-read-private user-read-email user-top-read user-library-read';
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scopes,
      redirect_uri: redirect_uri,
      state: state
    }));
  }

