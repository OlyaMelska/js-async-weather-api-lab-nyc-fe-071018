const API_KEY = "70c19500496f9aecbd97ff861d3072ee"

function handleFormSubmit(event) {
  event.preventDefault()
  let input = document.getElementById('city')
  const value = input.value
  fetchCurrentWeather(value)
  fetchFiveDayForecast(value)
  
}

function fetchCurrentWeather(city) {
  //fetch current weather based on city
 fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + `&APPID=${API_KEY}&units=metric`)
  .then(response => response.json())
  .then(responseJSON => displayCurrentWeather(responseJSON))
  
}

function displayCurrentWeather(json) {
  //render current weather data to the DOM using provided IDs and json from API
  const mainData = json.main
  const temp = document.getElementById('temp')
  const low = document.getElementById('low')
  const high = document.getElementById('high')
  const humidity = document.getElementById('humidity')
  const cloudCover = document.getElementById('cloudCover')
  
  temp.innerHTML = mainData.temp + '&#176;C'
  low.innerHTML = mainData.temp_min + '&#176;C'
  high.innerHTML = mainData.temp_max + '&#176;C'
  humidity.innerHTML = mainData.humidity + "%"
  cloudCover.innerHTML = json.clouds.all + "%"
}


function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + `&APPID=${API_KEY}&units=metric`)
  .then(response => response.json())
  .then(responseJSON => {
    displayFiveDayForecast(responseJSON)
    createChart(responseJSON)
  })
    
  
}

function displayFiveDayForecast(json) {
  const forecast = json.list
  const aside = document.querySelector('aside')
  let counter = 0 
  let averageTemp = 0
  forecast.forEach( (eachForecastItem) =>{
    counter++
    averageTemp += eachForecastItem.main.temp
    if(counter === 8){
      counter = 0
      const div = document.createElement('div')
      div.innerHTML = `<h3>Date</h3><p>${eachForecastItem.dt_txt}</p>
      <p>Average temp: ${Math.floor(averageTemp/8)}</p>`
      aside.appendChild(div)
      averageTemp = 0 
    }
  })
}

function createChart(json) {
  const ctx = document.getElementById('WeatherChart').getContext('2d')
  const labels = json.list.map(increment => increment.dt_txt)
  console.log(labels)
  const data = json.list.map( increment => increment.main.temp)
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Forecast',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
  
}

document.addEventListener('DOMContentLoaded', function() {
  //add event listener here for form submission
  document.addEventListener('submit', handleFormSubmit)
})
