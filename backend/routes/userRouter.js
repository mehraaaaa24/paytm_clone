const express = require('express');
const { sign } = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = require('../config');
const jwt = require('jsonwebtoken');
const zod = require('zod');

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

router.post("/signup", async (req, res) => {
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);

    if (!success) {
        return res.json({
            message: "Invalid input/ user already taken"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.json({
            message: "User already exists"
        });
    }

    const dbUser = await User.create(body);
    
    const userId = dbUser._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        message: "User created successfully",
        token: token
    })
});

module.exports = router;