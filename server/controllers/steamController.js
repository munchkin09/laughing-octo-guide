
module.exports = function() {
const request = require('request-promises')

const getArtifactData = function(req, res) {
    return res.json( { status : "success"} ).sendStatus(200);
}

 return {
    getArtifactData: getArtifactData
}

}