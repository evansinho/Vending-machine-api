import express from "express";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import pkg from 'express-validator';
const { check, validationResult} = pkg;

dotenv.config();
const SECRET = process.env.SECRET;

const router = express.Router();

router.post("/users", [
  check("username", "UserName is Required").not().notEmpty(),
  check("password", "Please enter a password with six or more characters").isLength({min: 6})
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const { username, password, deposit, role } = req.body;

    let user = await User.findOne({ username });
    if (user) return res.status(400).json({errors: [{ msg: "User already exist"}]});

    user = new User({
      username,
      password,
      deposit,
      role
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET, {
      expiresIn: "24h"
    });
    return res.status(200).json({ token })
  } catch (e) {
    console.error(e.message);
    res.status(500).json("server error")
  }
})

export default router;