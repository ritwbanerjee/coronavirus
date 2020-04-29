// const express = require('express');
const mongoose = require('mongoose');
const User = require('../db/user');

const { Router } = require('express');
const router = Router();

router.post('/', async (req, res) => {

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId
    };

    let userModel = new User(user);
    try {
        await userModel.save();
        res.send(userModel);
    } catch(err) {
        console.log(err);
        res.send(err.errors);
    }
});

module.exports = router