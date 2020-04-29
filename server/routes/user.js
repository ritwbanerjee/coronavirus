const User = require('../db/user');
const { Router } = require('express');
const router = Router();
router.post('/create', (req, res) => {

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        role: req.body.role
    };

    let userModel = new User(user);
    try {
        User.findOne({
            "emailId": req.body.emailId
        }, (err, record) => {
            if (err) res.status(500).send(err);
            if (record) {
                res.status(500).send()
            } else {
                userModel.save().then((response) => {
                    res.send();
                }).catch((err) => {
                    res.status(500).send({
                        body: err.message
                    });
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

router.get('/get', (req, res) => {
    User.find({ "emailId": "ritwik2011@gmail.com" }, function (err, users) {
        res.send({ users: users });
    });
})

module.exports = router