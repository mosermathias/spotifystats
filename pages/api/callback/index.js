const express = require("express");
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const request = require('request'); // "Request" library
const cors = require('cors');
import Cookies from 'cookies';
import { GetServerSideProps } from 'next';

var stateKey = 'spotify_auth_state';
var access_token = "";
var refresh_token = "";




export default async (req, res) =>{
  console.log(req);
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URI;
// your application requests refresh and access tokens
  // after checking the state parameter
  const cookies = new Cookies(req, res);
  cookies.set(stateKey, state);
  
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    cookies.set(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

            access_token = body.access_token,
            refresh_token = body.refresh_token;
            process.env.ACCESS_TOKEN = access_token;

            //sessionStorage.setItem('ACCESS_TOKEN', access_token);
            process.env.REFRESH_TOKEN = refresh_token;
            //cookies.set("access_token", access_token);
            //cookies.set("refreshs_token", refresh_token);

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        if(req.headers.referer){
          res.redirect(req.headers.referer);
        }
        else{
          res.redirect('/');
        }
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
}