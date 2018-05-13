
//const Cache = require('awesome-cache');
const Cache = require('./');
const cache = new Cache({
    // optional. In ms. Defaults to 1000
    cleanInterval:100
});

async function main(){
    // using the basic cache
    console.log(''); // just to leave a space
    console.log(`***  Basic Cache ***`);
    console.log(`Adding value "world" to cache "hello" for 2 seconds`);
    cache.addCache('hello', 'world', 2);

    console.log('Waiting 1 seconds');
    await delay(1000);

    console.log(`Getting cache for "hello"`);
    let hello = cache.getCache('hello');
    if(hello){
        console.log(`"hello" has a value of "${hello}"`);
    } else {
        console.log('"hello" is not in cache');
    }

    console.log('Waiting 1.5 seconds, 2.5 total');
    await delay(1500);

    console.log(`Getting cache for "hello"`);
    hello = cache.getCache('hello');
    if(hello){
        console.log(`"hello" has a value of "${hello}"`);
    } else {
        console.log('"hello" is not in cache');
    }

    //using array cache
    console.log(''); // just to leave a space
    console.log(`***  Array Cache ***`);
    console.log('Creating cache array "count" with an array length of 10. Adding numbers 1-20 to it');
    for(let i = 1; i <= 20; i++){
        cache.addToCacheArray('count', i, 10);
    }
    console.log('Getting array "count"');
    console.log('count:', cache.getCache('count'));
    console.log('Numbers 1 - 10 have been overflowed');


    console.log(`Destroying cache so process can exit on its own`);
    cache.destroy();
}

// a simple delay function
function delay(ms){
    return new Promise(resolve =>{
        setTimeout(()=>{resolve()}, ms);
    });
}

// call main
main();
