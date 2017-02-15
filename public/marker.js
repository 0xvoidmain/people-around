var markerSelected = null;
var isMarkerClick = false;
function expand(e) {
	if (!e.hasClass('marker-expand')) {
		var top = parseFloat(e.css('top'));
		var left = parseFloat(e.css('left'));
		e.addClass('marker-expand');
		e.css('top', top + 64 - 168);
		e.css('left', left + 32 - 84);
	}
}

function collapse(e) {
	if (e.hasClass('marker-expand')) {
		var top = parseFloat(e.css('top'));
		var left = parseFloat(e.css('left'));
		e.removeClass('marker-expand');
		e.css('top', top - 64 + 168);
		e.css('left', left - 32 + 84);
	}
}

function Marker(latlng, map, args) {
	this.latlng = latlng;
	this.args = args;
	this.setMap(map);
}
Marker.collapseAll = function() {
	!isMarkerClick && markerSelected && collapse(markerSelected);
	isMarkerClick = false;
}
Marker.prototype = new google.maps.OverlayView();
Marker.prototype.draw = function() {

	var self = this;

	var div = this.div;

	if (!div) {
		div = this.div = $.parseHTML('<div id="marker-id-' + this.args.id + '" class="marker">\
			<div class="marker-img" style="background-image: url(' + this.args.avatar + ');">\
				<div class="marker-info">\
					<div class="marker-name">' + this.args.name + '</div>\
					<div class="marker-status">' + this.args.status + '</div>\
				</div>\
			</div>\
		</div>')[0];

		google.maps.event.addDomListener(div, "click", function(event) {
			isMarkerClick = true;
			var e = $(event.currentTarget);
			if (markerSelected && markerSelected.attr('id') !== e.attr('id')) {
				collapse(markerSelected);
			}
			var isExpanded = e.hasClass('marker-expand');

			if (!isExpanded) {
				markerSelected = e;
				expand(e);
			}
			else {
				markerSelected = null;
				collapse(e);
			}
			google.maps.event.trigger(self, "click");
		});

		var panes = this.getPanes();
		panes.overlayImage.appendChild(div);
	}

	var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

	if (point) {
		div.style.left = parseInt(point.x - 30) + 'px';
		div.style.top = parseInt(point.y - 65) + 'px';
	}
};

Marker.prototype.remove = function() {
	if (this.div) {
		this.div.parentNode.removeChild(this.div);
		this.div = null;
	}
};

Marker.prototype.getPosition = function() {
	return this.latlng;
};