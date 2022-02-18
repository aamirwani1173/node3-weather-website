const request=require('request')
require('dotenv').config()
const fs=require('fs')
// print=console.log
const API_KEY_FORECAST=process.env['forecastKey']
console.log(process.env["forecastKey"])
const urlparser=(location)=>{
    return('https://api.openweathermap.org/data/2.5/weather?q='+location+'&appid='+API_KEY_FORECAST+'&units=metric')
}

const forecast=(location,callback)=>{
    const url=urlparser(location)

    request({url,'json':true},(error,response)=>{

        if(error){
            return callback({error:'cant connect to location services'})
        }


        else if(response.statusCode==404){
            return callback({error:'cant find location'})
        }


        // callback(response)
        result=response.body
        const cityName=result.name
        const temp=result.main.temp
        const maxTemp=result.main.temp_max
        const humidity=result.main.humidity
        const description=result.weather[0].main

        callback({cityName,temp,maxTemp,humidity,description})
    })
}

module.exports= forecast