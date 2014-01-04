# EventEmitter

## About

[![testling badge](https://ci.testling.com/1000ch/EventEmitter.png)](https://ci.testling.com/1000ch/EventEmitter)

## API

### Constructor

```js
var client = new EventEmitter();
```

### `on(type, listener, once)`

```js
client.on('received', function() {
  console.log('received.');
}, false);
```

### `once(type, listener)`

```js
client.once('received', function() {
  console.log('received.');
});
```

### `off(type, listener)`

```js
client.off('received');
```

### `clear()`

```js
client.on('received', function() {
  console.log('received.');
}, false);

client.on('sent', function() {
  console.log('sent.');
}, false);

client.clear();
```

### `emit(type)`

```js
client.emit('received');
client.emit('sent');
```

### `listeners(type)`

```js
client.on('received', function() {
  console.log('received.');
});

client.listeners();
```

## Problem?

Please report issues.

## License

MIT