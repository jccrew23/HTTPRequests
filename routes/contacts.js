const router = require('express').Router();
const contactsController = require('../controllers/contacts');

const idLength = 24;

/**  
    * @swagger
    * components:
    *   schemas:
    *       Contact:
    *           type: object
    *           required:
    *               - firstName
    *               - lastName
    *               - email
    *               - favoriteColor
    *               - birthday
    *           properties:
    *               _id:
    *                   type: string
    *                   description: The auto-generated id of the contact
    *               firstName:
    *                   type: string
    *                   description: The first name of the contact
    *               lastName:
    *                   type: string
    *                   description: The last name of the contact
    *               email:
    *                   type: string
    *                   description: The email of the contact
    *               favoriteColor:
    *                   type: string
    *                   description: The favorite color of the contact
    *               birthday:
    *                   type: string
    *                   description: The birthday of the contact
    *           example:
    *               _id: "5f8b3e3d6f3d8f0017e2e7e6"
    *               firstName: "John"
    *               lastName: "Doe"
    *               email: "jdoe@gmail.com"
    *               favoriteColor: "blue"
    *               birthday: "1990-01-01"
*/
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieve a list of contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Contact'
 */

router.get('/', contactsController.getAll);


/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a contact by ID
 *     description: Retrieve a single contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: The id of the contact to retrieve
 *     responses:
 *       200:
 *         description: A single contact
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Contact'
 *       404:
 *         description: The contact was not found
 */
router.get('/:id', contactsController.getSingle);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new contact
 *     description: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: The contact was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       500:
 *         description: An error occurred
 */
router.post('/', contactsController.createOne);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a contact
 *     description: Update a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the contact to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: The contact was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: The contact was not found
 *       500:
 *         description: An error occurred
 */
router.put('/:id', contactsController.updateOne);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a contact
 *     description: Delete a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the contact to delete
 *     responses:
 *       204:
 *         description: The contact was successfully deleted
 *       404:
 *         description: The contact was not found
 */
router.delete('/:id', contactsController.deleteOne);

module.exports = router;

