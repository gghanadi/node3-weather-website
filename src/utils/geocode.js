const request = require('postman-request');

const geocode = (alamat, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(alamat) +'.json?access_token=pk.eyJ1IjoiZ2FubmV0cyIsImEiOiJjazlyOGJwOTQwcnB0M21xeHZ0ZXd4NjVsIn0.4sNUoFLQh01yrxYUD3_dCw&limit=1';
    request({url, json: true}, (err,response) =>{
        if(err){
            callback('mohon cek kembali internet anda', undefined)
        }else if (response.body.features.length === 0){
            callback('ada yang rusak di bagian api atau longitude', undefined)
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode