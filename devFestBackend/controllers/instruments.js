const { response } = require("express");
const { Instruments } = require("../models");

const saveInstruments = async (req, res = response) => {
  const data = req.body.Instruments;
  if (data.length == 0) {
    return res.status(400).json({
      msg: `No hay instrumentos en la lista para guardar `,
    });
  }
  let newInstruments = [];
  for (inst of data) {
    const insturment = { inst };
    const newInstrument = new Instruments(insturment);
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
  let nombre = String(value);
  const instrumentsDB = await Instruments.find({ nombre });
  if (!instrumentsDB) {
    return res.status(400).json(`El instrumento ${value} no existe!`);
  } else {
    let query = { insrtumento: instrumentsDB._id };
    const [instruments, total] = await Promise.all([
      Instruments.find(query),
      Instruments.countDocuments(query),
    ]);
    res.status(200).json({
      instruments,
      total,
      query,
    });
  }
};

module.exports = {
  saveInstruments,
  getInstruments,
  getInstrumentByParam,
};
