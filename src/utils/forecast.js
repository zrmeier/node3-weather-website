const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9ec2ec4db2a263478c422ee1c33d6174/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude)

    request({ url, json: true }, (error, { body}) =>{
        if(error) {
            callback('Unable to connect to forecasting service!', undfined)
        }else if (body.error) {
            callback(body.error, undefined)
        }else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out.  There is a ' + body.currently.precipProbability + '% chance of rain for today.')
        }

    })
}

module.exports = forecast


