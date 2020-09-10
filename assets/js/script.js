var nasaKey = 'QFBaySAYAbefXA8kgBoxfYWOYqWKcnmCMXq58czU'

//Weather section
$('#add-city').on('click', function() { 
    event.preventDefault();
    console.log('Weather button clicked');
});




//IOTD Section
var getIotd = function() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}`)
    .then(function(response) {
        
        if (response.ok) {
            response.json().then(function (data) {
                
                var description = data.explanation
                var title = data.title
                var picOtd = data.hdurl
                
                iotd(description, title, picOtd)
            
            });

        } else {
            console.log('failed to get image of the day')
            $('#imgOtd').attr('src', './assets/images/alien.png')
            $('#image-description').text("Sorry! looks like NASA doesn't have an image for today.")
            $('#iotdTitle').text('')
        };


    });

};

var iotd = function(description, title, picOtd) {

    $('#imgOtd').attr('src', picOtd)
    $('#image-description').text(description)
    $('#iotdTitle').text(title)
}

getIotd();