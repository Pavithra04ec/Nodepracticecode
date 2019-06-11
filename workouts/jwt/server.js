const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../jwt/config');
const middleware = require('./middleware');
const bodyParser = require('body-parser');

class HandlerGenerator {
    login(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        let mockedUsername = 'admin';
        let mockedPassword = 'password';

        if (username && password) {
            if (username === mockedUsername && password === mockedPassword) {
                let token = jwt.sign({ username: username },
                    config.secret,
                    {
                        expiresIn: '24h'
                    }
                );
                res.json({
                    success : true,
                    message : 'Authentication successful',
                    token : token
                })
            }else {
                res.send(404).json({
                    success : false,
                    message : 'invalid username or password'
                });
            }
        }else {
            res.json ({
                success : false,
                message : 'Authentication failed'
            });
        }
    }
    index(req, res)  {
        res.json ({
            success : true,
            message : 'index page'
        });
    }
}
function main() {
    const app = express();
    const handler = new HandlerGenerator();
    const port = process.env.PORT || 5000;
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());

    app.post('/login', handler.login);
    app.get('/', middleware.checkToken, handler.index);
    app.listen(port, () =>{
        console.log(`server is connected ${5000}`);
    }) 
}
main();