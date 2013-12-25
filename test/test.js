var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var EventEmitter = require('../src/EventEmitter');

describe('getListeners', function() {
  var ee;
  
  beforeEach(function() {
    ee = new EventEmitter();
  });
  
  it('contains a listener', function() {
    ee.addListener('event1', function() {
      console.log('event1 is fired');
    });
    expect(ee.getListeners('event1').length).to.equal(1);
  });
});

describe('addListener', function() {
  
});

describe('addOnceListener', function() {
  
});

describe('removeListener', function() {
  
});

describe('removeAllListeners', function() {
  
});

describe('emitEvent', function() {
  
});