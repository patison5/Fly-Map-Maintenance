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

  this.curLat = this.arrivingLat;
  this.curLon = this.arrivingLon;

  this.destinationCors = {
    x: mercX(this.destinationLon) - mercX(clon),
    y: mercY(this.destinationLat) - mercY(clat)
  }

  this.arrivingCors = {
    x: mercX(this.arrivingLon) - mercX(clon),
    y: mercY(this.arrivingLat) - mercY(clat)
  }

  this.drawMainPoints = function () {
    fill(255,0,255, 600);
    ellipse(this.arrivingCors.x,this.arrivingCors.y,12,12);
    ellipse(this.destinationCors.x,this.destinationCors.y,12,12)
  }

  this.drawLineBetweenPoints = function () {
    stroke(255);
    line(this.arrivingCors.x, this.arrivingCors.y, this.destinationCors.x, this.destinationCors.y);
  }

  this.updatePosition = function () {
    console.log("arriving coordinates", this.arrivingCors)
    console.log("destination coordinates", this.destinationCors)
  }

  this.drawCurrentPosition = function () {

  }
}

Plane.prototype = {
  constructor : Plane,
};

function setup() {
  createCanvas(ww, hh);
  translate(width / 2, height / 2);

  imageMode(CENTER);
  image(mapimg, 0, 0);





  var plane = new Plane();

  plane.drawLineBetweenPoints()
  plane.drawMainPoints();

  plane.updatePosition();
}