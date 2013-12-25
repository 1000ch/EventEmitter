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
    ee.addListener('event1', function() {});
    expect(ee.getListeners('event1').length).to.equal(1);
  });

  it('contains some listeners', function() {
    ee.addListener('event2', function() {});
    ee.addListener('event2', function() {});
    expect(ee.getListeners('event2').length).to.equal(2);
  });
  
  it('contains some listeners with other listeners', function() {
    ee.addListener('event3', function() {});
    ee.addListener('event3', function() {});
    ee.addListener('event3', function() {});
    ee.addListener('event4', function() {});
    ee.addListener('event4', function() {});
    expect(ee.getListeners('event3').length).to.equal(3);
  });
});

describe('addListener', function() {
  var ee;
  
  beforeEach(function() {
    ee = new EventEmitter();
  });
  
  it('adds a listener', function() {});
  it('adds same listeners', function() {});
  it('adds some type listeners', function() {});
});

describe('addOnceListener', function() {
  
});

describe('removeListener', function() {
  
});

describe('removeAllListeners', function() {
  
});

describe('emitEvent', function() {
  
});