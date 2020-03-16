const { Router } = require('express');
const router = Router();
const getCases = require('../services/getCases');

router.get('/', (req, res) => {

    getCases.getCases(process.env.CONFIRMED).then((response) => {
        res.send({
            status: 200,
            message: response
        });
    }).catch((error) => {
        res.status(500).send('Something broke!')
    })
});

module.exports = router;