"use strict";
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const morgan = require("morgan");

morgan.token("date", function (req, res) {
  return new Date();
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :date")
);

app.use(
  cors({
    exposedHeaders: ["Content-Length"],
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send({ message: "REST API AIDO" });
});

const { CrudRoutes } = require("./src/Routes");

app.use("/insurance", CrudRoutes);

app.all("*", (req, res) => {
  res.status(404).send({ message: "resource not found" });
});

app.listen(PORT, () => console.log(`listen in PORT ${PORT}`));
