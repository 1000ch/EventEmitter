(function() {
  'use strict';

  /**
   * EventEmitter class
   * @constructor EventEmitter
   */
  function EventEmitter() {}

  //Prototype of EventEmitter
  var Prototype = EventEmitter.prototype;

  Prototype.events = {};

  /**
   * Add listener
   * @type {Function}
   * @param {String} type
   * @param {Function} listener
   * @param {Boolean} once
   */
  Prototype.on = Prototype.addListener = function(type, listener, once) {
    var listeners = this.events[type];
    if(!listeners) {
      listeners = this.events[type] = [];
    }
    if(listeners.indexOf(listener) === -1) {
      listeners.push({
        listener: listener,
        once: !!once
      });
    }
    return this;
  };

  /**
   * Add listener which will be executed once
   * @type {Function}
   * @param {String} type
   * @param {Function} listener
   */
  Prototype.once = Prototype.addOnceListener = function(type, listener) {
    return this.addListener(type, listener, true);
  };

  /**
   * Remove listener
   * @type {Function}
   * @param {String} type
   * @oaram {Function} listener
   */
  Prototype.off = Prototype.removeListener = function(type, listener) {
    var listeners = this.events[type];
    if(!listeners) {
      listeners = this.events[type] = [];
    }
    if(listener) {
      var index = listeners.indexOf(listener);
      if(index !== -1) {
        listeners.splice(index, 1);
      }
    } else {
      listeners = [];
    }
    return this;
  };

  /**
   * Remove all listeners
   * @type {Function}
   */
  Prototype.removeAllListeners = function() {
    var type, types = Object.keys(this.events);
    for(var i = 0, l = types.length;i < l;i++) {
      type = types[i];
      delete this.events[type];
    }
    return this;
  };

  /**
   * Trigger event
   * @type {Function}
   * @param {String} type
   * @oaram {Array} args
   */
  Prototype.trigger = Prototype.emitEvent = function(type, args) {
    var listener, listeners = this.events[type];
    var array = [];
    for(var i = 0, l = listeners.length;i < l;i++) {
      listener = listeners[i];
      listener.listener.apply(this, args || []);
      if(listener.once) {
        array.push(listener);
      }
    }
    array.forEach(function(item) {
      this.removeListener(type, item.listener);
    });
  };

}.call(this));