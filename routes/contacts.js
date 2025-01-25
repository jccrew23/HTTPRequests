const router = require('express').Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

module.exports = router;

