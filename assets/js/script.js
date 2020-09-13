// Global Variables
var nasaKey = 'QFBaySAYAbefXA8kgBoxfYWOYqWKcnmCMXq58czU'

var imgProgress = document.querySelector('#loadingCircle');

// Parralax Scrolling Animation
var rellax = new Rellax('.rellax');
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
            var description = data.explanation
            var title = data.title
            var picOtd = data.hdurl
                
            // Passes that data to the iotd() function
            iotd(description, title, picOtd)
            
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

    var iotd = function(description, title, picOtd) {
        // Puts data from the getIotd() function in its correct places on the page
        $('#imgOtd').attr('src', picOtd)
        $('#image-description').text(description)
        $('#iotdTitle').text(title)
        $('#toIotd').attr('href', picOtd)
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
});


// Mars weather section
var getMars = function() {
    
    // Get horizontal wind speed
    // Get high, low, and avg temp
    // Get season
    // Get sol and earth date

}

//rover image section

getIotd();

