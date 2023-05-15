const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temparature-value p');
const descElement = document.querySelector('.temparature-description p');
const locatElement = document.querySelector('.location p');
const notfcaticonElement = document.querySelector('.notification');

//App data
const weather={};

weather.temparature = {
    unit : "celsius"
}

//App consts and vars
const KELVIN = 273;

const key = "5dc7b7c1a2a2fbf849f035add8961cf4";

//checking browser support

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition , showError)

}else{
    notfcaticonElement.style.display ="flex"
    notfcaticonElement.innerHTML = "<P>Browser doesn't Support Geolocation</P>";
}

//set users position

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude);
    console.log(latitude,longitude)
}

// error when problem with geolocation

function showError(error){
    notfcaticonElement.style.display ="flex"
    notfcaticonElement.innerHTML = `<P>${error.message}</P>`;
}

//getting weather info

function getWeather(latitude,longitude){
    let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
    .then(res => res.json())
    
    .then(function(data){
        console.log(data)
        weather.temparature.value = Math.floor(data.main.temp-KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

function displayWeather(){
    iconElement.innerHTML = `<img src ="images/cloud/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temparature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locatElement.innerHTML = `${weather.city},-${weather.country}-`;
}

function celsiusToFarenheit(temparature){
    return(temparature* 9/5)+32;
}

tempElement.addEventListener('click', function(){
    if (weather.temparature.value === undefined)
    return;
    if (weather.temparature.unit == "celcius"){
        let fahrenheit = celsiusToFarenheit(weather.temparature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temparature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temparature.value}°<span>C</span>`;
        weather.temparature.unit = "celcius"
    }
});