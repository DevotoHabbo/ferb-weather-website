const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// using express as app.
const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
// Set up template view engine
app.set('view engine','ejs')
app.set('views',viewsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))


// path:'/'
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ferb'
    })
})
// app.com/help
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Ferb'
    })
})
// app.com/about
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Ferb'
    })
})

// app.com/weather
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
   geocode(req.query.address,(err,{latitude,longitude,location}= {})=>{
       if(err){
           return res.send({err})
       }
       forecast(latitude,longitude,(err,forecastData)=>{
        if(err){
            return res.send({err})
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
       })
   })
    // res.send({
    //    forecast: 'It is snowing',
    //    location:'Louisville',
    //    address: req.query.address
    // })
})
//
app.get('/products', (req,res)=>{
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})
//
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Article is not found',
        text:'The article that you are looking for in Help section does not exist'
    })
})

// 404 page
app.get('*', (req,res)=>{
    res.render('404',{
        title:'Page Not Found',
        text:' Opps you are the wrong place, but you can look at my beautiful photo'
    })
})
// Port connection
app.listen(port, ()=>{
    console.log('The server started on port '+ port)
})




