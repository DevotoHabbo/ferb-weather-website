const weatherForm = document.querySelector('#weather-form')
const search = document.querySelector('#weather-input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + location).then((res)=>{
        res.json().then((data)=>{
            if(data.err){
                messageTwo.textContent = data.err
            }else{
               messageOne.textContent = data.location
               messageTwo.textContent = data.forecast
            }
           
        })
    })
})