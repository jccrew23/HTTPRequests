
const mongodb = require('../mongodb/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.db.collection('NodeAPILearnCSE341').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(lists);
    });
};

module.exports = { getAll };