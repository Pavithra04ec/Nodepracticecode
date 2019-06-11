//imports the chai  
const chai = require("chai");
//imports the chai-http 
const chaihttp = require('chai-http');
//imports th chai assertion should 
const should = chai.should();
//imports the index.js 
const server = require('../router/index');
//chai use chaihttp middleware
chai.use(chaihttp);

describe('Users', () => {

    // it('should take less than 500ms', function (done) {
    //     this.timeout(500);
    //     setTimeout(done, 300);
    // });

    //GET route to retrieve all the details.
    describe('get the details', () => {
        it('/get', function (done) {
            chai.request(server)
                .get('/api/v1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    //GET route to retrieve all the particular ID details.
    describe('get the ID details', () => {
        describe('Get the given ProjectId', () => {
            it('/the id not found', function (done) {
                chai.request(server)
                    .get('/api/v1/query?projectId=344')
                    .send('the given id is not found')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
            it('/get the vaild id', function (done) {
                chai.request(server)
                    .get('/api/v1/query?projectId=2')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
        });
        describe('Get the given Project Manager', () => {
            it('/the given Manager name is not found', function (done) {
                chai.request(server)
                    .get('/api/v1/query?projectManager=akilasmsad')
                    .send('the given id is not found')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
            it('/get the given projectname', function (done) {
                chai.request(server)
                    .get('/api/v1/query?projectManager=aaji')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
        });
        describe('Get the Given Project Name', () => {
            it('/the given project name is not found', function (done) {
                chai.request(server)
                    .get('/api/v1/query?projectName=vv')
                    .send('the given id is not found')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
            it('/get the given projectname', function (done) {
                chai.request(server)
                    .get('/api/v1/query?projectName=collection data')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
        });
    });
    //POST route to insert all the details.
    describe('should be Post the details', () => {

        it('/should not post without all column ', function (done) {
            let data = {
                projectId: 3,
                projectName: "collection",
                startDate: "2019-04-01",
                projectDuration: 60,
                totalProjectHours: 500,
                projectManager: "anu",
                projectDesc: "collection data"
            }
            chai.request(server)
                .post('/api/v1')
                .send('enter vaild id & this Id is already use')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('/should be insert the all column ', function (done) {
            let data = {
                projectId: 3,
                projectName: "collection",
                startDate: "2019-04-01",
                endDate: "2019-12-01",
                projectDuration: 60,
                totalProjectHours: 500,
                projectManager: "anu",
                projectDesc: "collection data"
            }
            chai.request(server)
                .post('/api/v1')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
        });
    });

    //PUT route to Update the details.
    describe(' Put the details', () => {
        describe('should be update the given project id ', () => {
            it('/should not update the data without all column', function (done) {
                let data = {
                    projectName: "salary",
                    startDate: "2019-01-05",
                    endDate: "2019-07-01",
                    projectDuration: 30,
                    totalProjectHours: 500,
                    projectDesc: "salary update"
                }
                chai.request(server)
                    .put('/api/v1/query?projectId=31')
                    .send('Should not Update without all column')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
            })
            it('/should be update the particular id ', function (done) {
                let data = {
                    projectName: "salary",
                    startDate: "2019-04-01",
                    endDate: "2019-12-01",
                    projectDuration: 60,
                    totalProjectHours: 500,
                    projectManager: "aaji",
                    projectDesc: "collection data"
                }
                chai.request(server)
                    .put('/api/v1/query?projectId=10')
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });

        });
        describe('should be update the given project Manager Name ', () => {
            it('/should not update without all column ', function (done) {
                let data = {
                    projectName: "salary",
                    startDate: "2019-04-01",
                    endDate: "2019-12-01",
                    totalProjectHours: 500,
                    projectDesc: "collection data"
                }
                chai.request(server)
                    .put('/api/v1/query?projectManager=abisehek')
                    .send('should not update without all column')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
            });
            it('/should be update the particular id ', function (done) {
                let data = {
                    projectId: 11,
                    projectName: "collection",
                    startDate: "2019-04-01",
                    endDate: "2019-12-01",
                    projectDuration: 60,
                    totalProjectHours: 500,
                    projectDesc: "collection data"
                }
                chai.request(server)
                    .put('/api/v1/query?projectManager=aji')
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });

        });
        describe('should be update the given projectName ', () => {
            it('/should not update the data without all column', function (done) {
                let data = {
                    projectId: 12,
                    startDate: "2019-01-05",
                    endDate: "2019-07-01",
                    projectDuration: 30,
                    totalProjectHours: 500,
                    projectDesc: "salary update"
                }
                chai.request(server)
                    .put('/api/v1/query?projectName=coll')
                    .send('Should not Update without all column')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
            });
            it('/should be update the particular id ', function (done) {
                let data = {
                    projectId: 12,
                    startDate: "2019-04-01",
                    endDate: "2019-12-01",
                    projectDuration: 60,
                    totalProjectHours: 500,
                    projectManager: "kumar",
                    projectDesc: "collection data"
                }
                chai.request(server)
                    .put('/api/v1/query?projectName=collect')
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });

        });

    });
    //Delete route to delete the ID details
    describe('/delete the user', () => {
        describe('/should be delete the Given project id ', () => {
            it('/the delete id is not found', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?projectId=50')
                    .send('delete the details will error & Enter the Valid Id')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
            });
            it('/should be delete the particular id', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?projectId=3')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        })
        describe('/should be delete the Given Project Name', () => {
            it('/the delete id is not found', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?projectName=ajex')
                    .send('delete the details will error & Enter the Valid Id')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
            });
            it('/should be delete the particular id', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?projectName=sal')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        })
        describe('/should be delete the Given Project Manager Name', () => {
            it('/the delete Manager Name is not found', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?projectManager=ajex')
                    .send('delete the details will error & Enter the Valid Id')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
            });
            it('/should be delete the particular Manager Name', function (done) {
                chai.request(server)
                    .delete('/api/v1/query?projectManager=deva')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });

    });

});



