var nasaKey = 'QFBaySAYAbefXA8kgBoxfYWOYqWKcnmCMXq58czU'

//Weather section
$('#add-city').on('click', function() { 
    event.preventDefault();
    console.log('Weather button clicked');
});




//IOTD Section
var iotd = function() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}`)
    .then(function(response) {
        
        if (response.ok) {
            response.json().then(function (data) {
                
                var description = data.explanation
                var title = data.title
                var picOtd = data.hdurl
                
                
            
            });

        } else {
            console.log('failed to get image of the day')
        };


    });

};

iotd();