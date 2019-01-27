
module.exports = function() {
const request = require('request-promises')

const getArtifactData = function(req, res) {
    return res.sendStatus(200).json( { status : "success"} );
}

 return {
    getArtifactData: getArtifactData
}

}