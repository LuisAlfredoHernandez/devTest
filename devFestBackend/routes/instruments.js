const { Router } = require("express");
const {
  getInstruments,
  getInstrumentByParam,
  saveInstruments,
} = require("../controllers/instruments");
const router = Router();

router.get("/", getInstruments);

router.get("/:value", getInstrumentByParam);

router.post("/", saveInstruments);

module.exports = router;
