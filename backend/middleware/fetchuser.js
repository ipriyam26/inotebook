const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = "random778array0394"

const fetchuser = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (err) {
        return res.status(400).json({ msg: "Token is not valid" });
    }};

module.exports = fetchuser;