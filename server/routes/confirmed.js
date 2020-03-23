const { Router } = require('express');
const router = Router();
const getCases = require('../services/getCases');

router.get('/', (req, res) => {

    getCases.getConfirmedCases().then((response) => {

        res.status(200).send({
            status: 200,
            response: response
        });
    }).catch((error) => {
        res.status(500).send('Something broke!')
    })
});

router.get('/cases', (req, res) => {

    getCases.getAllCases().then((response) => {

        res.status(200).send({
            status: 200,
            response: response
        });
    }).catch((error) => {
        res.status(500).send('Did not any data');
    })
});

router.get('/:country', (req, res) => {

    getCases.getConfirmedCasesByCountry(req.params.country).then((response) => {

        res.status(200).send({
            status: 200,
            response: response
        });
    }).catch((error) => {
        res.status(500).send('Did not find data for the country');
    })
});

module.exports = router;