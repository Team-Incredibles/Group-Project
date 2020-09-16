// Global Variables
var nasaKey = 'QFBaySAYAbefXA8kgBoxfYWOYqWKcnmCMXq58czU'

var imgProgress = document.querySelector('#loadingCircle');

// Parralax Scrolling Animation
var rellax = new Rellax('.rellax');

var secondRellax = new Rellax('.new-rellax', {
    center: true
});

var today = moment().format('YYYY-MM-DD')


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
    console.log('Asteroid button clicked');
});

// Mars Weather section
$('#add-weather').on('click', function() {
    event.preventDefault();
    console.log('Weather button clicked');
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
            console.log(`It is currently ${season} at the insight weather station on Mars!`)

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

                const vals = Object.values(marsData)
                const keys = Object.keys(marsData)

                //sends each number to be rounded
                for (x = 0; x < vals.length; x++) {

                    newVal = round(vals[x])
                    
                    marsData[keys[x]] = newVal
                
                }

                //formats date
                var date = solToDate.replace(/-/g, "").split('T', 1)
                var dateToMoment = moment(date, 'YYYYMMDD').format('MMM Do')

                

                //sends data to be displayed 
                buildMars(sols[i], marsData.avgTempOnSol, marsData.minTempOnSol, marsData.maxTempOnSol, dateToMoment, season)
 
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
var buildMars = function(sol, avgAT, minAT, maxAT, date, season) {
    
    console.log(`Temps on sol ${sol} (${date}) Avg = ${avgAT}°C | Min = ${minAT}°C | Max = ${maxAT}°C`)
    
}

//rounds number to nearest whole
var round = function(num) {
    parseInt(num)
    var num = Math.round(num)
    return num;
}

//rover image section