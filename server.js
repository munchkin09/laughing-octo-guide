
var rfr = require('rfr')
var express = require('express');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "carloscacharreo.xyz");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const routerArtifact = rfr('server/routes/v1/artifact');

app.use('/v1/artifact',  routerArtifact() );

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
