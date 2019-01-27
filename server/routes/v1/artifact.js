//module.exports = function() {
    var express = require('express');
    var rfr = require('rfr')
    var router = express.Router();
    var SteamController = rfr('server/controllers/steamController')


    // route to trigger the capture
    router.get('/getArtifactData', function (req, res) {
        const stmCtrl = new SteamController()
        stmCtrl.getArtifactData(req, res)
        
    });


    return router;
//}
