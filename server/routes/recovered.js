const { Router } = require('express');
const router = Router();
const getCases = require('../services/getCases');

router.get('/', (req, res) => {
    getCases.getCases(process.env.RECOVERED).then((response) => {
        res.send({
            status: 200,
            message: response
        });
    });
});

module.exports = router;