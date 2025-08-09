const express = require('express');
const { sign } = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = require('../config');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const { User } = require('../db');

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})
// /api/v1/user/signup
router.post("/signup", async (req, res) => {
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);

    if (!success) {
        return res.json({
            message: "Invalid input"
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

router.post("/signin", async (req, res) => {
    /*    This is a placeholder for the signin route.
    You can implement the logic to verify the user

    const { username, password } = req.body;

    if (!username || !password) {
        req.json({
            message: "Username and password are required"
        });
    };
    */

    // we are doing the validation using zod

    const SignInSchema = zod.object({
        username: zod.string(),
        password: zod.string()
    })

    const {success} = SignInSchema.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Invalid input"
        });
    };

    const user = await User.findOne({
        username: req.body.username
    })

    if(!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if(user) {
        if(user.password !== req.body.password) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        return res.json({
            message: "User signed in successfully",
            token: token
        }); 
    }

})

module.exports = router;