
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

const createOne = async (req, res) => {
    const {firstName, lastName, email, favoriteColor, birthday } = req.body;
    const newContact = { firstName, lastName, email, favoriteColor, birthday };
    const db = mongodb.getDb();
    const response = await db.collection('Contacts').insertOne(newContact);
    if (response.acknowledged) {
        res.status(201).json(newContact);
    } else {
        res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = { getAll, getSingle, createOne };