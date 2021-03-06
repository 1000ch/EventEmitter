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
  
  describe('on', function() {

    it('adds a listener', function() {
      ee.on('event1', spy1);
      expect(ee.listeners('event1').length).to.equal(1);
      ee.emit('event1');
      expect(spy1.callCount).to.equal(1);
      ee.emit('event1');
      expect(spy1.callCount).to.equal(2);
    });

    it('adds some listeners', function() {
      ee.on('event2', spy1);
      ee.on('event2', spy2);
      expect(ee.listeners('event2').length).to.equal(2);
      expect(spy1.callCount).to.equal(0);
      expect(spy2.callCount).to.equal(0);
      ee.emit('event2');
      expect(spy1.callCount).to.equal(1);
      expect(spy2.callCount).to.equal(1);
      ee.emit('event2');
      expect(spy1.callCount).to.equal(2);
      expect(spy2.callCount).to.equal(2);
    });

    it('adds some listeners with other listeners', function() {
      ee.on('event3', spy1);
      ee.on('event3', function() {});
      ee.on('event3', function() {});
      ee.on('event4', spy2);
      ee.on('event4', function() {});
      expect(ee.listeners('event3').length).to.equal(3);
      expect(ee.listeners('event4').length).to.equal(2);
      ee.emit('event3');
      expect(spy1.callCount).to.equal(1);
      expect(spy2.callCount).to.equal(0);
      ee.emit('event4');
      expect(spy1.callCount).to.equal(1);
      expect(spy2.callCount).to.equal(1);
    });
  });

  describe('once', function() {
    it('fires specified event once', function() {
      ee.once('event5', spy1);
      expect(ee.listeners('event5').length).to.equal(1);
      ee.emit('event5');
      expect(spy1.callCount).to.equal(1);
      ee.emit('event5');
      expect(spy1.callCount).to.equal(1);
      expect(ee.listeners('event5').length).to.equal(0);
    });

    it('is removable with off', function() {
      ee.once('event6', spy1);
      expect(ee.listeners('event6').length).to.equal(1);
      ee.off('event6', spy1);
      ee.emit('event6');
      expect(spy1.callCount).to.equal(0);

      ee.once('event7', spy2);
      expect(ee.listeners('event7').length).to.equal(1);
      ee.off('event7');
      ee.emit('event7');
      expect(spy1.callCount).to.equal(0);
    });
  });
  
  describe('clear', function() {
    it('removes normal listener', function() {
      ee.on('event8', spy1);
      expect(ee.listeners('event8').length).to.equal(1);

      ee.clear();
      ee.emit('event8');
      expect(spy1.callCount).to.equal(0);
      expect(ee.listeners('event8').length).to.equal(0);
    });
    it('removes once listener', function() {
      ee.once('event9', spy1);
      expect(ee.listeners('event9').length).to.equal(1);

      ee.clear();
      ee.emit('event9');
      expect(spy1.callCount).to.equal(0);
      expect(ee.listeners('event9').length).to.equal(0);
    });
    it('removes all of listeners', function() {
      ee.on('event10', spy1);
      ee.once('event11', spy2);
      expect(ee.listeners('event10').length).to.equal(1);
      expect(ee.listeners('event11').length).to.equal(1);

      ee.clear();
      ee.emit('event10');
      ee.emit('event11');
      expect(spy1.callCount).to.equal(0);
      expect(spy2.callCount).to.equal(0);
      expect(ee.listeners('event10').length).to.equal(0);
      expect(ee.listeners('event11').length).to.equal(0);
    });
  });
});