const Character = require("../models/character");

const { body, query, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.get = [
  query("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  query("x", "x coordinate must be specified").trim().isLength({ min: 1 }).escape(),
  query("y", "y coordinate must be specified").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const character = await Character.findOne({ "name": req.query.name }).exec();
    if (!errors.isEmpty()) {
      res.sendStatus(500)
    }
    else {
      console.log(req.query)
      if (req.query.x >= character.x1 && req.query.x <= character.x2 && req.query.y >= character.y1 && req.query.y <= character.y2) {
        res.json({ status: 'Success' })
      }
      else {
        res.sendStatus(500)
      }
    }
  }),];