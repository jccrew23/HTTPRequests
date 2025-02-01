
const { BSON } = require('mongodb');
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
    let id = req.params.id;
    id = `${id}`;
    console.log(id);
    const userId = new ObjectId(id);
    
    console.log(userId);
    const db = mongodb.getDb();
    const result = await db.collection('Contacts').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(lists[0]);
    });

    if (!result) {
        res.status(404).json({ error: 'Contact not found' });
    };

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

const updateOne = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const updatedContact = { firstName, lastName, email, favoriteColor, birthday };

    const db = mongodb.getDb();
    const response = await db.collection('Contacts').updateOne({ _id: userId }, { $set: updatedContact });
    if (response.acknowledged) {
        res.status(200).json(updatedContact);
    } else {
        res.status(500).json({ error: 'An error occurred' });
    }
};

const deleteOne = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const response = await db.collection('Contacts').deleteOne({ _id: userId });
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'An error occurred' });
    }
}



module.exports = { getAll, getSingle, createOne, updateOne, deleteOne };