const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f4fe5c7ac6294ec0ff663fe594d39bdc&query=${lat}, ${long}&units=m`;
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect');
        } else if(response.body.error) {
            callback('Unable to connect' + response.body.error);
        } else {
            const data = response.body;
            console.log('data', data);
            const temperature = data.current.temperature;
            const feelslike = data.current.feelslike
            callback(undefined, {temperature, feelslike});
        }
    })
}

module.exports = forecast;