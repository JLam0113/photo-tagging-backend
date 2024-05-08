const Character = require("../models/character");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.get = [
  body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
  body("x", "x coordinate must be specified").trim().isLength({ min: 1 }).escape(),
  body("y", "y coordinate must be specified").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const character = await Character.findOne({ "name": req.body.name }).exec();
    if (!errors.isEmpty()) {
      res.sendStatus(500)
    }
    else {
      if (req.body.x >= character.x1 && req.body.x <= character.x2 && req.body.y >= character.y1 && req.body.y <= character.y2) {
        res.json({ status: 'Success' })
      }
      else {
        res.sendStatus(500)
      }
    }
  }),];