const jwt = require('jsonwebtoken');
const config = require('./config');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorisation'];
    if(token){
        if(token.startswith('Bearer')){
            token = token.slice(7, token.length);
        }
        jwt.verify(token,config.secret, (err, decoded) =>{
            if(err){
                return res.json({
                    success : false,
                    message : 'token is not valid'
                })
            } else {
                req.decoded = decoded ;
                next();
            }
        })
    } else {
        return res.json ({
            success : false,
            messaage : 'Auth token is not valid'
        });
    }
}
module.exports = {
    checkToken : checkToken
}