var expect = require('expect.js');
var app = require('../src/app.jsx');

describe("simple", function(){
  it("should return true", function(){
    expect(true).to.equal(true);
  });
  it("should return false", function(){
    expect(false).to.equal(false);
  });
});
