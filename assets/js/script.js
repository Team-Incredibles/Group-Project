// Global Variables
var nasaKey = 'QFBaySAYAbefXA8kgBoxfYWOYqWKcnmCMXq58czU'

var imgProgress = document.querySelector('#loadingCircle');

// Parralax Scrolling Animation
var rellax = new Rellax('.rellax');


var secondRellax = new Rellax('.new-rellax', {
    center: true
});

var today = moment().format('YYYY-MM-DD')

var astNum = 0



// To show a Loading Bar while POTD is being fetched and returned
document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        imgProgress.style.display = 'none';
    }
}

// IOTD Section
$(document).ready(function() {
    // Gets the image of the day and its corresponding information
    fetch(`https://api.nasa.gov/planetary/apod?date=${today}&api_key=${nasaKey}`)
    .then(function(response) {
    
        if (response.ok) {
            response.json().then(function (data) {
                
            // Gets the data we need and stores them in variables
            var mediaType = data.media_type
            var description = data.explanation
            var title = data.title
            var picOtd = data.url
                
            // Passes that data to the iotd() function
            iotd(mediaType, description, title, picOtd)
            
        });

        } else {
            // If for any reason the request is not valid an error message is displayed
            $('#imgOtd').attr('src', './assets/images/alien.png')
            $('#image-description').text("Sorry! It looks like NASA doesn't have an image for today.")
            $('#iotdTitle').text(status.statusText)
        }
    })
    .catch(function(error) {
        // To notify user of connection issue to Nasa API
        $('#image-description').text("Sorry! It looks like your device is having issues connecting to Nasa's API. Retry your connection or come back later! Thank you.")
        $('#iotdTitle').text('Error: ' + status.statusText);

    });

    var iotd = function(mediaType, description, title, picOtd) {
        // Puts all the iotd data in its correct places on the page
        
        $('#image-description').text(description)
        $('#iotdTitle').text(title)
        $('#toIotd').attr('href', picOtd)

        if (mediaType === 'video') {
            $('#img-container').append(`<iframe src='${picOtd}'  style="border: none;"></iframe>`)
        } else if (mediaType === 'image') {
            $('#imgOtd').attr('src', picOtd)
        }
    }
});
// End IOTD section


// Asteroid Section
$('#add-asteroid').on('click', function () {
    event.preventDefault();
    $('#astContainer').empty()


    var astDate = $('#date').val()

    //if the user has input a date it will run the function
    if (astDate != '') {
        neows(astDate);
    }

    
});

// Mars Weather section
$('#add-weather').on('click', function() {
    event.preventDefault();
    $('#solContainer').empty();
    getMars();
});


// Mars weather section
var getMars = function() {
    
    // Get high, low, and avg temp
    // Get season
    // Get sol and earth date
    fetch(`https://api.nasa.gov/insight_weather/?api_key=${nasaKey}&feedtype=json&ver=1.0`)
    .then(function(response) {
    
        if (response.ok) {
            response.json().then(function (data) {
            
            sols = data.sol_keys
            var season = data[sols[sols.length - 1]].Season 
            $('#season').text(`It is currently ${season} at Elysium Planitia on Mars`)

            //loop that gets data for sols[i] then sends it to a function to build it on the page.
            for (i = 0; i < sols.length; i++) {
                
                //weather data that needs to be rounded
                var marsData = {

                    //temperature data
                    avgTempOnSol: data[sols[i]].AT.av,
                    minTempOnSol: data[sols[i]].AT.mn,
                    maxTempOnSol: data[sols[i]].AT.mx,

                }

                //date
                var solToDate = data[sols[i]].First_UTC

                const marsVals = Object.values(marsData)
                const marsKeys = Object.keys(marsData)

                //sends each number to be rounded
                for (x = 0; x < marsVals.length; x++) {

                    //there is no data for that date it will be set to a dash
                    if (marsVals[x] === null || marsVals[x] === '' || marsVals[x] === 'null') {
                        newVal = '-'
                    } else {
                        newVal = round(marsVals[x])
                    }

                    marsData[marsKeys[x]] = newVal
                    
                }

                //formats date
                var date = solToDate.replace(/-/g, "").split('T', 1)
                var dateToMoment = moment(date, 'YYYYMMDD').format('MMM Do')

                

                //sends data to be displayed 
                buildMars(sols[i], marsData.avgTempOnSol, marsData.minTempOnSol, marsData.maxTempOnSol, dateToMoment)
 
            }

        });

        } else {
            console.log('Could not get response')
        }
    })
    .catch(function(error) {
        

    });
}

//displays data
var buildMars = function(sol, avg, min, max, date) {

    
    //coverts celsius data to fahrenheit
    avgF = convert(avg)
    minF = convert(min)
    maxF = convert(max)

    $('#solContainer').append(`<div class="mCard card"><div class="card-header"><div class="card-title h5">Sol ${sol}</div><div class="card-subtitle text-gray h5">${date}</div></div><div class="card-body"><p id="avg">Avg: ${avg}°C</p><p class="f text-gray">${avgF}°F</p><p id="min">Min: ${min}°C</p><p class="f text-gray">${minF}°F</p><p id="max">Max: ${max}°C</p><p class="f text-gray">${maxF}°F</p></div></div>`)
  
}

//NeoW section
//get name -
//check if meteor is potentially hazardous -
//get size
//get speed
//get miss distance 
var neows = function(date) {

    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${nasaKey}`)
    .then(function(response) {

    
        if (response.ok) {
            response.json().then(function (data) {
            
            var elementCount = data.element_count
            var asteroids = data.near_earth_objects[date]
            console.log(`there is data on ${elementCount} asteroids on that date`)

            for (i = 0; i < asteroids.length; i++) {

                var name = asteroids[i].name 
                var hazard = asteroids[i].is_potentially_hazardous_asteroid  
                
                var astData = {
                    sizeMin: asteroids[i].estimated_diameter.feet.estimated_diameter_min,
                    sizeMax: asteroids[i].estimated_diameter.feet.estimated_diameter_max,
                    speed: asteroids[i].close_approach_data[0].relative_velocity.miles_per_hour,
                    missBy: asteroids[i].close_approach_data[0].miss_distance.miles,
                }

                const astVals = Object.values(astData)
                const astKeys = Object.keys(astData)

                //sends each number to be rounded
                for (x = 0; x < astVals.length; x++) {
                    
                    if (astVals[x] > 1) {
                        newVal = round(astVals[x])
                        astData[astKeys[x]] = newVal
                    }

                    
                }

                buildAst(name, hazard, astData.sizeMin, astData.sizeMax, astData.speed, astData.missBy)
            }
                   
        });

        } else {
            console.log('error getting asteroids')
        }
    })
    .catch(function(error) {
        console.log('oops')

    });
}

var buildAst = function(name, haz, min, max, speed, miss) {
    console.log(name, haz, min, max, speed, miss)
}

//NeoW section
//get name -
//check if meteor is potentially hazardous -
//get size
//get speed
//get miss distance 
var neows = function(date) {

    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${nasaKey}`)
    .then(function(response) {
    
        if (response.ok) {
            response.json().then(function (data) {
            
            var elementCount = data.element_count
            var asteroids = data.near_earth_objects[date]

            $('#elCount').text(`There is ${elementCount} asteroids on that date!`)
            
            for (i = 0; i < asteroids.length; i++) {

                var name = asteroids[i].name 
                var hazard = asteroids[i].is_potentially_hazardous_asteroid  
                
                var astData = {
                    sizeMin: asteroids[i].estimated_diameter.feet.estimated_diameter_min,
                    sizeMax: asteroids[i].estimated_diameter.feet.estimated_diameter_max,
                    speed: asteroids[i].close_approach_data[0].relative_velocity.miles_per_hour,
                    missBy: asteroids[i].close_approach_data[0].miss_distance.miles,
                }

                const astVals = Object.values(astData)
                const astKeys = Object.keys(astData)

                //sends each number to be rounded
                for (x = 0; x < astVals.length; x++) {
                    
                    if (astVals[x] > 1) {
                        newVal = round(astVals[x])
                        astData[astKeys[x]] = newVal
                    }

                    
                }

                astNum++
                buildAst(name, hazard, astData.sizeMin, astData.sizeMax, astData.speed, astData.missBy)
            }
            

            
              

                   
        });

        } else {
            console.log('error getting asteroids')
        }
    })
    .catch(function(error) {
        console.log('oops')

    });
}

var buildAst = function(name, haz, min, max, speed, miss) {

    const astroidTable = `
    <div class="accordion">
    <input type="checkbox" id="accordion-${astNum}" name="accordion-checkbox" hidden>
    <label class="accordion-header" for="accordion-${astNum}">
    <span class="oi oi-chevron-right icon"></span>
    ${name}
    </label>
    <div class="accordion-body">
    <table>
    <tr>    
    <td>Potentially hazardous:</td>
    <td>${haz}</td>
    </tr>
    <tr>
    <td>Smallest Diameter:</td>
    <td>${formatNumber(min)} Feet</td>
    </tr>
    <tr>             
    <td>Largest Diameter:</td>
    <td>${formatNumber(max)} Feet</td>
    </tr>
    <tr>                      
    <td >Speed:</td>
    <td >${formatNumber(speed)} MPH</td>
    </tr>
    <tr>                         
    <td>Will miss Earth by:</td>
    <td>${formatNumber(miss)} Miles</td>
    </tr>
    </table>
    </div>
    </div>
    `

    $('#astContainer').append(astroidTable)
}

//rounds number to nearest whole
var round = function(num) {
    parseInt(num)
    var num = Math.round(num)
    return num;
}


//converts celsius to fahrenheit 
function convert(celsius) {
    var toF = celsius * 9 / 5 + 32;
    var output = Math.round(toF);
    return output;
}


//sets the random fact
$.getJSON("./assets/js/facts.json", function(data){
    var num = Math.floor((Math.random() * 16) + 0);

    var factTitle = data.facts[num].title
    var factDesc = data.facts[num].description

    $('#factTitle').text(factTitle)
    $('#space-facts').text(factDesc)
})


//formats large numbers
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// Sound
setTimeout(function() {
    document.querySelector(".ado").play();
}, 182000);