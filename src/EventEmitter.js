(function() {
  'use strict';

  /**
   * EventEmitter class
   * @constructor EventEmitter
   */
  function EventEmitter() {}

  // Prototype of EventEmitter
  var Prototype = EventEmitter.prototype;

  // Registered events
  Prototype.events = {};

  /**
   * Get type specified listeners
   * @param {String} type
   * @returns {Object}
   */
  Prototype.getListeners = function(type) {
    var listeners = this.events[type];
    if(!listeners) {
      listeners = this.events[type] = [];
    }
    // listeners is array of object such as following item
    //
    // {
    //   listener: function() {}
    //   once: true/false
    // }
    return listeners;
  };

  /**
   * Add listener
   * @type {Function}
   * @param {String} type
   * @param {Function} listener
   * @param {Boolean} once
   */
  Prototype.on = Prototype.addListener = function(type, listener, once) {
    var listeners = this.getListeners(type);
    if(listeners.indexOf(listener) === -1) {
      listeners.push({
        listener: listener,
        once: !!once
      });
    }
    // for chain
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
    var listeners = this.getListeners(type);
    if(listener) {
      var index = listeners.indexOf(listener);
      if(index !== -1) {
        listeners.splice(index, 1);
      }
    } else {
      listeners = [];
    }
    // for chain
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
    // for chain
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
    // to remove from this
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
    // for chain
    return this;
  };

}.call(this));