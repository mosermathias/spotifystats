
export default async (req, res) =>{
    const { method, body, headers } = req;
    try{
    switch (method) {
      case 'GET':
        process.env.ACCESS_TOKEN = undefined;
        process.env.REFRESH_TOKEN = undefined;
        res.status(200).json({message: "Logged Out"});
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