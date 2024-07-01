const express = require("express");
const router = express.Router();
const User = require("./models/users");
const Sentry = require("@sentry/node");

router.post("/users", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);

        Sentry.captureEvent({
            message: "New User Created",
            level: "info",
            user: newUser._id                
        })
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id });
        if(!user){
            return res.status(404).json();
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.patch("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedUser) {
            return res.status(404).json("not found");
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }

});

router.delete("/users/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if(!deletedUser){
            res.status(404).json("not found");
        }
        res.status(200).json("Successfully deleted");
    } catch (error) {
            res.status(400).json(error);
    }
});

module.exports = router;