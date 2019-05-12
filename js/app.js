var RENDER_SPEED = 1000;

var textDom = document.createElement('div');
textDom.className = "data-table__info";
textDom.innerHTML = "Russia";
document.getElementsByTagName('body')[0].appendChild(textDom);

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

  this._isFlying = true;

  //arriving from
  this.destinationLat = destination.latitue;
  this.destinationLon = destination.longtitude;
  this.destinationCountry = destination.country;

  //arriving to
  this.arrivingLat = arriving.latitue;
  this.arrivingLon = arriving.longtitude;
  this.arrivingCountry = arriving.country;

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
    let delta = Math.abs(this.destinationCors.x - this.arrivingCors.x) / 100 + randomInteger(0, 2);

    if (this.currentCors.x > this.destinationCors.x) {
      this.currentCors.x -= delta;
      this.currentCors.y = this.getNewYPosition(this.currentCors.x)
    } else {
      this.currentCors.x += delta;
      this.currentCors.y = this.getNewYPosition(this.currentCors.x)
    }

    if (Math.abs(this.currentCors.x.toFixed(3) - this.destinationCors.x.toFixed(3)) < delta) {
      // _isEnd = true;
      this._isFlying = false;
      // noLoop();
    }

    setTimeout(() => {
      if (this._isFlying)
        this.updatePosition();
    }, RENDER_SPEED);
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

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}


function addNewRandomPlane() {
  setTimeout(() => {
    var keys = Object.keys( TOWNS );

    var maxRandomInt1 = randomInteger(0,Object.keys(TOWNS).length - 1)
    var maxRandomInt2 = randomInteger(0,Object.keys(TOWNS).length - 1)

    var randomTown1 = TOWNS[keys[maxRandomInt1]]
    var randomTown2 = TOWNS[keys[maxRandomInt2]]

    planes.push(
      new Plane(randomTown1, randomTown2)
    )

    planes[planes.length - 1].updatePosition();
    addNewRandomPlane()
  }, randomInteger(2000, 6000));
}

function removeArrivedPlaneFromList (plane) {
  for (var i = 0; i < planes.length; i++) {
    if (!planes[i]._isFlying) {
      planes.splice(i, 1);
    }
  }
}

function setup() {
  createCanvas(ww, hh);

  planes = [
    new Plane(TOWNS.Moscow, TOWNS.NewCastle),
    // new Plane(TOWNS.GreenwoodVillage, TOWNS.NewCastle),
    // new Plane(TOWNS.Moscow, TOWNS.GreenwoodVillage),
    // new Plane(TOWNS.Moscow, TOWNS.Greenville),
    // new Plane(TOWNS.Greenville, TOWNS.GreenwoodVillage),
    // new Plane(TOWNS.Greenville, TOWNS.NewCastle),

    // new Plane(TOWNS.Rome, TOWNS.GreenwoodVillage),
    // new Plane(TOWNS.Greenville, TOWNS.Arkhangelsk),
    // new Plane(TOWNS.Rome, TOWNS.Arkhangelsk),
    // new Plane(TOWNS.AustralianCapitalTerritory, TOWNS.Arkhangelsk),
    // new Plane(TOWNS.GreenwoodVillage, TOWNS.AustralianCapitalTerritory),
    // new Plane(TOWNS.Makhachkala, TOWNS.AustralianCapitalTerritory),
    // new Plane(TOWNS.Makhachkala, TOWNS.Argana),
    // new Plane(TOWNS.Argana, TOWNS.Moscow),
  ]

  for (var id in planes) {
    planes[id].updatePosition()
  }

  currentPosDomElement  = document.getElementsByClassName('js-currentPos');
  arrivingPosDomElement = document.getElementsByClassName('js-arrivingPos');
  destinPosDomElement   = document.getElementsByClassName('js-destinPos');

  addNewRandomPlane()
}

function draw () {

  if (!_isEnd) {
    clear()
    translate(width / 2, height / 2);

    imageMode(CENTER);
    image(mapimg, 0, 0);

    removeArrivedPlaneFromList();

    for (var id in planes) {
        planes[id].drawLineBetweenPoints()
        planes[id].drawMainPoints();
        //planes[id].showCurrentPositionOnMap();

        let X = mouseX - width / 2;
        let Y = mouseY - height / 2;

        if ((X < planes[id].destinationCors.x + 6) && (X > planes[id].destinationCors.x - 6)) {
          if ((Y < planes[id].destinationCors.y + 6) && (Y > planes[id].destinationCors.y - 6)) {
            textDom.innerHTML = planes[id].destinationCountry;

            textDom.style.left = planes[id].destinationCors.x + width / 2 + 10;
            textDom.style.top  = planes[id].destinationCors.y + height / 2 + 10;
          }
        }

        if ((X < planes[id].arrivingCors.x + 6) && (X > planes[id].arrivingCors.x - 6)) {
          if ((Y < planes[id].arrivingCors.y + 6) && (Y > planes[id].arrivingCors.y - 6)) {
            textDom.innerHTML = planes[id].arrivingCountry;

            textDom.style.left = planes[id].arrivingCors.x + width / 2 + 10;
            textDom.style.top  = planes[id].arrivingCors.y + height / 2 + 10;
          }
        }

        if ((X < planes[id].currentCors.x + 5) && (X > planes[id].currentCors.x - 5)) {
          if ((Y < planes[id].currentCors.y + 5) && (Y > planes[id].currentCors.y - 5)) {
            textDom.innerHTML = "Текущее местоположение:\n";
            textDom.innerHTML = "(" + planes[id].currentCors.x + ", " + planes[id].currentCors.y + ")";

            textDom.style.left = planes[id].currentCors.x + width / 2 + 10;
            textDom.style.top  = planes[id].currentCors.y + height / 2 + 10;
          }
        }
    }

    //thats need for showing the plane dots on the top of all other elements....
    for (var id in planes)
        planes[id].drawCurrentPosition();

  }
}