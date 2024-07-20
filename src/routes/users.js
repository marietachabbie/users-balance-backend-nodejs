const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/:id', userController.updateBalance);

module.exports = router;
