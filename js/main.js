//global variables
var photoArr;
var currentImg;

//AJAX request & data handling
var flickrMethod = 'flickr.people.getPublicPhotos';
var flickrUser = '24662369@N07';
var flickrKey = '8bee05151906fe0ceda566182a16f1e4';
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    //get the data if successful
    var photos = JSON.parse(xhr.responseText);
    photoArr = photos.photos.photo;
    //select a random image
    var photoToGet = getRandomInt(0, photoArr.length);
    currentImg = photoArr[photoToGet];
    //do things with that image
    getImageInfo(currentImg, 'h');
  }
};

getImages('https://api.flickr.com/services/rest/?method=' + flickrMethod + '&api_key=' + flickrKey + '&user_id=' + flickrUser + '&extras=tags&extras=license&format=json&nojsoncallback=1');

function getImages(theurl) {
  xhr.open('GET', theurl);
  xhr.send();
}

function getRandomInt(min, max) {
  return Math.round((Math.random() * (max - min) + min) - 1);
}

function getImageInfo(image, size) {
  //attributes for building the img URL
  var farmID = image.farm;
  var serverID = image.server;
  var imgID = image.id;
  var secret = image.secret;
  var imgURL = 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + imgID + '_' + secret + '_' + size + '.jpg';
  document.getElementById('main-img').style.backgroundImage="url(" + imgURL + ")";
}

