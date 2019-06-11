var mongoose = require('mongoose');
//chai is an assertion library, it makes testing easier by giving us lots of assertions you can run against our code.
var chai = require('chai');
//chai-http allows us to easily make a requests to an http endpoint.
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var should = chai.should();
var server = require('../app');
var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InBhdml0aHJhQGdtYWlsLmNvbSIsImlkIjoiNWNjNmFjOGEwZDcxYjgxN2RjZmQ3MmE5IiwiaWF0IjoxNTU2NTMzODk1LCJleHAiOjE1NTY2MjAyOTV9.98qn-XaCPa279XXTP_UbJYIbmJhRr19_LLIRnWcuU30";
//describe() is used for collection of test features.
describe('product', () => {
    it('should take 500ms', function (done) {
        this.timeout(800)
        setTimeout(done, 500)
    })

    describe('Get product', () => {
        //it() statement contains each individual test case or test a single feature.
        it('it should list all the employee /api GET', (done) => {
            //chai-http allows us to easily make a requests to an http endpoint.
            chai.request(server)
                .get('/get')
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    done();
                })
        })
    })
    describe('Post product', () => {
        it('should joi validation failed', (done) => {
            let newProduct = {
                productId: 101,
                productName: "Mobile",
                MobileNo: "99651450",
                Email: "ajith@gmail.com",
                Password: "ajith",
                productPrice: 15,
                color: "Rose Gold",
                ReleasedDate: "2019-04-29",
                Warranty: "6 months warranty",
                productStatus: "The product is ready to sale"
            }
            chai.request(server)
                .post('/add')
                .set('Authorization', token)
                .send(newProduct)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
        it('should add the product /api post', (done) => {
            let newProduct = {
                productId: 9,
                productName: "LG Air conditioner",
                MobileNo: "9032456789",
                Email: "ramya@gmail.com",
                Password: "ramya",
                productPrice: 39000,
                color: "Grey",
                ReleasedDate: "04-29-2019",
                Warranty: "2 year 6 month warranty",
                productStatus: "The product is ready to sale"
            }
            chai.request(server)
                .post('/add')
                .set('Authorization', token)
                .send(newProduct)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                })
        })
        it('should not add the product', (done) => {
            let newProduct = {
                productId: 4,
                productName: "Mobile",
                MobileNo: "9965145088",
                Email: "ajith@gmail.com",
                Password: "ajith",
                productPrice: 15000,
                color: "Rose Gold",
                ReleasedDate: "2019-04-29",
                Warranty: "6 months warranty",
                productStatus: "The product is ready to sale"
            }
            chai.request(server)
                .post('/add')
                .set('Authorization', token)
                .send(newProduct)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })

    });
    describe('get by product Id and status', () => {
        describe('get by ProductId', () => {
            it('should list the ProductId', (done) => {
                chai.request(server)
                    .get('/getById?productId=3')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        done();
                    })
            })
            //test case for failure response of GetById method.
            it('should not list the ProductId', (done) => {
                chai.request(server)
                    .get('/getById?productId=45')
                    .set('Authorization', token)
                    .send("The given id is not found.")
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    })
            })
        })
        describe('get by ProductName', () => {
            it('should list the ProductName', (done) => {
                chai.request(server)
                    .get('/getById?productName=Redmi Mobile')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        done();
                    })
            })
            //test case for failure response of GetById method.
            it('should not list the ProductName', (done) => {
                chai.request(server)
                    .get('/getById?productName=battery')
                    .set('Authorization', token)
                    .send("The given name is not found.")
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    })
            })
        })
        describe('get by ProductsByStatus', () => {
            it('should list the ProductsByStatus', (done) => {
                chai.request(server)
                    .get('/getById?productStatus=The product is ready to sale')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        done();
                    })
            })
            //test case for failure response of GetById method.
            it('should not list the ProductsByStatus', (done) => {
                chai.request(server)
                    .get('/getById?productStatus=The product is not ready to sale')
                    .set('Authorization', token)
                    .send("The given productStatus is not found.")
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    })
            })
        })
    })
    describe('Update product', () => {
        describe('Update productId', () => {
            it('should not put for joi validation failure', (done) => {
                chai.request(server)
                    .get('/get')
                    .end((err, res) => {
                        chai.request(server)
                            .put('/put?productId=4')
                            .set('Authorization', token)
                            .send({
                                productName: "Redmi Mobile",
                                MobileNo: "7441231",
                                Email: "ammu@gmail.com",
                                Password: "ammu",
                                productPrice: 12,
                                color: "Gold",
                                ReleasedDate: "04-29-2019",
                                Warranty: "1 year 6 month warranty",
                                productStatus: "The product is ready to sale"
                            })
                            .end((err, res) => {
                                res.should.have.status(404);
                                done();
                            })
                    })
            })
            it('should put by productId', (done) => {
                chai.request(server)
                    .get('/get')
                    .end((err, res) => {
                        chai.request(server)
                            .put('/put?productId=4')
                            .set('Authorization', token)
                            .send({
                                productName: "Redmi Mobile",
                                MobileNo: "7441231535",
                                Email: "ammu@gmail.com",
                                Password: "ammu",
                                productPrice: 12500,
                                color: "Gold",
                                ReleasedDate: "04-29-2019",
                                Warranty: "1 year 6 month warranty",
                                productStatus: "The product is ready to sale"
                            })
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                done();
                            })
                    })
            })
            //test case for failure response of Put method.
            it('should not put by id', (done) => {
                chai.request(server)
                    .get('/get')
                    .end((err, res) => {
                        chai.request(server)
                            .put('/put?productId=44')
                            .set('Authorization', token)
                            .send({
                                productName: "Redmi Mobile",
                                MobileNo: "7441231535",
                                Email: "ammu@gmail.com",
                                Password: "ammu",
                                productPrice: 12500,
                                color: "RoseGold",
                                ReleasedDate: "04-29-2019",
                                Warranty: "1 year 6 month warranty",
                                productStatus: "The product is ready to sale"
                            })
                            .end((err, res) => {
                                res.should.have.status(404);
                                done();
                            })
                    })
            })
        })
        describe('Update productId', () => {
            it('should not put for joi validation failure', (done) => {
                chai.request(server)
                    .get('/get')
                    .end((err, res) => {
                        chai.request(server)
                            .put('/put?productName=4')
                            .set('Authorization', token)
                            .send({
                                productId: 4,
                                MobileNo: "7441231",
                                Email: "ammu@gmail.com",
                                Password: "ammu",
                                productPrice: 12,
                                color: "Gold",
                                ReleasedDate: "04-29-2019",
                                Warranty: "1 year 6 month warranty",
                                productStatus: "The product is ready to sale"
                            })
                            .end((err, res) => {
                                res.should.have.status(404);
                                done();
                            })
                    })
            })
            it('should put by productId', (done) => {
                chai.request(server)
                    .get('/get')
                    .end((err, res) => {
                        chai.request(server)
                            .put('/put?productName=Redmi Mobile')
                            .set('Authorization', token)
                            .send({
                                productId: 4,
                                MobileNo: "7441231535",
                                Email: "ammu@gmail.com",
                                Password: "ammu",
                                productPrice: 12500,
                                color: "Gold",
                                ReleasedDate: "04-29-2019",
                                Warranty: "1 year 6 month warranty",
                                productStatus: "The product is ready to sale"
                            })
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                done();
                            })
                    })
            })
            //test case for failure response of Put method.
            it('should not put by id', (done) => {
                chai.request(server)
                    .get('/get')
                    .end((err, res) => {
                        chai.request(server)
                            .put('/put?productName=bjij')
                            .set('Authorization', token)
                            .send({
                                productId: 4,
                                MobileNo: "7441231535",
                                Email: "ammu@gmail.com",
                                Password: "ammu",
                                productPrice: 12500,
                                color: "RoseGold",
                                ReleasedDate: "04-29-2019",
                                Warranty: "1 year 6 month warranty",
                                productStatus: "The product is ready to sale"
                            })
                            .end((err, res) => {
                                res.should.have.status(404);
                                done();
                            })
                    })
            })
        })


    });
    describe('Delete Product', () => {
        describe('Delete productId', () => {
            it('should delete by id ', (done) => {
                chai.request(server)
                    .get('/get')
                    .end((err, res) => {
                        chai.request(server)
                            .delete('/delete?productId=7')
                            .set('Authorization', token)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                done();
                            });
                    });
            })
            // test case for failure response of Delete method.
            it('should not delete by id', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .delete('/delete?productId=43')
                            .set('Authorization', token)
                            .send("The given id is not found for delete request.")
                            .end((err, res) => {
                                res.should.have.status(404);
                                done();
                            })
                    })
            })
        })
        describe('Delete productName', () => {
            it('should delete by id ', (done) => {
                chai.request(server)
                    .get('/get')
                    .end((err, res) => {
                        chai.request(server)
                            .delete('/delete?productStatus=Motorola')
                            .set('Authorization', token)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                done();
                            });
                    });
            })
            // test case for failure response of Delete method.
            it('should not delete by id', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        chai.request(server)
                            .delete('/delete?productName=computer')
                            .set('Authorization', token)
                            .send("The given Name is not found for delete request.")
                            .end((err, res) => {
                                res.should.have.status(404);
                                done();
                            })
                    })
            })
        })


    });
    describe('register product', () => {
        it('should not register because of joi validation failed', (done) => {
            let newProduct = {
                productId: 101,
                productName: "Mobile",
                MobileNo: "99651450",
                Email: "ajith@gmail.com",
                Password: "ajith",
                productPrice: 15,
                color: "Rose Gold",
                ReleasedDate: "2019-04-29",
                Warranty: "6 months warranty",
                productStatus: "The product is ready to sale"
            }
            chai.request(server)
                .post('/api/register')
                .send(newProduct)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
        it('should register the product', (done) => {
            let newProduct = {
                productId: 1,
                productName: "Honor 9N mobile",
                MobileNo: "8870906789",
                Email: "preethi@gmail.com",
                Password: "preethi",
                productPrice: 11999,
                color: "White",
                ReleasedDate: "04-29-2019",
                Warranty: "1 year warranty",
                productStatus: "The product is not ready to sale"
            }
            chai.request(server)
                .post('/api/register')
                .send(newProduct)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                })
        })
        it('should not register the product', (done) => {
            let newProduct = {
                productId: 3,
                productName: "Honor 9N mobile",
                MobileNo: "8870906789",
                Email: "preethi@gmail.com",
                Password: "preethi",
                productPrice: 11999,
                color: "White",
                ReleasedDate: "04-29-2019",
                Warranty: "1 year warranty",
                productStatus: "The product is not ready to sale"
            }
            chai.request(server)
                .post('/api/register')
                .send(newProduct)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
    });
    describe('Login employee', () => {
        it('should not have proper emailid', (done) => {
            const login = {
                Email: "rabiii@gmail.com",
                Password: "rabiii"
            }
            chai.request(server)
                .post('/login')
                .send('No user found.')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })
        it('should login', (done) => {
            const login = {
                Email: "puppy@gmail.com",
                Password: "puppy"
            }
            chai.request(server)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(login)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
        it('should have correct password', (done) => {
            const login = {
                Email: "puppy@gmail.com",
                Password: "pupyy"
            }
            chai.request(server)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(login)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                })
        })
    })

})