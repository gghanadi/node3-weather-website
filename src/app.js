const path = require('path');
const express = require('express');
const hbs = require('hbs');
const partialsPath = path.join(__dirname, '../templates/partials');
const viewPath = path.join(__dirname,'../templates/views');
const publicDirectory = path.join(__dirname, '../public');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// console.log(__dirname); 
// console.log(path.join(__dirname, '../public'));
// fungsi di atas untuk mengubah atau memanupulasi directory atau letak file 
// dan disini yang mau di manipulasi adalah file html ini juga berlaku untuk css dan data base nya kalo mau di pisah


const app = express();
app.set('view engine','hbs');
app.set('views', viewPath);
// fungsi di atas jika view berada di folder templates maka harus di set dulu seperti contoh di atas
hbs.registerPartials(partialsPath);
//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('Home',{
        tittle: 'Applikasi Cuaca',
        nama: 'Gannets ghanadi'
    })
}) 

app.get('/about',(req, res) => {
    res.render('about', {
        tittle: 'Applikasi Cuaca',
        nama: 'gannets ghaandi',
        tanggallahir: '2 Juni 1994'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        tittle: 'Applikasi Cuaca',
        judul: 'pertolongan'
    })
})

app.get('/cuaca', (req,res) => {
    if(!req.query.alamat){
        res.send({
            error:'maaf alamat yang anda masukan tidak ada mohon di masukan kembali'
        })
    }
    geocode(req.query.alamat, (error, {latitude, longitude, Location} = {}) =>{
        if(error){
            return res.send({error} )
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                res.send( {error} )
            }
            res.send({
                forecast: forecastData,
                Location,
                addres: req.query.alamat
            })
        })
    })
})

app.get('/produk', (req, res) =>{
    if(!req.query.search){
        res.send({
            error: 'kamu harus menulis kalimat di searc'
        })
    
    }else{
        console.log(req.query.search);
        res.send({
        produk: []
        })
    }
})

//jika server 3000 berjalan dan tidak ada atau ke halaman di atas  (exp cuca, home) maka akan mucul kata seperti di bawah
app.get('/help/*', (req, res) => {
    res.render('404',{
        tittle: 'Applikasi Cuaca',
        errormsg: 'Halaman help'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        tittle: 'Applikasi Cuaca',
        errormsg: 'Halaman utama'
    })
})



app.listen(3000, () => {
    console.log('Server Berjalan di port 3000')
})