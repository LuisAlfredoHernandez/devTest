const { response } = require("express");


// Verificar si la imagen esta seleccionada
const isImageSelected = async (req, res = response, next) => {
    if (!req.file) {
        return res.status(400).json({
            msg: "No hay imagen adjunta!"
        });
    }
    next();
}

module.exports = {
    isImageSelected
}