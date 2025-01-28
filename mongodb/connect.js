const dotenv = require('dotenv');
dotenv.config();

const {MongoClient} = require('mongodb');

let _db; 



const initDb = (callback) => {
    if (_db) {
        console.warn('Trying to init DB again!');
        return callback(null, _db); 
    }

    MongoClient.connect(process.env.MONGODB_URI)
        .then(client => {
            _db = client.db('sample_mflix');
            callback(null, _db);
            console.log('Connected to MongoDB');
        })
        .catch(err => {
            callback(err);
            console.log('Error connecting to MongoDB', err);
        });
};

const getDb = () => { 
    if (!_db) {
        throw Error('DB not initialized!');
    } 
    return _db;
};

module.exports = {
    initDb,
    getDb
};
