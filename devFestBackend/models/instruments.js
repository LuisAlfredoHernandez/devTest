const { model, Schema } = require("mongoose");

const Instruments = Schema({
  deleverage: {
    type: Boolean,
  },
  hasLiquidity: {
    type: Boolean,
  },
  instantPnl: {
    type: Boolean,
  },
  isInverse: {
    type: Boolean,
  },
  isQuanto: {
    type: Boolean,
  },
  lastChangePcnt: {
    type: Number,
  },
  lastPrice: {
    type: Number,
  },
  lastTickDirection: {
    type: String,
  },
  markMethod: {
    type: String,
  },
  markPrice: {
    type: Number,
  },
  openValue: {
    type: Number,
    default: 0,
  },
  prevPrice24h: {
    type: Number,
  },
  publishInterval: {
    type: Date,
  },
  quoteCurrency: {
    type: String,
  },
  reference: {
    type: String,
  },
  referenceSymbol: {
    type: String,
  },
  rootSymbol: {
    type: String,
  },
  state: {
    type: String,
  },
  symbol: {
    type: String,
  },
  taxed: {
    type: Boolean,
    default: false,
  },
  tickSize: {
    type: Number,
  },
  timestamp: {
    type: Date,
  },
  typ: {
    type: String,
  },
  underlying: {
    type: String,
  },
  underlyingSymbol: {
    type: String,
  },
});

module.exports = model("Instruments", Instruments);
