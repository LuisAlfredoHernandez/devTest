const { Router } = require('express');
const { saveUser, deleteUser } = require('../controllers/users');
const { textFieldsValidation } = require('../middlewares/textFieldValidator');

const router = Router();

router.post('/', [
    textFieldsValidation
], saveUser)

router.delete('/:nombre', [
    textFieldsValidation
], deleteUser)

module.exports = router