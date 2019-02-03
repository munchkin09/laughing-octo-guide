
module.exports = function() {
const request = require('request-promises'),
        config = require('../config/config.prod')

const getActivePlayersData = async function(req, res) {
    let poolRequest = [];
    const gameId = req.params.gameId;

    if(isNaN(gameId)) {
        return res.status(400).json( { error: "Not valid game ID." } );
    }  else if(parseInt(gameId) <= 1) {
        return res.status(400).json( { error: "Not valid game ID." } );
    }

    poolRequest.push(getGameSchema(req, res))


    const optionsRequest = {
        url: "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/",
        method:"get",
        qs: {
            "appid": gameId,
            "key": config.api_key_steam
        }
    }

    poolRequest.push(request(optionsRequest))

    Promise.all(poolRequest)
    .then( (results) => {    
        const gameData = results[0]
        const data = JSON.parse(results[1].body)
        let ret = { data: data.response, name: gameData ? gameData.game.gameName : 'Name not available' }
        return res.status(200).json( ret );
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