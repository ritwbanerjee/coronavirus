const CSV = require('csv-string');
const httpService = require('./http-service');
const jsonTransformer = require('./json-transformer');
require('dotenv').config();

module.exports = {

    getCases: function(url) {
        return new Promise((resolve, reject) => {

            // STEP 1: GET THE CSV DATA
            httpService.get(url).then((response) => {

                // STEP 2: GET JSON FROM CSV
                arr = CSV.parse(response);
                jsonTransformer.jsonTransformer(arr).then((response) => {
                    resolve(response);
                })
            }).catch((error) => {
                reject(error);
            })
        });
        
    }

}
