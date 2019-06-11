const mysql = require('mysql');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const should = chai.should();
assert = chai.assert,
    expect = chai.expect;

const verifyToken = require('./verifyToken')
const server = require('./app');

var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTU0OTUwNTQsImV4cCI6MTU1NTU4MTQ1NH0.1Rx0h_3fgdrRVDIYn9PkUJVK5ueJB28r5uPdNIhKXMk';
describe('Employee', () => {
    it('should take 500ms', function (done) {
        this.timeout(800)
        setTimeout(done, 500)
    })
    //describe() is used for collection of test features.
    describe('Get Employee', () => {
        //it() statement contains each individual test case or test a single feature.
        it('it should list all the employee', (done) => {
            //chai-http allows us to easily make a requests to an http endpoint.
            chai.request(server)
                .get('/api')
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })
    })
    describe('get by id and name employee', () => {
        describe('get employee by id', () => {
            it('get emlpoyee details for given id', (done) => {
                chai.request(server)
                    .get('/api/id/?id=1')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        done();
                    })
            })
            it('not get emlpoyee details for given id', (done) => {
                chai.request(server)
                    .get('/api/id/?id=33')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    })
            })
        })
        describe('get employee by name', () => {
            it('get emlpoyee details for given name', (done) => {
                chai.request(server)
                    .get('/api/id/?name=orange')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        done();
                    })
            })
            it('not get emlpoyee details for given name', (done) => {
                chai.request(server)
                    .get('/api/id/?name=xyzw')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    })
            })
        })
    })
    describe('post employee', () => {
        it('create employee', (done) => {
            let newEmployee = {
                id: '9',
                name: 'capsicum',
                mobileno: '5678342109',
                email: 'capsicum@gmail.com',
                projectid: '37',
                comments: 'work is going on',
                password: 'capsicum'
            }
            chai.request(server)
                .post('/api')
                .set('Authorization', token)
                .send(newEmployee)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                })
        })
        it('not create employee', (done) => {
            let newemployee = {
                id: '1',
                name: 'banana',
                mobileno: '8765434567',
                email: 'banana@gmail.com',
                projectid: '15',
                comments: 'work is going on',
                password: 'banana'
            }
            chai.request(server)
                .post('/api')
                .set('Authorization', token)
                .send(newemployee)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
    })
    describe('update employee details', () => {
        describe('update employee by id', () => {
            it('update by id', (done) => {
                chai.request(server)
                    .put('/api/id/?id=3')
                    .set('Authorization', token)
                    .send({
                        name: 'chickoo',
                        mobileno: '6775423231',
                        email: 'chickoo@gmail.com',
                        projectid: '17',
                        comments: 'work completed',
                        password: 'chickoo'
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    })
            })
            it('not update by id', (done) => {
                chai.request(server)
                    .put('/api/id/?id=43')
                    .set('Authorization', token)
                    .send({
                        name: 'chickoo',
                        mobileno: '6775423231',
                        email: 'chickoo@gmail.com',
                        projectid: '17',
                        comments: 'work completed',
                        password: 'chickoo'
                    })
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    })
            })
        })
        describe('update employee by name', () => {
            it('update by name', (done) => {
                chai.request(server)
                    .put('/api/id/?name=banana')
                    .set('Authorization', token)
                    .send({
                        id: '5',
                        mobileno: '9078554322',
                        email: 'bann@gmail.com',
                        projectid: '11',
                        comments: 'work completed',
                        password: 'bann'
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    })
            })
            it('not update by name', (done) => {
                chai.request(server)
                    .put('/api/id/?name=xyztw')
                    .set('Authorization', token)
                    .send({
                        id: '23',
                        mobileno: '6775423231',
                        email: 'chickoo@gmail.com',
                        projectid: '17',
                        comments: 'work completed',
                        password: 'chickoo'
                    })
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    })
            })
        })
    })
    describe('delete employee', () => {
        describe('delete by id', () => {
            it('should delete by id', (done) => {
                chai.request(server)
                    .delete('/api/id/?id=11')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.a.status(200);
                        res.should.be.a('object');
                        done();
                    })
            })
            it('should not delete by id', (done) => {
                chai.request(server)
                    .delete('/api/id/?id=63')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.a.status(404);
                        done();
                    })
            })
        })
        describe('delete by name', () => {
            it('should delete by id', (done) => {
                chai.request(server)
                    .delete('/api/id/?name=potato')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.a.status(200);
                        res.should.be.a('object');
                        done();
                    })
            })
            it('should not delete by name', (done) => {
                chai.request(server)
                    .delete('/api/id/?name=rcbji')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.a.status(404);
                        done();
                    })
            })
        })
    })
    describe('register Employee', () => {
        it('should register the employee', (done) => {
            let newEmployee = {
                id: '10',
                name: 'kiwi',
                mobileno: '5678342109',
                email: 'kiwi@gmail.com',
                projectid: '34',
                comments: 'work is done',
                password: 'kiwi'
            }
            chai.request(server)
                .post('/api/register')
                .send(newEmployee)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
        it('should not register the employee', (done) => {
            let newEmployee = {
                id: '7',
                name: 'ladysfinger',
                mobileno: '5678342109',
                email: 'ladysfinger@gmail.com',
                projectid: '30',
                comments: 'work is going on',
                password: 'ladysfinger'
            }
            chai.request(server)
                .post('/api/register')
                .send(newEmployee)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
    })
    describe('Login employee', () => {
        it('should login', (done) => {
            const login = {
                email: "fig@gmail.com",
                password: "fig"
            }
            chai.request(server)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send(login)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
        it('should not have correct password', (done) => {
            const login = {
                email: "fig@gmail.com",
                password: "figg"
            }
            chai.request(server)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send(login)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                })
        })
    })

})