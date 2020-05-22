const request = require('postman-request');

const forecast = (lati, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ec0aaabe1e80c461b0d97340284ba945&query='+ lati +','+ long +'&units=m';
    request({url, json: true}, (err, response) =>{
        if(err){
            callback('mohon cek kembali koneksi anda', undefined);
        }else if(response.body.current.error){
            callback('mohon cek kembali longitude anda', undefined)
        }else{
            callback(undefined,{
                lati: response.body.location.lat,
                long: response.body.location.lon,
                alamat: response.body.location.name,
                temperature: response.body.current.temperature
            })
        }
    }) 
}

module.exports = forecast





