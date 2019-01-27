const request = require('request-promises')

const getArtifactData = function(req, res) {
    res.send(200).json( { status : "success"} );
}

module.exports = {
    getArtifactData: getArtifactData
}