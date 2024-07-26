const { Router } = require("express");
const {
  getOrderBook,
  getOrderBookByParam,
  saveOrderBook,
} = require("../controllers/orderBook");
const router = Router();

router.get("/", getOrderBook);

router.get("/:value", getOrderBookByParam);

router.post("/", saveOrderBook);

module.exports = router;
