(function(){
    "use strict";
    $(document).ready(function(){
        setup();
        document.getElementById("unit").addEventListener("click", changeUnit);
    });

    function setup(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                var API = "c137f865bf1ed0b98c0408446457c14a";
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                var requestURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon
                    + "&APPID=" + API;
                var request = new XMLHttpRequest();
                request.onload = setLocation;
                request.open("GET", requestURL, true);
                request.send();
            });
        }
    }

    function setLocation(){
        if(this.status == 200){
            var weatherData = JSON.parse(this.responseText);
            var climate = weatherData.weather[0].main;
            console.log(weatherData);
            var temp = parseInt(weatherData.main.temp) - 273.15;
            temp = Math.round(temp);
            document.getElementById("temp").innerHTML = temp + " &deg;";
            document.getElementById("city").innerHTML = weatherData.name + ", " + weatherData.sys.country;
            document.getElementById("climate").innerHTML = weatherData.weather[0].main;
        }
    }

    function changeUnit(){
        var oldTemp = parseInt(document.getElementById("temp").innerHTML);
        var newTemp;
        if(document.getElementById("unit").innerHTML === "C"){
            newTemp = Math.round(oldTemp * 9 / 5 + 32);
            document.getElementById("unit").innerHTML = "F";

        } else {
            newTemp = Math.round((oldTemp - 32) * 5 / 9);
            document.getElementById("unit").innerHTML = "C";
        }
        document.getElementById("temp").innerHTML = newTemp + " &deg;";
    }

})();