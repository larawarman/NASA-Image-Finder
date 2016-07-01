//TO DO
//Add previously viewed
//Re-show previously viewed image
//Add filter by tags
//Fade in each image
//Final styling (add transition to bg image)
//Error states/loading state


//global variables
var photoArr;
var photoToGet;
var currentImg;
var imagesArr = [];

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
    photoToGet = getRandomInt(0, photoArr.length);
    
    //make it the main image
    getMainImage(photoToGet);

    //preload all other images for future use
    for (var i=0; i < photoArr.length; i++) {
      var imgURL = getImageURL(photoArr[i], 'h');
      imagesArr.push(imgURL);
    }
    for (var i=0; i < imagesArr.length; i++) {
      preloadImage(imagesArr[i]);
    }
  }
};

getImages('https://api.flickr.com/services/rest/?method=' + flickrMethod + '&api_key=' + flickrKey + '&user_id=' + flickrUser + '&extras=tags&format=json&nojsoncallback=1');

function getImages(theurl) {
  xhr.open('GET', theurl);
  xhr.send();
}

function preloadImage(url) {
  var img=new Image();
  img.src=url;
}

function getRandomInt(min, max) {
  return Math.round((Math.random() * (max - min) + min) - 1);
}

function nextImage() {
  //add this bg image to previous images
  updatePreviousImages(photoToGet);
  //select a new random image    
  photoToGet = getRandomInt(0, photoArr.length);
  getMainImage(photoToGet);
}

function updatePreviousImages(imgIndex) {
  var imgURL = getImageURL(currentImg, 't');
  var li = document.createElement("li");
  var img = document.createElement("img");
  img.setAttribute('src', imgURL);
  img.setAttribute('data-index', photoToGet);
  img.addEventListener('click', function() {
    showImageAgain(imgIndex);
  });
  li.appendChild(img);
  document.getElementById('previous-images').appendChild(li);
}

function showImageAgain(photoToGet) {
  getMainImage(photoToGet);
}

function getMainImage(imgIndex) {
  currentImg = photoArr[imgIndex];
  //do things with that image
  setBG(getImageURL(currentImg, 'h'));
  getImageMeta(currentImg);
}

function getImageURL(image, size) {
  //attributes for building the img URL
  var farmID = image.farm;
  var serverID = image.server;
  var imgID = image.id;
  var secret = image.secret;
  var imgURL = 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + imgID + '_' + secret + '_' + size + '.jpg';
  return imgURL;
}

function setBG(imgURL) {
  //set as bg image for main container
  document.getElementById('main-img').style.backgroundImage="url(" + imgURL + ")";
  //set as download link
  document.getElementById('download-link').setAttribute('href', imgURL);
}

function getImageMeta(image) {
  //set title
  document.getElementById('image-title').innerHTML = image.title;
  //clear previous tags
  var tagEl = document.getElementById("tags");
  while (tagEl.firstChild) {
    tagEl.removeChild(tagEl.firstChild);
  }
  //set tags
  if (image.tags !== "") {
    var tagArr = image.tags.split(" ");
    for (var i = 0; i < tagArr.length; i++) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(tagArr[i]));
      document.getElementById('tags').appendChild(li);
    }
  }
}
