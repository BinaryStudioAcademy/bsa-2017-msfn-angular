const async = require('async');
const parallel = require('async/parallel');
const fetch = require('node-fetch');
const ApiError = require('./../apiErrorService');

class loadService {
    constructor() {
        this.apiPages = {
            exercises: 'https://wger.de/api/v2/exercise/?format=json&language=2&status=2&',
            exercisecategory: "https://wger.de/api/v2/exercisecategory/?",
            exerciseimage: "https://wger.de/api/v2/exerciseimage/?",
        };
    }

    loadFromUri(uri, params, callback) {
        let fetchUri = uri;

        if (params) {
            for (var prop in params) {
                fetchUri += prop + '=' + params[prop]+ '&';
            }
        }
        fetch(fetchUri)
            .then(function (response) {
                return response.json();
            })
            .then(function (responseData) {
                callback(null, responseData);
            })
            .catch(function (err) {
                callback(err, '');
            });
    }

    getAll(type, callback) {
        if (!type || !this.apiPages[type]) {
            return callback(new ApiError("Incorrect data type"));
        }
        const uri = this.apiPages[type];
        console.log(uri);
        this.loadFromUri(uri, { page: 1 }, (err, response) => {
            const pagesCount = Math.ceil(response.count / response.results.length);
            if(pagesCount>1){
            let getRequests = [];
            for (let i = 1; i <= pagesCount; i++) {
                const loadFunc = (callback) => {
                    this.loadFromUri(uri, { page: i }, callback);
                }
                console.log(loadFunc);
                getRequests.push(loadFunc);
            }
            async.parallel(getRequests,
                (err, results) => {
                    let resultsArray = [];
                    for (let i = 0; i < results.length; i++) {
                        resultsArray = resultsArray.concat(results[i].results);
                    }
                    callback(err, resultsArray);
                });
            } else {
                callback(null, response.results);
            }

        });
    }
}

module.exports = new loadService();
