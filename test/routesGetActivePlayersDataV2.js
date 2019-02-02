//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('/GET active players data', () => {
    it('it should GET a game active players data', (done) => {
      chai.request(server)
          .get(`/v1/games/578080/getActivePlayersData`)
          .end((err, res) => {                
                res.should.have.status(200);
                res.body.should.be.a('object');
            done();
          });
    });
});

describe('/GET active players data', () => {
    it('it should GET an error message', (done) => {
      chai.request(server)
          .get(`/v1/games/-10/getActivePlayersData`)
          .end((err, res) => {                
                res.should.have.status(400);
                res.body.should.be.a('object');
            done();
          });
    });
});