const { Router } = require('express');
const { saveResource, getResources, deleteResource, getResourceByParam } = require('../controllers/resource');
const router = Router();


router.get('/', getResources)

router.get('/:key/:value', getResourceByParam)

router.post('/', saveResource)

router.delete('/:nombreImagen', deleteResource)


module.exports = router