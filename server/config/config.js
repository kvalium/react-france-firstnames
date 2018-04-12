const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_DB = process.env.MONGO_DB || 'prenoms';
const MONGO_AUTH = process.env.MONGO_AUTH || false;

let auth = MONGO_AUTH ? MONGO_AUTH + '@' : '';

module.exports = {
    db: 'mongodb://' + auth + MONGO_HOST + ':' + MONGO_PORT + '/' + MONGO_DB
};
