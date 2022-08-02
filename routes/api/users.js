const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// @route   GET api/users
// @desc    Register a user
// @access  Public
router.post(
    "/",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Email is required").isEmail(),
        check("password", "Worng Password").isLength({ min: 8 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        try {
            // See User exit or not
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    errors: [{ msg: "User Already registered" }],
                });
            }
            // Get user gravatar
            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm",
            });

            user = new User({
                name,
                email,
                avatar,
                password,
            });
            // Encrypt Password

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            // Return JSONwebToken
            res.send("User registered");
        } catch (err) {
            console.log(err.message);
            res.status(500).send("server error");
        }
    }
);

module.exports = router;
