var assert = require('assert');
var loginController = require('./login.js');

describe ('LoginController', ()=>{
    describe('isValidUserId', ()=>{
        it('should be a valid userId', ()=>{
            var isValid = loginController.isValidUserId(['abc123', 'xyz987'],'abc123');
            assert.equal(isValid, true);
        })
        it('should return false', () =>{
            var isValid= loginController.isValidUserId(['abc123','xyz987'],'abc123');
            assert.equal(isValid, false);
        })
    })
})