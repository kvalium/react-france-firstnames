// REDIS cache server init
const 
    REDIS_HOST = process.env.REDIS_HOST || 'localhost',
    REDIS_PORT = process.env.REDIS_PORT || 6379,
    colors = require('colors'),
    models = require('../models/prenom'),
    franceModel = models.franceModel,
    
    redis = require('redis').createClient(
        REDIS_PORT,
        REDIS_HOST,  
        {
            no_ready_check: true
        }
    );

redis.on('ready', (err) => {
    if(err){
        console.log('Redis Server error: ' + err);
        return 1;
    }
    console.log('✅ Redis connection established.');
    // load redis data
    LoadRedis().then((nb) => {
        console.log(colors.bold.green('🚀 ' + nb + ' Prenom loaded on Redis.'));
    });

});


/***
 * Load Redis cache data with prenom list
 *
 * @returns {Promise<any>}
 * @constructor
 */
const LoadRedis = () => {
    return new Promise(resolve => {
        const prenoms = franceModel.distinct('prenom');
        prenoms.exec(function(err, prenoms){
            prenoms.forEach(function(element){
                redis.set(element, element);
            });
            resolve(prenoms.length);
        });
    });
}

/***
 * Redis Search Promise
 *
 * @param val search pattern
 * @returns {Promise<any>} Prenom list
 * resolve will returns 2 params:
 * * results - Redis cache results
 * * timer - Redis query execution time (ms)
 */
const searchRedis = (val) => {
    const start = new Date().getTime();
    return new Promise(resolve => {
        redis.keys(val + '*', (err, reply) => {
            const end = new Date().getTime(), time = end - start;
            resolve({
                results: reply,
                timer: time
            });
        });
    });
}

// export functions
module.exports = {
    searchRedis: searchRedis
};