const hbs=require('hbs')
const path=require('path')
const { response } = require('express')
const express=require('express')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const port=process.env.PORT || 3000

//initialize app
const app=express()

// define paths for express config

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


// Setup handle handle bar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))


// rendering pages

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather'
    })
})

//rendering weather page
app.get('/weather',(req,res)=>{
    location=req.query.location
    if(!location){
        return res.send({
            error:"location cant be empty"
        })
    }
    geocode(location,(error,{lat,long,placeName}={})=>{


        if (error){
            return res.send({error })
        }


        forecast(lat,long,(error,data)=>{


            if (error){
                return res.send({
                error,
                place:undefined,
                forecast:undefined
                })
            }

            res.send({
                error:undefined,
                place:placeName,
                forecast:data
            })

        })

    })
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/help',(req,res)=>{
    res.render('help')
})

app.get('/hello',(req,res)=>{
    console.log(req.query)
    res.send({
        name:'aamir',
        place:'earth'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404')
})

app.get('*',(req,res)=>{
    res.render('404')
})


// setting up server to serve pages

app.listen(port,()=>{
    console.log('server is up on port '+ port)
})