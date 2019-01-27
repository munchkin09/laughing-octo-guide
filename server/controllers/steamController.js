
module.exports = function() {
const request = require('request-promises')

const getArtifactData = function(req, res) {
    res.send(200).json( { status : "success"} );
}

 return {
    getArtifactData: getArtifactData
}

}