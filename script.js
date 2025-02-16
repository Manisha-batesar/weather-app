const apiKey = '0e78da1a20ad81245c45546fed314856';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=`; 

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector('.weather-icon');


async function checkWeather(city) {
  
  try {
         const response = await fetch(apiUrl + city);
    
        // Check if the response is OK (status 200)
         if (!response.ok) {
           throw new Error('City not found');
        }
  var data = await response.json();

  console.log(data);

  document.querySelector('.city-name').innerHTML = data.name;
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp ) + "°C";
  document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
  document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";
  
  if(data.weather[0].main == "Clouds"){
   weatherIcon.src = "./assets/snowing.png"
  }
  else if(data.weather[0].main == "Clear"){
    weatherIcon.src = "./assets/clear.png"
  }
  else if(data.weather[0].main == "Rain"){
    weatherIcon.src = "./assets/rain.png"
  }
  else if(data.weather[0].main == "Drizzle"){
    weatherIcon.src = "./assets/drizzle.png"
  }
  else if(data.weather[0].main == "Mist"){
    weatherIcon.src = "./assets/mist.png"
  }


}catch (error) {
       console.error('Error fetching weather data:', error);
      alert('Please check the spelling of the city name you have entered. And try again.');
     }
   }

   searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") handleSearch();
  });
  searchBtn.addEventListener("click", handleSearch);
  
  function handleSearch() {
    const city = searchBox.value.trim();
    if (city) checkWeather(city);
    else alert("Please enter a valid city name");
  }


