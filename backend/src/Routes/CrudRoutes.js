const express = require("express");
const router = express.Router();
const { CrudControllers } = require("../controllers");

const { getData, postData, deleteData, updateData } = CrudControllers;

router.get("/", getData);
router.post("/", postData);
router.put("/:id", updateData);
router.delete("/", deleteData);

module.exports = router;
