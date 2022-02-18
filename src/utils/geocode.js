const request=require('request')
require('dotenv').config()
const API_KEY_GEOCODE=process.env.mapBoxKey

const urlparser=(address)=>{
    return('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address+ '.json?types=place%2Cpostcode%2Caddress&language=en&access_token='+API_KEY_GEOCODE
    )
}

const geocode=(address,callback)=>{
    const url=urlparser(address)
    request({url:url,'json':true},(error,body)=>{
        if(error){
            callback('unable to connect to location services',undefined)
        }
        // else if(body.body.features.length===0){
        //     callback('Unable to find the location.Try another one',undefined)
        // }
        else{
            const data={'lat':body.body.features[0].center[1],'long':body.body.features[0].center[0],'placeName':body.body.features[0].place_name}
            callback(undefined,data)
        }
    })
}

module.exports=geocode