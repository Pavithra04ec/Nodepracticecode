var assert = require('assert');
describe ('basic test', function () {
    it('should test the character of a string', function () {
        assert.equal('hello'.length, 5);
    })
    it('should test the character position', () =>{
        assert.equal('hello'.charAt(1), 'e');
    })
});