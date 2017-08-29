const async = require('async');
const parallel = require('async/parallel');
const fetch = require('node-fetch');


class exerciseLoadService {

    constructor() { }

    loadFromUri(uri, params, callback) {
        let fetchUri = uri;

        if (params) {
            for (var prop in params) {
                fetchUri += '&' + prop + '=' + params[prop];
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
                console.log(err);
            });
    }

    getFormatedData(data) {
        let resultsArray = [];
        for (let i = 0; i < data.length; i++) {
            resultsArray = resultsArray.concat(data[i].results);
        }
        console.log(resultsArray.length);    
        
        return true;
    }

    getAllExercises(callback) {
        const uri = 'https://wger.de/api/v2/exercise/?format=json&language=2&status=2';
        this.loadFromUri(uri, { page: 1 }, (err, response) => {
            const pagesCount = Math.ceil(response.count / response.results.length);
            let getRequests = [];
            for (let i = 1; i <= pagesCount; i++) {
                const loadFunc = (callback)=>{
                    this.loadFromUri(uri, { page: i }, callback);
                }
                console.log(loadFunc);
                getRequests.push(loadFunc);
            }
            // console.log(getRequests);
            async.parallel(getRequests,
                // optional callback
                (err, results) => {
                    // console.log(err);
                    // console.log(results);
                    this.getFormatedData(results);
                    callback(err, results);
                });
        });
        
    }

}

module.exports = new exerciseLoadService();