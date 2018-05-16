const moment = require('moment');
class Cache{
    constructor(opts = {}){
        this.cleanInterval = opts.cleanInterval || 1000;
        this._timer = null;
        this._mainCache = {};
        this._cleanupRunning = false;
        this._startTimer();
    }

    _startTimer(){
        const self = this;
        this._timer = setInterval(() =>{
            if(!(this._cleanupRunning)){
                this._cleanupRunning = true;
                self._cacheCleanup();
                this._cleanupRunning = false;
            }
        }, self.cleanInterval);
    }

    _cacheCleanup(){
        for(let key in this._mainCache){
            // only cleanup ones with an expire time
            if(this._mainCache[key].expireTime !== null){
                // check if cache has expired
                if(moment().isAfter(this._mainCache[key].expireTime)){
                    // remove this key
                    delete this._mainCache[key];
                }
            }
        }
    }

    addCache(key, value, expireSeconds = null){
        this._mainCache[key] = {
            value:value,
            expireTime:expireSeconds ? moment().add(expireSeconds, 'seconds') : null,
            arrayLength:null
        }
    }

    addToCacheArray(key, value, arrayLength = 10){
        // see if key in array
        if(!(key in this._mainCache)){
            // cache not created, create it
            this._mainCache[key] = {
                value:[],
                expireTime:null,
                arrayLength:arrayLength
            };
            this._mainCache[key].value.push(value);
        } else {
            // this key array exists. Add to it
            if(this._mainCache[key].arrayLength !== null){
                // add it to value
                this._mainCache[key].value.push(value);
                // clean up any beyond array limit
                while(this._mainCache[key].value.length > this._mainCache[key].arrayLength){
                    // trim it
                    this._mainCache[key].value.shift();
                }
            } else {
                // this key does not have an array limit / not an array
                console.log(`awesome-cache key dump [${key}]:`, this._mainCache[key]);
                throw(`awesome-cache error: Tried to addToCacheArray(${key},${value}) to a non array cache`)
            }
        }
    }

    clearCache(key = null){
        if(key){
            // if a key was passed, only remove that key
            delete this._mainCache[key];
        } else {
            // delete entire cache
            this._mainCache = {};
        }
    }

    getCache(key){
        if(key in this._mainCache){
            return this._mainCache[key].value;
        } else {
            return null;
        }
    }

    hasCache(key){
        return key in this._mainCache;
    }

    destroy(){
        try{
            clearInterval(this._timer);
            this._mainCache = {};
        } catch(e){
            //stfu
        }
    }

}

module.exports = Cache;