const request = require('request')
// address -> weather -> features -> body -> long/lat
const geocode = (address, cb) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmVyYmlvdXMiLCJhIjoiY2s3bHhkNDltMGNvazNmcWc5MDRreHJ5bCJ9.L-n7_rDG5WnjMyAiS0oFmw&limit=1'
       request ({ url, json:true}, (err,{ body })=>{
           if(err){
               cb('Unable to connect to location services!',undefined)
           }else if(body.features.length === 0){
               cb('The location does not exist !. Try another search',undefined)
           }else{
               cb(undefined,{
                   latitude: body.features[0].center[1],
                   longitude: body.features[0].center[0],
                   location: body.features[0].place_name
               })
           }
       })
   
   }
module.exports = geocode
