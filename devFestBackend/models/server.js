const { dbConnection } = require("../database/config.database");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.paths = {
      instruments: "/api/instruments",
      orderBook: "/api/orderbook",
    };
    this.middleware();
    this.conectarDB();
    this.routes();
  }

  async conectarDB() {
    dbConnection();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  routes() {
    this.app.use(this.paths.instruments, require("../routes/instruments"));
    this.app.use(this.paths.orderBook, require("../routes/orderBook"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(this.port);
    });
  }
}

module.exports = Server;
