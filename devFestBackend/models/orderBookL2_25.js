const { model, Schema } = require("mongoose");

const OrderBookL2_25 = Schema({
  price: {
    type: Number,
    required: [true, "El precio es requerido!"],
  },
  size: {
    type: String,
  },
  Symbol: {
    type: String,
    required: [true, "El simbolo del recurso es requerido!"],
  },
  timestamp: {
    type: Date,
  },
  transactTime: {
    type: Date,
  },
});

module.exports = model("orderBook", OrderBookL2_25);
