var mapimg;
var plane = null;
var planes;

var currentPosDomElement  = null;
var arrivingPosDomElement = null;
var destinPosDomElement   = null;

var _isEnd = false;

var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 512;

var zoom = 1;

// list of towns
var TOWNS = {
  Moscow: {
    latitue: 55.751244,
    longtitude: 37.618423,
    country: 'RUSSIA'
  },
  NewCastle: {
    latitue: 54.97328,
    longtitude: -1.61396,
    country: 'ENGLAND'
  },
  GreenwoodVillage: {
    latitue: 39.617210,
    longtitude: -104.950813,
    country: 'USA'
  },
  Greenville: {
    latitue: 5.012319,
    longtitude: -9.041973,
    country: 'Liberia'
  },
  Rome: {
    latitue:  41.906204,
    longtitude: 12.507516,
    country: 'Italy'
  },
  Abakan:{
    latitue: 53.720976,
    longtitude: 91.44242300000001,
    country: 'Россия'
  },
  Arkhangelsk:{
    latitue: 64.539304,
    longtitude: 40.518735,
    country: 'Россия'
  },
  Astana:{
    latitue: 71.430564,
    longtitude: 51.128422,
    country: 'Россия'
  },
  Astrakhan:{
    latitue: 46.347869,
    longtitude: 48.033574 ,
    country: 'Россия'
  },
  Barnaul:{
    latitue: 53.356132,
    longtitude: 83.74961999999999,
    country: 'Россия'
  },
  Belgorod:{
    latitue: 50.597467,
    longtitude: 36.588849,
    country: 'Россия'
  },
  Biysk:{
    latitue: 52.541444,
    longtitude: 85.219686 ,
    country: 'Россия'
  },
  Bishkek:{
    latitue: 42.871027,
    longtitude: 74.59452 ,
    country: 'Киргизия'
  },
  Blagoveshchensk:{
    latitue: 50.290658,
    longtitude: 127.527173 ,
    country: 'Россия'
  },
  Bratsk:{
    latitue: 56.151382,
    longtitude: 101.634152 ,
    country: 'Россия'
  },
  Bryansk:{
    latitue: 53.2434,
    longtitude: 34.364198,
    country: 'Россия'
  },
  Vladivostok:{
    latitue: 43.134019,
    longtitude: 131.928379,
    country: 'Россия'
  },
  Vladikavkaz:{
    latitue: 43.024122,
    longtitude: 44.690476,
    country: 'Россия'
  },
  Vladimir:{
    latitue: 56.129042,
    longtitude: 40.40703 ,
    country: 'Россия'
  },
  Volgograd:{
    latitue: 48.707103,
    longtitude: 44.516939 ,
    country: 'Россия'
  },
  Vologda:{
    latitue: 59.220492,
    longtitude: 39.891568,
    country: 'Россия'
  },
  Voronezh:{
    latitue: 51.661535,
    longtitude: 39.200287,
    country: 'Россия'
  },
  Grozny:{
    latitue: 43.317992,
    longtitude: 45.698197 ,
    country: 'Россия'
  },
  Donetsk:{
    latitue: 48.015877,
    longtitude: 37.80285 ,
    country: 'Украина'
  },
  Yekaterinburg:{
    latitue: 56.838002,
    longtitude: 60.597295,
    country: 'Россия'
  },
  Ivanovo:{
    latitue: 57.000348,
    longtitude: 40.973921,
    country: 'Россия'
  },
  Izhevsk:{
    latitue: 56.852775,
    longtitude: 53.211463 ,
    country: 'Россия'
  },
  Irkutsk:{
    latitue: 52.286387,
    longtitude: 104.28066 ,
    country: 'Россия'
  },
  Kazan:{
    latitue: 55.795793,
    longtitude: 49.106585 ,
    country: 'Россия'
  },
  Kaliningrad:{
    latitue: 55.916229,
    longtitude: 37.854467,
    country: 'Россия'
  },
  Kaluga:{
    latitue: 54.507014,
    longtitude: 36.252277,
    country: 'Россия'
  },
  Kemerovo:{
    latitue: 55.359594,
    longtitude: 86.08778100000001,
    country: 'Россия'
  },
  Kiev:{
    latitue: 50.402395,
    longtitude: 30.532690 ,
    country: 'Украина'
  },
  Kirov:{
    latitue: 54.079033,
    longtitude: 34.323163,
    country: 'Россия'
  },
  Korolev:{
    latitue: 55.916229,
    longtitude: 37.854467,
    country: 'Россия'
  },
  Kostroma:{
    latitue: 57.767683,
    longtitude: 40.926418,
    country: 'Россия'
  },
  Krasnodar:{
    latitue: 45.023877,
    longtitude: 38.970157,
    country: 'Россия'
  },
  Krasnoyarsk:{
    latitue: 56.008691,
    longtitude: 92.870529,
    country: 'Россия'
  },
  Kursk:{
    latitue: 51.730361,
    longtitude: 36.192647,
    country: 'Россия'
  },
  Lipetsk:{
    latitue: 52.61022,
    longtitude: 39.594719,
    country: 'Россия'
  },
  Magnitogorsk:{
    latitue: 53.411677,
    longtitude: 58.984415 ,
    country: 'Россия'
  },
  Makhachkala:{
    latitue: 42.984913,
    longtitude: 47.504646,
    country: 'Россия'
  },
  Minsk:{
    latitue: 53.906077,
    longtitude: 27.554914 ,
    country: 'Беларусь'
  },
  Murmansk:{
    latitue: 68.96956299999999,
    longtitude: 33.07454,
    country: 'Россия'
  }
}


// preloading backgound image
function preload() {
  // The clon and clat in this url are edited to be in the correct order.
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw');

  console.log(mapimg)
}

//calculation map X coordinate
function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

//calculation map Y coordinate
function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}



// Plane class
const Plane = function (arriving, destination) {

  //arriving from
  this.destinationLat = destination.latitue;
  this.destinationLon = destination.longtitude;

  //arriving to
  this.arrivingLat = arriving.latitue;
  this.arrivingLon = arriving.longtitude;

  //current location of this plane
  this.curLat = this.arrivingLat;
  this.curLon = this.arrivingLon;

  // map coordinates
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


  // draw dest and arr points function
  this.drawMainPoints = function () {
    fill(255,0,255, 600);
    ellipse(this.arrivingCors.x,this.arrivingCors.y,12,12);
    ellipse(this.destinationCors.x,this.destinationCors.y,12,12)
  }


  //draw line between dst and arr points function
  this.drawLineBetweenPoints = function () {
    stroke(255);
    line(this.arrivingCors.x, this.arrivingCors.y, this.destinationCors.x, this.destinationCors.y);
  }


  // function that returns Y posistion
  this.getNewYPosition = function (x) {
    let x1 = this.destinationCors.x;
    let y1 = this.destinationCors.y;

    let x2 = this.arrivingCors.x;
    let y2 = this.arrivingCors.y;

    let y = (x - x1) / (x2 - x1) * (y2 - y1) + y1;

    return y;
  }


  //function that create a new position
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

  // function that draw plane current position
  this.drawCurrentPosition = function () {
    fill(255,0,0, 1000);
    stroke(0);
    ellipse(this.currentCors.x,this.currentCors.y,10,10);
  }

  //function that shows the info about the [0] plane
  this.showCurrentPositionOnMap = function () {
    // console.log(this.currentCors.x, this.currentCors.y)
    arrivingPosDomElement[0].innerHTML = "X: " + planes[0].arrivingCors.x;
    arrivingPosDomElement[1].innerHTML = "Y: " + planes[0].arrivingCors.y;

    destinPosDomElement[0].innerHTML = "X: " + planes[0].destinationCors.x;
    destinPosDomElement[1].innerHTML = "Y: " + planes[0].destinationCors.y;

    currentPosDomElement[0].innerHTML = "X: " + planes[0].currentCors.x;
    currentPosDomElement[1].innerHTML = "Y: " + planes[0].currentCors.y;
  }
}

Plane.prototype = {
  constructor : Plane,
};

function setup() {
  createCanvas(ww, hh);

  planes = [
    new Plane(TOWNS.Moscow, TOWNS.NewCastle),
  ]

  for (var id in planes) {
    planes[id].updatePosition()
  }

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

    for (var id in planes) {
      planes[id].drawLineBetweenPoints()
      planes[id].drawMainPoints();
      planes[id].drawCurrentPosition();
      planes[id].showCurrentPositionOnMap();
    }
  } else {
    console.log("Вы, блять, прилетели!");
  }
  
}