const { response } = require("express");
const { Instruments } = require("../models");

const saveInstruments = async (req, res = response) => {
  const data = req.body;
  if (data.length == 0) {
    return res.status(400).json({
      msg: `No hay instrumentos en la lista para guardar `,
    });
  }
  let newInstruments = [];
  for (inst of data) {
    const newInstrument = new Instruments(inst);
    await newInstrument.save();
    newInstruments.push(newInstrument);
  }
  res.status(201).json(newInstruments);
};

const getInstruments = async (req, res = response) => {
  const [instruments, total] = await Promise.all([
    Instruments.find(),
    Instruments.countDocuments(),
  ]);
  res.status(200).json({
    total,
    instruments,
  });
};

const getInstrumentByParam = async (req, res = response) => {
  const { value } = req.params;
  let symbol = String(value);
  const instrumentsDB = await Instruments.find({ symbol });
  if (!instrumentsDB) {
    return res.status(400).json(`El instrumento ${value} no existe!`);
  } else {
    res.status(200).json({
      instrumentsDB,
      symbol,
    });
  }
};

module.exports = {
  saveInstruments,
  getInstruments,
  getInstrumentByParam,
};
