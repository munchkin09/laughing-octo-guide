
module.exports = function() {
const request = require('request-promises'),
        config = require('../config/config.prod')

const getActivePlayersData = function(req, res) {

    const queryRequest = {
        url: "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/",
        method:"get",
        qs: {
            "appid": req.params.gameId,
            "key": config.api_key_steam
        }
    }
    request(queryRequest)
    .then( (response) => {
        return res.json( JSON.parse(response.body) ).sendStatus(200);
    })
    .catch( (error) => {
        console.log(error);
        
    })
    
}


 return {
    getActivePlayersData:  getActivePlayersData
}

}