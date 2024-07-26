const { response } = require("express")
const { User, Resource } = require("../models")


const saveUser = async (req, res = response) => {
    const nombre = req.body.nombre
    const usuarioDB = await User.findOne({ nombre })
    if (usuarioDB) {
        return res.status(400).json({
            msg: `Usuario: ${usuarioDB.nombre} ya existe `
        })
    }
    const data = { nombre }
    const usuario = new User(data)
    await usuario.save();
    res.status(201).json(usuario)
}

const deleteUser = async (req, res = response) => {
    const { nombre } = req.params
    const usuario = await User.findOne({ nombre })
    if (!usuario) {
        return res.status(404).json({
            msg: 'No se encontro usuario!'
        })
    }
    const query = { usuario: usuario._id }
    const [resources, total] = await Promise.all([
        Resource.find(query),
        Resource.countDocuments(query)
    ])
    const usuarioEliminado = await User.findByIdAndDelete(usuario._id)
    for (let i = 0; i < resources.length; i++) {
        await Resource.findByIdAndDelete(resources[i]._id)
    }
    res.status(200).json({
        msg: `Se elimino el usuario: ${usuarioEliminado}, y ${13} recurssos`,
        usuarioEliminado,
        resources,
        total,
    })
}


const d = (second) => { third }

module.exports = {
    saveUser,
    deleteUser
}