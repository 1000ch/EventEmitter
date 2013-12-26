var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var EventEmitter = require('../src/EventEmitter');

describe('EventEmitter', function() {

  var ee;
  var spy1;
  var spy2;

  beforeEach(function() {
    ee = new EventEmitter();
    spy1 = sinon.spy();
    spy2 = sinon.spy();
  });
  
  describe('getListeners + addListener + emitEvent', function() {

    it('contains a listener', function() {
      ee.addListener('event1', spy1);
      expect(ee.getListeners('event1').length).to.equal(1);
      ee.emitEvent('event1');
      expect(spy1.callCount).to.equal(1);
      ee.emitEvent('event1');
      expect(spy1.callCount).to.equal(2);
    });

    it('contains some listeners', function() {
      ee.addListener('event2', spy1);
      ee.addListener('event2', spy2);
      expect(ee.getListeners('event2').length).to.equal(2);
      expect(spy1.callCount).to.equal(0);
      expect(spy2.callCount).to.equal(0);
      ee.emitEvent('event2');
      expect(spy1.callCount).to.equal(1);
      expect(spy2.callCount).to.equal(1);
      ee.emitEvent('event2');
      expect(spy1.callCount).to.equal(2);
      expect(spy2.callCount).to.equal(2);
    });

    it('contains some listeners with other listeners', function() {
      ee.addListener('event3', spy1);
      ee.addListener('event3', function() {});
      ee.addListener('event3', function() {});
      ee.addListener('event4', spy2);
      ee.addListener('event4', function() {});
      expect(ee.getListeners('event3').length).to.equal(3);
      expect(ee.getListeners('event4').length).to.equal(2);
      ee.emitEvent('event3');
      expect(spy1.callCount).to.equal(1);
      expect(spy2.callCount).to.equal(0);
      ee.emitEvent('event4');
      expect(spy1.callCount).to.equal(1);
      expect(spy2.callCount).to.equal(1);
    });
  });

});

describe('addOnceListener', function() {
  
});

describe('removeListener', function() {
  
});

describe('removeAllListeners', function() {
  
});

describe('emitEvent', function() {
  
});