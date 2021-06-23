
export default async (req, res) =>{
    const { method, body, headers } = req;
    const time_range = req.query.time_range;
    var access_token = process.env.ACCESS_TOKEN;
    const url = 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=' + time_range;
    var options = {
      headers: { 'Authorization': 'Bearer ' + access_token }
    };
    //console.log(access_token);
    try{
    switch (method) {
      case 'GET':
        const response = await fetch(url, options);
        //console.log(response);
          const json = await response.json();
          //console.log(json);
          switch(response.status){
            case 200:
              var x = 1;
              json.items.forEach(e => {
                e.rank = x;
                x++;
              });
              console.log("test");
              res.status(200).json(json);
              break;
            case 401:
              res.status(401).json(json);
              break;
            default:
              res.status(403).json(json);
              break;
        }
        break;
        default:
          res.status(405).json({message: "method not allowed"});
          break;
      }
    }
    catch(error){
      res.status(500).json({message: error.message});
    }
}