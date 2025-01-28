const router = require('express').Router();
const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createOne);

router.put('/:id', contactsController.updateOne);

router.delete('/:id', contactsController.deleteOne);

module.exports = router;

