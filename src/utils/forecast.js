const request = require('request')

const forecast = (longitute,latitude,cb) => {
    const url = 'https://api.darksky.net/forecast/0c939fe15f3b7c135dc23ecf5e263ffe/'+ encodeURIComponent(longitute) + ',' + encodeURIComponent(latitude)
    request({url,json:true}, (err,{body})=>{
        if(err){
            cb('Unable to connect to the location service !!', undefined)
        } else if(body.error){
            cb('The location is not found', undefined)
        }else{
            cb(undefined,'The weather is ' + body.daily.data[0].summary + ' with the temperature '+body.currently.temperature+' and the rain chance is ' +body.currently.precipProbability)
            
        }
    })
}
module.exports = forecast