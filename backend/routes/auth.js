const express = require("express");
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const router = express.Router();
var jwt = require('jsonwebtoken');
const User = require("../models/users");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "random778array0394"
//setting up signup route for the app
router.post("/createuser",
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Email is required').isEmail(),
    body('password', 'Password is required').isLength({ min: 5 }).not().isEmpty(),
   async (req, res) =>  {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ msg: "Email already in use" });
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: secPass
                }
            )
            const data = {
                user:{
                    id: user._id,
                }
            }
            //sign data with jwt and send it to the client
            const access_token = jwt.sign(data,JWT_SECRET);

            return res.status(200).json({access_token});

        }  catch (err) {
           // print thhe error to console
            console.log(err);
        }

    });

    //setting up login route for the app
router.post("/login",
    body('email', 'Email is required').isEmail(),
    body('password', 'Password is required').isLength({ min: 5 }).not().isEmpty(),
    async (req, res) =>  {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ msg: "Please login with correct Credentials" });
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Please login with correct Credentials" });
            }
            const data = {
                user:{
                    id: user._id,
                }
            }
            //sign data with jwt and send it to the client
            const access_token = jwt.sign(data,JWT_SECRET);
            return res.status(200).json({access_token});
        }  catch (err) {
              // print thhe error to console
            console.log(err);
            return res.status(500).json({ msg: "Server error" });

        }
    });

router.get("/getuser",
fetchuser,
async(req,res)=>{
try{
    const userID = req.user.id;
    const user = await User.findById(userID).select('-password');
    return res.status(200).json(user);
}
catch{
    return res.status(500).json({msg:"Server error"});
}
}
)


module.exports = router;