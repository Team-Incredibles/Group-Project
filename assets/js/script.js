var nasaKey = 'QFBaySAYAbefXA8kgBoxfYWOYqWKcnmCMXq58czU'
var today = moment().format('YYYY-MM-DD')


// Weather section
$('#add-city').on('click', function() { 
    event.preventDefault();
    console.log('Weather button clicked');
});




// IOTD Section
var getIotd = function() {
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
            $('#image-description').text("Sorry! looks like NASA doesn't have an image for today or the Image may not be ready yet.")
            $('#iotdTitle').text('')
        };


    });

};

var iotd = function(description, title, picOtd) {
    // Puts data from the getIotd() function in its correct places on the page
    $('#imgOtd').attr('src', picOtd)
    $('#image-description').text(description)
    $('#iotdTitle').text(title)
    $('#toIotd').attr('href', picOtd)

}
// End IOTD section

// Mars weather section
var getMars = function() {
    
    // Get horizontal wind speed
    // Get high, low, and avg temp
    // Get season
    // Get sol and earth date

}

//rover image section

getIotd();