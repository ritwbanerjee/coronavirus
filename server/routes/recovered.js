const { Router } = require('express');
const router = Router();
const getCases = require('../services/getCases');

router.get('/', (req, res) => {
    getCases.getRecoveredCases(process.env.RECOVERED).then((response) => {
        res.send({
            status: 200,
            message: response
        });
    });
});

router.get('/:country', (req, res) => {

    getCases.getRecoveredCasesByCountry(req.params.country).then((response) => {

        res.status(200).send({
            status: 200,
            response: response
        });
    }).catch((error) => {
        res.status(500).send('Did not find data for the country');
    })
});

module.exports = router;