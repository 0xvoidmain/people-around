var data = {
	isLoading: true,
	me: {
		isMe: true,
		position: null,
		name: 'Unknow',
		avatar: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p320x320/13532795_1022906467778032_4231862249323927331_n.jpg?oh=db36b9a80bc02ff5c6ee0f66883020a1&oe=5906111C'
	},
	people: [{
		position: {
			lat: 21.0330158,
			lng: 105.78863460000001
		},
		gender: 0,
		name: 'Cực xinh :*',
		status: '099 888 777',
		avatar: 'https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-1/c23.0.578.578/s200x200/580276_530823103646020_938195608_n.jpg?oh=e572a97ca7bbbded0c7d6b5b569a6802&oe=593164D9'
	},
	{
		position: {
			lat: 21.0250158,
			lng: 105.78963460000001
		},
		gender: 0,
		name: 'Sexy girl',
		status: 'Em nhớ anh quá à, gọi cho em số này nhé 099 888 777',
		avatar: 'https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-1/p200x200/16114579_1787919698197945_5452793200386707193_n.jpg?oh=a8237910eb650cbc30237a282ec6cbc2&oe=59307D10'
	},
	{
		position: {
			lat: 21.0230158,
			lng: 105.78063460000001
		},
		gender: 0,
		name: 'Girl dễ thương',
		status: 'Gọi cho em nhé',
		avatar: 'https://scontent.fhan5-1.fna.fbcdn.net/v/t1.0-1/p200x200/15823022_1604785872881515_4243185946665400773_n.jpg?oh=03f80b0406784b5d6bf53e27cd638dc7&oe=594083C3'
	},
	]
}

google.maps.event.addDomListener(window, 'load', initMap);
function initMap() {
	data.map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 21.0278,
			lng: 105.8342
		},
		scrollwheel: false,
		styles: mapStyles,
		zoom: 15,
		disableDoubleClickZoom: true,
		zoomControl: true,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		fullscreenControl: false
	});
	data.people.forEach(function(e) {
		e.marker = new Marker(
			new google.maps.LatLng(e.position.lat,e.position.lng),
			data.map,
			e
		);
	});
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var myLatLng = {
				lng: position.coords.longitude,
				lat: position.coords.latitude
			};
			data.map.panTo(new google.maps.LatLng(myLatLng.lat, myLatLng.lng));
			data.me.position = myLatLng;
			data.me.marker = new Marker(
				new google.maps.LatLng(data.me.position.lat, data.me.position.lng),
				data.map,
				data.me
			);
		});
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}
