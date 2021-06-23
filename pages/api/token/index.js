
export default async (req, res) =>{
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URI;
    res.header('Authorization: Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')));
  res.json({
    grant_type: "authorization_code",
    code: access_token,
    redirect_uri: redirect_uri,
  })
}