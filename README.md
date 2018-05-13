## awesome-cache

#### A simple but powerful in memory cache for Node JS

This module requires Node JS >v6.4

### Install

NPM

```bash
npm install awesome-cache --save
```

Yarn

```bash
yarn add awesome-cache
```

### Usage

Basic usage

```javascript
// create the cache
const Cache = require('awesome-cache');
const cache = new Cache();

// Create a cache "hello" and add the string "world" to it.
// set it to expire in 10 seconds
cache.addCache('hello', 'world', 10);

let helloExists = cache.hasCache('hello');
// helloExists = true; if 10 seconds has not passed

let hello = cache.getCache('hello');
// hello = 'world'; // if cache has not expired
// hello = null; // cache has expired

// create an array cache "count" that is limited to 10 items
// add 20 items to it
for(let i = 1; i <= 20; i++){
    cache.addToCacheArray('count', i, 10);
}

let countArray = cache.getCache('count');
// countArray = [ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]

// Destroy cache so process can exit fully
cache.destroy();
```

### Setup

### The timer

awesome-cache has an interval worker to clean up caches when they expire. It defaults to running once
a second. If you need it to run more or less frequently, you can override this when instantiating the class

```javascript
const cache = new Cache({
    // optional. In ms. Defaults to 1000
    cleanInterval:100
});
```

Be aware that the worker run has a little bit of overhead that becomes greater the more keys you have in 
the cache. Running too frequently could increase load on a very large cache system. Although, the worker is
highly optimized and should be able to handle very large caches with minimum overhead.




### Methods

##### .addCache(key, value, expireSeconds = null)

The .addCache method is a basic cache that is removed after the expire time. The value can 
be anything (string|object|array|number). 

| Parameter | Type | Description |
| --- | ---| --- |
| key | string | Key to store cache |
| value | any | The value to store in cache |
| expireSeconds | number/null | The seconds until cache is removed. Set to null to never remove it (default) |


##### .addToCacheArray(key, value, arrayLength = 10)

The .addToCacheArray method creates or adds to a truncated array cache. 
This cache type is not removed over time, but is limited to the arrayLength. 
Newer items are added at the end and older items will be at the beginning of the 
array until the array overflows, in which case the older items will be removed.
The value can be anything (string|object|array|number). 

| Parameter | Type | Description |
| --- | ---| --- |
| key | string | Key to store cache |
| value | any | The value to be added to end of array |
| arrayLength | number | The maximum length of the array |

##### .clearCache(key = null)

The .clearCache method will clear a specific cache if a key is passed. If no key is passed, it will clear
the entire cache giving you a fresh start.

| Parameter | Type | Description |
| --- | ---| --- |
| key | string | Cache to remove (optional) |


##### .getCache(key)

The .getCache method will return the value in the cache for a key. If the value does not exist 
because it has timed out or has not been created, it will return `null`

| Parameter | Type | Description |
| --- | ---| --- |
| key | string | Cache to get value of |


##### .hasCache(key)

The .hasCache method will return a boolean `true|false` if the key passed has a cache.

| Parameter | Type | Description |
| --- | ---| --- |
| key | string | Cache to check |


##### .destroy()

The .hasCache method will destroy the cache and stop the background timer. This is needed 
if you have code that will exit after running a process. awesome-cache has a built in interval to 
manage the cache and it will keep the process open if not destroyed.

You can always recover from calling destroy by creating a new cache instance or revocer the existing instance
by calling `._startTimer()`, however, previously cached keys will have been destroyed.



### Full Example

You can see a full example in the [example.js](https://github.com/jaretburkett/awesome-cache/blob/master/example.js) file.

### Important Notes

awesome-cache has an interval function that will run forever. If you use it in a program that will 
run and then exit, the program will continue to run forever unless you kill the program with a SIGKILL
or you stop the cache.

```javascript
// destroy the cache
cache.destroy();

// or, if you want

// kill the entire process when done
process.exit();
```

Both the basic cache and and array cache share cache key names. It is important to use unique keys for both
as they could overwrite each other or provids unexpected results.

### Dependencies

awesome-cache only has one dependency and this is `moment`. It will reliance on this library
will likely be removed in the future, but it made programming this so much easier. 

### Contribute

If you would like to contribute to the development of this project. Feel free to fork, edit, and make a 
pull request. Please do not submit any breaking changes, but additional features or optimizations are always welcome.


