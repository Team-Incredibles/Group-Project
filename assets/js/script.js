var nasaKey = 'QFBaySAYAbefXA8kgBoxfYWOYqWKcnmCMXq58czU'

//Weather section
$('#add-city').on('click', function() { 
    event.preventDefault();
    console.log('Weather button clicked');
});




//IOTD Section
var getIotd = function() {
    //gets the image of the day and its corresponding information
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}`)
    .then(function(response) {
        
        if (response.ok) {
            response.json().then(function (data) {
                
                //gets the data we need and stores them in variables
                var description = data.explanation
                var title = data.title
                var picOtd = data.hdurl
                
                //passes that data to the iotd() function
                iotd(description, title, picOtd)
            
            });

        } else {
            //if for some reason is not valid an error message is displayed
            $('#imgOtd').attr('src', './assets/images/alien.png')
            $('#image-description').text("Sorry! looks like NASA doesn't have an image for today.")
            $('#iotdTitle').text('')
        };


    });

};

var iotd = function(description, title, picOtd) {
    //puts data from the getIotd() function in its correct places on the page
    $('#imgOtd').attr('src', picOtd)
    $('#image-description').text(description)
    $('#iotdTitle').text(title)
    $('#toIotd').attr('href', picOtd)

}
//end IOTD section

//mars weather section
var getMars = function() {
    
    //get horizontal wind speed
    //get high, low, and avg temp
    //get season
    //get sol and earth date

}


getIotd();