
const mongodb = require('../mongodb/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {

    const db = mongodb.getDb();
    const result = await db.collection('Contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(lists);
    });
};

const getSingle = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const result = await db.collection('Contacts').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

module.exports = { getAll, getSingle };