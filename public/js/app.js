
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

// messageOne.textContent='from JavaScript'




weatherForm.addEventListener('submit',(e)=>{
    
    e.preventDefault()

    // console.log('testing')
    const location=search.value
    // console.log(location)
    fetch('/weather?location='+location).then((response)=>{
        response.json().then((data)=>{


            if(data.error){
                messageOne.textContent=data.error
                messageTwo.textContent=''
                // console.log(data.error)
                
           }else{
                   // placeName=
                
                   messageOne.textContent=data.cityName
                   messageTwo.textContent='Temp:'+data.temp+' Max Temp:'+data.maxTemp+' Humidity:'+data.humidity
                   // messageTwo.textContent='hello
                //    console.log(data.cityName)
           }

           })
        })
    
})
