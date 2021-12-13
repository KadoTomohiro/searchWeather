const searchButton = document.querySelector('#search')

searchButton.addEventListener('click', async ()=> {
    const cityNameInput = document.querySelector('#cityName')
    const cityName = cityNameInput.value
    const notation =document.querySelector('.notation')

    // 入力バリデーション
    if (cityName === '') {
        notation.textContent = '都市名を入力してください'
        cityNameInput.classList.add('error')
        return
    } else {
        notation.textContent = ''
        cityNameInput.classList.remove('error')
    }

    // 通信結果の取得とエラー処理
    // try/catchを使う書き方もあります
    const weather = await fetchWeather(cityName)
        .catch((errorMessage) => {
            notation.textContent = errorMessage
            return null
        })
    if (weather === null) {
        return
    }

    // 検索結果テンプレートの構築
    const template = document.querySelector('#result')
    const clone = template.content.cloneNode(true)
    const city = clone.querySelector('.city')
    const description = clone.querySelector('.description')
    const temperature = clone.querySelector('.temperature')
    const wind = clone.querySelector('.wind')
    city.textContent = cityName
    description.textContent = weather.description
    temperature.textContent = weather.temperature
    wind.textContent = weather.wind

    // テンプレートを画面に反映する
    const cityWeathers = document.querySelector('#cityWeathers')
    cityWeathers.appendChild(clone)
})

// 天気情報の取得。async関数なのでPromiseを返します
async function fetchWeather(city) {
    const res = await fetch(`https://goweather.herokuapp.com/weather/${city}`)
        .catch(() => {
            throw '通信エラーが発生しました'
        })
    return await res.json()
        .catch(() => {
            throw 'パースエラーが発生しました'
        })
}
