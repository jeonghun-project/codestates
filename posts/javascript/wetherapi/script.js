let data = {
  "coord": {
    "lon": -122.08,
    "lat": 37.39
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 282.55,
    "feels_like": 281.86,
    "temp_min": 280.37,
    "temp_max": 284.26,
    "pressure": 1023,
    "humidity": 100
  },
  "visibility": 16093,
  "wind": {
    "speed": 1.5,
    "deg": 350
  },
  "clouds": {
    "all": 1
  },
  "dt": 1560350645,
  "sys": {
    "type": 1,
    "id": 5122,
    "message": 0.0139,
    "country": "US",
    "sunrise": 1560343627,
    "sunset": 1560396563
  },
  "timezone": -25200,
  "id": 420006353,
  "name": "Mountain View",
  "cod": 200
}

const weathericon = document.querySelector("#wicon");
const cityname = document.querySelector(".cityname");
const weathertxt = document.querySelector(".weathertxt");
const weathersubtxt = document.querySelector(".weathersubtxt");
const temperature = document.querySelector(".temperature");
const temperaturefeel = document.querySelector(".temperaturefeel");
const tempfelltxt = document.querySelector(".txt");

function renderWeatherData() {
  // TODO: 여기에 DOM을 이용하여 날씨 데이터를 표시하세요
  //날씨 icon 가져오기
  let iconcode = data.weather[0].icon;
  let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  weathericon.src = iconurl;
  //데이터 화면에 표시하기
  cityname.textContent = data.name;
  weathertxt.textContent = data.weather[0].main;
  weathersubtxt.textContent = data.weather[0].description;
  //온도 데이터 변환
  temperaturefeel.textContent = Math.floor(data.main.feels_like -273.15) + "°";
  temperature.textContent = Math.floor(data.main.temp -273.15) + "°";
  //온도에 따른 색상 변환
  if(Math.floor(data.main.temp -273.15) < 0) {
    temperature.style.color = "rgba(44, 26, 255, 1)";
  } else {
    temperature.style.color = "rgba(255, 26, 26, 1)"
  }
  if(Math.floor(data.main.feels_like -273.15) < 0) {
    temperaturefeel.style.color = "rgba(1, 103, 197, 1)";
  } else {
    temperaturefeel.style.color = "rgba(218, 15, 2, 1)"
  }
}

function getData() {
  let API_URL_OpenWeatherMap = '//api.openweathermap.org/data/2.5/weather?lat='+Math.floor(latLng.lat *10) /10 +'&lon=' +Math.floor(latLng.lng *10) /10 +'&appid=966488940c2f661d31ca3483f919178b';

  fetch(API_URL_OpenWeatherMap)
  .then(function(resp) {
    return resp.json()
  })
  .then(function(json) {
    //기존 데이터 덮어씌기
    data = json;
  });
}

getData();
renderWeatherData();
