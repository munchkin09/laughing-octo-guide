
module.exports = function() {
const request = require('request-promises'),
        config = require('../config/config.prod')

const getActivePlayersData = async function(req, res) {
    const gameId = req.params.gameId
    console.log(gameId);
    
    if(isNaN(gameId)) {
        return res.status(400).json( { error: "Not valid game ID." } );
    }
    const queryRequest = {
        url: "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/",
        method:"get",
        qs: {
            "appid": gameId,
            "key": config.api_key_steam
        }
    }
    const gameData = await getGameSchema(req, res);
    console.log(gameData);
    
    request(queryRequest)
    .then( (response) => {    
        const data = JSON.parse(response.body)
        return res.status(200).json( { data: data.response, name: gameData.game.gameName } );
    })
    .catch( (error) => {
        console.log(error);
        return res.status(500).json( {error: error} );
    })
    
}

const getGameSchema = function(req, res) {
    return new Promise(function(resolve, reject) {
        const queryRequest = {
            url: "https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/",
            method: "get",
            qs: {
                "appid": req.params.gameId,
                "key": config.api_key_steam
            }
        }
        request(queryRequest)
        .then( response => {
            resolve(JSON.parse(response.body))
        })
        .catch( error => {
            console.log(error);
            reject(error)
            
        })
    });
}


 return {
    getActivePlayersData:  getActivePlayersData
}

}