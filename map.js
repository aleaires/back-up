 var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.90328, lng: -56.18816},
    zoom: 13
	})

	var marker = new google.maps.Marker({
    	position: {lat: -34.90328, lng: -56.18816},
    	map: map,
		title: 'Montevideo'
	});
}

