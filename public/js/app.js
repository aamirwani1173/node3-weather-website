
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


            if(data.errorMsg!==undefined){
                messageOne.textContent=data.errorMsg
                
           }else{
                   // placeName=
                //    forecastString=
                   messageOne.textContent=data.place
                   messageTwo.textContent='Temp at your place is '+data.forecast.temp+'. And the description is '+ data.forecast.weather[0].main
                   // messageTwo.textContent='hello
           }

           })
        })
    
})
