var mapimg;

var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 512;

var zoom = 1;

function preload() {
  // The clon and clat in this url are edited to be in the correct order.
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw');
}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}


const Plane = function () {
  this.destinationLat = 54.97328;
  this.destinationLon = -1.61396;

  this.arrivingLat = 55.751244;
  this.arrivingLon = 37.618423;

  this.posX = this.arrivingLat;
  this.posY = this.arrivingLon;

  this.lineFunc = function (x) {
    let x1 = this.destinationLat;
    let y1 = this.destinationLon;

    let x2 = this.arrivingLat;
    let y2 = this.arrivingLon;

    let y = (x - x1) / (x2 - x1) * (y2 - y1) + y1;
  }

  this.drawMainPoints = function () {
    var x1 = mercX(this.arrivingLon) - mercX(clon);
    var y1 = mercY(this.arrivingLat) - mercY(clat);

    var x2 = mercX(this.destinationLon) - mercX(clon);
    var y2 = mercY(this.destinationLat) - mercY(clat);

    fill(255,0,255, 600);
    ellipse(x1,y1,20,20);
    ellipse(x2,y2,20,20)
  }

  this.drawLineBetweenPoints = function () {
    var x1 = mercX(this.arrivingLon) - mercX(clon);
    var y1 = mercY(this.arrivingLat) - mercY(clat);

    var x2 = mercX(this.destinationLon) - mercX(clon);
    var y2 = mercY(this.destinationLat) - mercY(clat);

    
    stroke(255);
    line(x1, y1, x2, y2);
  }
}

Plane.prototype = {
  constructor : Plane,
};

var lat = 55.751244;
var lon = 37.618423;

var lat2 = 54.97328;
var lon2 = -1.61396;

function setup() {
  createCanvas(ww, hh);
  translate(width / 2, height / 2);

  imageMode(CENTER);
  image(mapimg, 0, 0);


  var plane = new Plane();
  plane.drawLineBetweenPoints()
  plane.drawMainPoints();
  
}