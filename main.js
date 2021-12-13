const searchButton = document.querySelector('#search')

searchButton.addEventListener('click', () => {
    const cityNameInput = document.querySelector('#cityName')
    const cityName = cityNameInput.value
    
    const result = fetch(`https://goweather.herokuapp.com/weather/${cityName}`)
        .then((result) => {
            return result.json()
        })
        .then((data) => {
            console.log(data)
            const description = document.querySelector('.description')
            const temperature = document.querySelector('.temperature')
            const wind = document.querySelector('.wind')

            description.textContent = data.description
            temperature.textContent = data.temperature
            wind.textContent = data.wind
        })
        .catch((error) => {
            console.log(error)
        })

})


