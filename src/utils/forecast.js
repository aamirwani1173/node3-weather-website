const request=require('request')
const fs=require('fs')
print=console.log
const urlparser=(lat,long)=>{
    return('https://api.openweathermap.org/data/2.5/onecall?lat=' +lat+ '&lon=' +long+ '&appid=c1215bb9b3ea50fe35b4ae9d2444edfa&exclude=current,minutely,daily,alerts&units=metric')
}

const forecast=(lat,long,callback)=>{
    const url=urlparser(lat,long)

    request({url,'json':true},(response,error,body)=>{
        if(body===undefined){
            callback('unable to connect',undefined)
        }else if(body.cod==='400'){
            callback('Wrong coordinates',undefined)
        }
        else{
            // data=JSON.stringify(body.hourly[0],null,' ')
            
            callback(undefined,body.hourly[0])
        }
    })
}

module.exports= forecast