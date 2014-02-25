(function(global) {
  'use strict';

  /**
   * EventEmitter class
   * @constructor EventEmitter
   */
  function EventEmitter() {
    this.events = {};
  }

  // Prototype of EventEmitter
  var Prototype = EventEmitter.prototype;

  /**
   * Get type specified listeners
   * @param {String} type
   * @returns {Object}
   */
  Prototype.listeners = function(type) {
    var listeners = this.events[type];
    if (!listeners) {
      listeners = this.events[type] = [];
    }
    // listeners is array of object such as following item
    //
    // {
    //   callback: function() {}
    //   once: true/false
    // }
    return listeners;
  };

  /**
   * Add listener
   * @type {Function}
   * @param {String} type
   * @param {Function} callback
   * @param {Boolean} once
   */
  Prototype.on = function(type, callback, once) {
    if (!callback) {
      return this;
    }
    var objects = this.listeners(type);
    var index = objects.map(function(object) {
      return object.callback;
    }).indexOf(callback);
    if (index === -1) {
      objects.push({
        callback: callback,
        once: Boolean(once)
      });
    }
    // for chain
    return this;
  };

  /**
   * Add listener which will be executed once
   * @type {Function}
   * @param {String} type
   * @param {Function} callback
   */
  Prototype.once = function(type, callback) {
    return this.on(type, callback, true);
  };

  /**
   * Remove listener
   * @type {Function}
   * @param {String} type
   * @param {Function} callback
   */
  Prototype.off = function(type, callback) {
    var objects = this.listeners(type);
    if (callback) {
      var index = objects.map(function(listener) {
        return listener.callback;
      }).indexOf(callback);
      if (index !== -1) {
        objects.splice(index, 1);
      }
    } else {
      objects = [];
    }
    // for chain
    return this;
  };

  /**
   * Remove all listeners
   * @type {Function}
   */
  Prototype.clear = function() {
    var type, types = Object.keys(this.events);
    for (var i = 0, l = types.length;i < l;i++) {
      type = types[i];
      delete this.events[type];
    }
    // for chain
    return this;
  };

  /**
   * Emit event
   * @type {Function}
   * @param {String} type
   * @oaram {Array} args
   */
  Prototype.emit = function(type, args) {
    var object, objects = this.listeners(type);
    // to remove from this
    var array = [];
    for (var i = 0, l = objects.length;i < l;i++) {
      object = objects[i];
      object.callback.apply(this, args || []);
      if (!object.once) {
        array.push(object);
      }
    }
    this.events[type] = array;
    // for chain
    return this;
  };
  
  if (module && module.exports) {
    module.exports = EventEmitter;
  } else {
    global.EventEmitter = EventEmitter;
  }

}.call(this));