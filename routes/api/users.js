const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route   GET api/users
// @desc    Register a user
// @access  Public
router.post("/",[
    check("name","Name is required").not().isEmpty(),
    check("email","Email is required").isEmail(),
    check("password","Worng Password").isLength({min:8}),
],(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    res.send("User route");
});

module.exports = router;
