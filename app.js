var mapimg;
var plane = null;
var currentPosDomElement  = null;
var arrivingPosDomElement = null;
var destinPosDomElement   = null;

var _isEnd = false;

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

  console.log(mapimg)
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

  this.currentCors = {
    x: mercX(this.curLon) - mercX(clon),
    y: mercY(this.curLat) - mercY(clat)
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

  this.getNewYPosition = function (x) {
    let x1 = this.destinationCors.x;
    let y1 = this.destinationCors.y;

    let x2 = this.arrivingCors.x;
    let y2 = this.arrivingCors.y;

    let y = (x - x1) / (x2 - x1) * (y2 - y1) + y1;

    return y;
  }

  this.updatePosition = function () {
    let delta = Math.abs(this.destinationCors.x - this.arrivingCors.x) / 100;

    if (this.currentCors.x > this.destinationCors.x) {
      this.currentCors.x -= delta;
      this.currentCors.y = this.getNewYPosition(this.currentCors.x)
    } else {
      this.currentCors.x += delta;
      this.currentCors.y = this.getNewYPosition(this.currentCors.x)
    }

    if (Math.abs(this.currentCors.x - this.destinationCors.x) < delta) {
      _isEnd = true;
      noLoop();
    }

    setTimeout(() => {
      if (!_isEnd)
        this.updatePosition();
    }, 1000);
  }

  this.drawCurrentPosition = function () {
    fill(255,0,0, 1000);
    stroke(0);
    ellipse(this.currentCors.x,this.currentCors.y,10,10);
  }

  this.showCurrentPositionOnMap = function () {
    // console.log(this.currentCors.x, this.currentCors.y)

  }
}

Plane.prototype = {
  constructor : Plane,
};

function setup() {
  createCanvas(ww, hh);

  plane = new Plane();

  plane.updatePosition();

  currentPosDomElement  = document.getElementsByClassName('js-currentPos');
  arrivingPosDomElement = document.getElementsByClassName('js-arrivingPos');
  destinPosDomElement   = document.getElementsByClassName('js-destinPos');
}

function draw () {

  if (!_isEnd) {
    clear()
    translate(width / 2, height / 2);

    imageMode(CENTER);
    image(mapimg, 0, 0);

    plane.drawLineBetweenPoints()
    plane.drawMainPoints();
    plane.drawCurrentPosition();
    plane.showCurrentPositionOnMap();

    currentPosDomElement[0].innerHTML = "X: " + plane.currentCors.x;
    currentPosDomElement[1].innerHTML = "Y: " + plane.currentCors.y;
  } else {
    console.log("Вы, блять, прилетели!");
  }
  
}