(function() {
  'use strict';

  /**
   * EventEmitter class
   * @constructor EventEmitter
   */
  function EventEmitter() {}

  //Prototype of EventEmitter
  var Prototype = EventEmitter.prototype;

  /**
   * Add listener
   * @type {Function}
   * @param {String} type
   * @oaram {Function} listener
   */
  Prototype.on = Prototype.addListener = function(type, listener) {};

  /**
   * Add listener which will be executed once
   * @type {Function}
   * @param {String} type
   * @oaram {Function} listener
   */
  Prototype.once = Prototype.addOnceListener = function(type, listener) {};

  /**
   * Remove listener
   * @type {Function}
   * @param {String} type
   * @oaram {Function} listener
   */
  Prototype.off = Prototype.removeListener = function(type, listener) {};

  /**
   * Remove all listeners
   * @type {Function}
   * @param {String} type
   */
  Prototype.removeAllListeners = function(type) {};

  /**
   * Trigger event
   * @type {Function}
   * @param {String} type
   * @oaram {Array} args
   */
  Prototype.trigger = Prototype.emitEvent = function(type, args) {};

}.call(this));