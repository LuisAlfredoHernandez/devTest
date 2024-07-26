const { response } = require("express");
const { Resource, User } = require("../models");


const saveResource = async (req, res = response) => {
    try {
        const nombre = req.body.nombre;
        const usuario = await User.findOne({ nombre })
        if (!usuario) {
            return res.status(404).json({
                msg: `No se encontro el usuario:${usuario}`
            })
        }
        const resourceToUploadObject = {
            nombreImagen: req.body.nombreImagen,
            descripcion: req.body.descripcion,
            tipo: req.body.tipo,
            usuario: usuario._id,
            src: req.body.src
        };
        const uploadObject = new Resource(resourceToUploadObject);
        await uploadObject.save();
        res.status(201).json(uploadObject)

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

const getResources = async (req, res = response) => {
    const { limite, desde } = req.query
    const [resources, total] = await Promise.all([
        Resource.find()
            .skip(desde)
            .limit(limite),
        Resource.countDocuments()
    ])
    res.status(200).json({
        total,
        resources
    })
}


const getResourceByParam = async (req, res = response) => {
    const { key, value } = req.params
    let query = {};

    if (key === 'usuario') {
        let nombre = String(value)
        const nombreDB = await User.findOne({ nombre })
        if (!nombreDB) {
            return res.status(400).json(`El usuario ${value} no existe!`)
        } else {
            query = { usuario: nombreDB._id }
        }
    } else if (key === 'tipo') {
        query = { tipo: value }
    } else if (key === 'nombreImagen') {
        query = { nombreImagen: value }
    }

    const [resources, total] = await Promise.all([
        Resource.find(query),
        Resource.countDocuments(query)
    ])

    res.status(200).json({

        resources, total, query
    })
}

const deleteResource = async (req, res = response) => {
    const { nombreImagen } = req.params
    const resource = await Resource.findOne({ nombreImagen })
    if (!resource) {
        return res.status(404).json({
            msg: 'No se encontro el recurso!',
        })
    }
    const id = resource._id;
    const recursoEliminado = await Resource.findByIdAndDelete(id)
    res.status(200).json({
        msg: 'Recurso Eliminado!',
        recursoEliminado,
    })

}


module.exports = {
    getResources,
    deleteResource,
    saveResource,
    getResourceByParam
}