const CSV = require('csv-string');
const httpService = require('./http-service');
const jsonTransformer = require('./json-transformer');
const filterCountry = require('./filterCountry');
require('dotenv').config();
const CronJob = require('cron').CronJob;
const express = require('express');
const app = express();
const sortBy = require('lodash/sortBy');
const size = require('lodash/size');
const _ = require('lodash');
module.exports = {

    // Fetch the cases from Git based on a cronjob.
    setConfirmedCases: function() {
        const confirmedCasesJob = new CronJob('0 */1 * * * *', () => {
            console.log('CRON -> Get Confirmed Cases');
            this.getCases(process.env.CONFIRMED).then((response) => {
                app.set('confirmed', response);
            });
        }, null, true, 'America/Los_Angeles');
        confirmedCasesJob.start();
    },

    setRecoveredCases: function() {
        const recoveredCasesJob = new CronJob('0 */1 * * * *', () => {
            console.log('CRON -> Get Recovered Cases');
            this.getCases(process.env.RECOVERED).then((response) => {
                app.set('recovered', response);
            });
        }, null, true, 'America/Los_Angeles');
        recoveredCasesJob.start();
    },

    setDeathCases: function() {
        const deathCasesJob = new CronJob('0 */1 * * * *', () => {  
            console.log('CRON -> Get Death Cases');
            this.getCases(process.env.DEATHS).then((response) => {
                app.set('death', response);
            });
        }, null, true, 'America/Los_Angeles');
        deathCasesJob.start();
    },

    // Get the cases from the app instance

    getConfirmedCases: function() {
        return new Promise((resolve, reject) => {
            if (app.get('confirmed') === undefined) {
                this.getCases(process.env.CONFIRMED).then((confirmed) => {
                    resolve(confirmed);
                }).catch((error) => {
                    reject(error);
                })
            } else {
                console.log('Serving Confirmed cases from cache');
                resolve(app.get('confirmed'));
            }
        });
    },

    getConfirmedCasesByCountry: function(country) {

        // STEP 1: Try to get the data from cache
        return new Promise((resolve, reject) => {
            if (app.get('confirmed') === undefined) {
                this.getCases(process.env.CONFIRMED).then((confirmed) => {
                    resolve(filterCountry.filterCountry(confirmed, country));
                }).catch((error) => {
                    reject(error);
                })
            } else {
                // STEP 2: Get the data from cache
                const confirmed = app.get('confirmed');
                resolve(filterCountry.filterCountry(confirmed, country));
            }
        });
    },

    getRecoveredCases: function() {
        return new Promise((resolve, reject) => {
            if (app.get('recovered') === undefined) {
                this.getCases(process.env.RECOVRED).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            } else {
                console.log('Serving Recovered cases from cache');
                resolve(app.get('recovered'));
            }
        })
    },

    getRecoveredCasesByCountry: function(country) {

        // STEP 1: Try to get the data from cache
        return new Promise((resolve, reject) => {
            if (app.get('recovered') === undefined) {
                this.getCases(process.env.RECOVERED).then((recovered) => {
                    resolve(filterCountry.filterCountry(recovered, country));
                }).catch((error) => {
                    reject(error);
                })
            } else {
                // STEP 2: Get the data from cache
                const recovered = app.get('recovered');
                resolve(filterCountry.filterCountry(recovered, country));
            }
        });
    },

    getDeathcases: function() {
        return new Promise((resolve, reject) => {
            if (app.get('death') === undefined) {
                this.getCases(process.env.DEATHS).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            } else {
                console.log('Serving Death cases from cache');
                resolve(app.get('death'));
            }
        })
    },

    getDeathCasesByCountry: function(country) {

        // STEP 1: Try to get the data from cache
        return new Promise((resolve, reject) => {
            if (app.get('death') === undefined) {
                this.getCases(process.env.DEATHS).then((death) => {
                    resolve(filterCountry.filterCountry(death, country));
                }).catch((error) => {
                    reject(error);
                })
            } else {
                // STEP 2: Get the data from cache
                const death = app.get('death');
                resolve(filterCountry.filterCountry(death, country));
            }
        });
    },

    getCases: function(url) {

        return new Promise((resolve, reject) => {

            // STEP 1: GET THE CSV DATA
            httpService.get(url).then((response) => {

                // STEP 2: GET JSON FROM CSV
                arr = CSV.parse(response);
                jsonTransformer.jsonTransformer(arr).then((response) => {
                    const orderedList = sortBy(response, (obj)=> {
                        return parseInt(obj[(Object.keys(obj)[Object.keys(obj).length -1])]);
                    });

                    resolve(orderedList.reverse());
                })
            }).catch((error) => {
                reject(error);
            })
        });
        
    }

}
