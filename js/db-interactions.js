let userZip; //global variable for userZip declared so that it can be used to store the text input field's value and and then be passed into the function that calls openWeatherMap api and populates the DOM with results

let userWeather; //global variable for userWeather declared so that it can be used to store the data received from api call to openWeatherMap and then be passed into the function that posts the api call results to Firebase


function getWeather(zipCode) {  //getWeather defined as taking one arg and then returning a promise that uses that arg to make specific (zip-code based) api call
 return new Promise (function (resolve, reject){
    $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=dfa4f45c40ccf29bb82fe347008a1fd6`
    }).done(function(data){
        resolve(data); //once promise is done(run successfully), the promise is resolved (resolve method called) by receipt of that data
    })
        .fail(function(error){ //if promise fails to resolve, the promise fails (fail method called) and then rejects based on the specific error
            reject(error);
        });
    });
}

$('.submit').click(function (){  //api request initiated on click

    userZip = $('.zip').val() //userZip extracted from input field
    console.log('userZip', userZip)
    getWeather(userZip) //getWeather function is called using userZip
    .then(function(data) { // .then called on data received from getWeather (assumes data resolve)
        console.log(data)
        $('#weather_output').html(`The current weather in ${data.name} is ${data.weather[0].description}`) //data received from API call used to populate the DOM
        userWeather = data; //VERY IMPORTANT: THIS PASSES THE DATA FROM THE API CALL TO GLOBAL VARIABLE SO CAN BE RETRIEVED LATER
    });
});
function saveWeather(userWeather) { //Save weather function takes an argument of a data object
 return new Promise (function (resolve, reject){ //returns a promise
    $.ajax({
        url: 'https://weather-app-a75d7.firebaseio.com/.json', //where to submit POST request
        type: 'POST',
        data: JSON.stringify(userWeather) //calls on global variable of userWeather (which had to be stringified, even though it should be coming down as a string from openWeatherMap?)
    }).done(function(data){
        resolve(data);
    }) //if resolved, nothing happens beyond the data having been passed
    .fail(function(error){
    reject(error);
        });
    });
}

$('.save').click(function (){ //post request submitted on click, with userWeather as data to

       saveWeather(userWeather)
    });









