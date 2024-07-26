const { response } = require("express");
const { OrderBookL2_25 } = require("../models");

const saveOrderBook = async (req, res = response) => {
  const data = req.body;
  if (data.length == 0) {
    return res.status(400).json({
      msg: `No hay instrumentos en la lista para guardar `,
    });
  }
  let newOrderBookL2_25 = [];
  for (inst of data) {
    const newOrderBook = new OrderBookL2_25(inst);
    await newOrderBook.save();
    newOrderBookL2_25.push(newOrderBook);
  }
  res.status(201).json(newOrderBookL2_25);
};

const getOrderBook = async (req, res = response) => {
  const [orderBook, total] = await Promise.all([
    OrderBookL2_25.find(),
    OrderBookL2_25.countDocuments(),
  ]);
  res.status(200).json({
    total,
    orderBook,
  });
};

const getOrderBookByParam = async (req, res = response) => {
  const { value } = req.params;
  let symbol = String(value);
  const orderBookDB = await OrderBookL2_25.find({ symbol });
  if (!orderBookDB) {
    return res.status(400).json(`El orderBook ${value} no existe!`);
  } else {
    res.status(200).json({
      orderBookDB,
      symbol,
    });
  }
};

module.exports = {
  saveOrderBook,
  getOrderBook,
  getOrderBookByParam,
};
