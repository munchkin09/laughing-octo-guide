//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");

chai.should();
chai.use(chaiHttp);

describe("General API v1/games/:gameId/getActivePlayersData behaviour", function() {
    /*before(function(done) { 
        done()
    });

    beforeEach(function(done) {
        done()
    });*/

    describe("/GET PUBG active players data", () => {
        it("it should GET a game active players data", (done) => {
            chai.request(server)
                .get(`/v1/games/578080/getActivePlayersData`)
                .end((err, res) => {    
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

    describe("/GET with a non-valid value", () => {
        
        it("it should GET an error message", (done) => {
            chai.request(server)
                .get(`/v1/games/-10/getActivePlayersData`)
                .end((err, res) => {                
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    done();
                });
        });

        it("it should GET an error message", (done) => {
            chai.request(server)
                .get(`/v1/games/-1004564879747867546534658764876466789053480965487095347089654789054378954378967549065479085742390657872079547584396875436784326785436784235678543268974236895432678645t4804897897894166879845189498/getActivePlayersData`)
                .end((err, res) => {                
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    done();
                });
        });

        it("it should GET an error message", (done) => {
            chai.request(server)
                .get(`/v1/games/cadenadetexto/getActivePlayersData`)
                .end((err, res) => {           
                    res.should.have.status(400);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
});