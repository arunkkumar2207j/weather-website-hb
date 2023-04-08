const request = require('request');

const geoCode = (address, callback) => { 
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJ1bmthbWJsZSIsImEiOiJjbGc2YmYzemQwYnV5M2ZwODdvMzFsYjhwIn0.xdT0Lb-TUx1Oh6FTCYKvuQ`;
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to network')
        } else if(response.body.message !== undefined) {
            callback(response.body.message);
        } else if(response.body.features.length === 0) {
            callback(`This location "${response.body.query[0]}" does not exist`);
        } else {
            const latitude = response.body.features[0].center[1];
            const longitude = response.body.features[0].center[0];
            callback(undefined, {latitude, longitude});
        }
    })
}

module.exports = geoCode;