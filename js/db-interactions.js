let userZip;
let userWeather;

$('.submit').click(function (){

    userZip = $('.zip').val()
    console.log('userZip', userZip)
    getWeather(userZip)
    .then(function(data) {
        console.log(data)
        $('#weather_output').html(`The current weather in ${data.name} is ${data.weather[0].description}`)
    })

})


function getWeather(zipCode) {
 return new Promise (function (resolve, reject){
    $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=dfa4f45c40ccf29bb82fe347008a1fd6`
    }).done(function(data){
        resolve(data);
    })
        .fail(function(error){
            reject(error);
        });
    });
}



$('.submit').click(function (){

    userZip = $('.zip').val()
    console.log('userZip', userZip)
    getWeather(userZip)
    .then(function(data) {
        // console.log(data)
        $('#weather_output').html(`The current weather in ${data.name} is ${data.weather[0].description}`)
        userWeather = data;
        console.log(userWeather)
    })
})

var dog = {
    "height": 9,
    "weight": "hellfire"
}

$('.save').click(function (){

       saveWeather(userWeather)
    });

function saveWeather(userWeather) {
 return new Promise (function (resolve, reject){
    $.ajax({
        url: 'https://weather-app-a75d7.firebaseio.com/.json',
        type: 'POST',
        data: JSON.stringify(userWeather)
    }).done(function(data){
        resolve(data);
    })
    .fail(function(error){
    reject(error);
        });
    });
}

