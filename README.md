# EventEmitter

## About

[![testling badge](https://ci.testling.com/1000ch/EventEmitter.png)](https://ci.testling.com/1000ch/EventEmitter)

## API

### Constructor

```js
var client = new EventEmitter();
```

### `addListener(type, listener, once)` alias `on()`

```js
client.addListener('received', function() {
  console.log('received.');
}, false);
```

### `addOnceListener(type, listener)` alias `once()`

```js
client.addOnceListener('received', function() {
  console.log('received.');
});
```

### `removeListener(type, listener)` alias `off()`

```js
client.removeListener('received');
```

### `removeAllListeners()`

```js
client.addListener('received', function() {
  console.log('received.');
}, false);

client.addListener('sent', function() {
  console.log('sent.');
}, false);

client.removeAllListeners();
```

### `emitEvent()` alias `trigger()`

```js
client.trigger('received');
client.trigger('sent');
```

### `getListeners(type)`

```js
client.on('received', function() {
  console.log('received.');
});

client.getListeners();
```

## Problem?

Please report issues.

## License

Copyright 1000ch