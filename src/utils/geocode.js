const request=require('request')

const urlparser=(address)=>{
    return('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address+ '.json?types=place%2Cpostcode%2Caddress&language=en&access_token=pk.eyJ1IjoiYWFtaXJ3YW5pMTE3MyIsImEiOiJja3piZDF5eXAxMXh3MnVvMXR3MDUxM2lsIn0.xq4n5Su6OaGlPgi8Rfa2LQ'
    )
}

const geocode=(address,callback)=>{
    const url=urlparser(address)
    request({url:url,'json':true},(error,body)=>{
        if(error){
            callback('unable to connect to location services',undefined)
        }
        else if(body.body.features.length===0){
            callback('Unable to find the location.Try another one',undefined)
        }
        else{
            const data={'lat':body.body.features[0].center[1],'long':body.body.features[0].center[0],'placeName':body.body.features[0].place_name}
            callback(undefined,data)
        }
    })
}

module.exports=geocode