//TO DO
//Fade in each image
//Final styling (add transition to bg image)
//Error states/loading state


//global variables
var photoArr;
var photoToGet;
var currentImg;
var imagesArr = [];
var displayChrono = false;
var pageReturn = 1;

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

    // preload all other images for future use
    // for (var i=0; i < photoArr.length; i++) {
    //   var imgURL = getImageURL(photoArr[i], 'h');
    //   imagesArr.push(imgURL);
    // }
    // for (var i=0; i < imagesArr.length; i++) {
    //   preloadImage(imagesArr[i]);
    // }
  }
};

getImages('https://api.flickr.com/services/rest/?method=' + flickrMethod + '&api_key=' + flickrKey + '&user_id=' + flickrUser + '&page=' + pageReturn + '&extras=tags&format=json&nojsoncallback=1');

function getImages(theurl) {
  xhr.open('GET', theurl);
  xhr.send();
}

//build the image url per flickr's guidelines
function getImageURL(image, size) {
  //attributes for building the img URL
  var farmID = image.farm;
  var serverID = image.server;
  var imgID = image.id;
  var secret = image.secret;
  var imgURL = 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + imgID + '_' + secret + '_' + size + '.jpg';
  return imgURL;
}

//decide which image to get and display it
function getMainImage(imgIndex) {
  currentImg = photoArr[imgIndex];
  //do all the things with that image
  setBG(getImageURL(currentImg, 'h'));
  getImageMeta(currentImg);
}

//handle the new image button
function nextImage() {
  //add this bg image to previous images
  updatePreviousImages(photoToGet);
  //get a new image
  if (displayChrono == false) {
    photoToGet = getRandomInt(0, photoArr.length);
  }
  else {
    if(photoToGet === (photoArr.length - 1)) {
      pageReturn++;
      getImages('https://api.flickr.com/services/rest/?method=' + flickrMethod + '&api_key=' + flickrKey + '&user_id=' + flickrUser + '&page=' + pageReturn + '&extras=tags&format=json&nojsoncallback=1');
    }
    photoToGet++;
  }
  getMainImage(photoToGet);
}

//set the image as the background
function setBG(imgURL) {
  //set as bg image for main container
  document.getElementById('main-img').style.backgroundImage="url(" + imgURL + ")";
  //set as download link
  document.getElementById('download-link').setAttribute('href', imgURL);
}

//get metadata about an image
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
      var thetag = tagArr[i];
      li.setAttribute('id', thetag);
      li.appendChild(document.createTextNode(tagArr[i]));
      document.getElementById('tags').appendChild(li);
    }
  }
}

//change the image order
function displayRandom() {
  //change display to random
  displayChrono = false;

  //change the active
  document.getElementById("display-random").className = "active";
  document.getElementById("display-chronological").className = "";
}
function displayOrderly() {
  //change display to chronological
  displayChrono = true;
  photoToGet = 0;
  getMainImage(0);
  //change the active
  document.getElementById("display-chronological").className = "active";
  document.getElementById("display-random").className = "";
}

//add the image to the previous images container
function updatePreviousImages(imgIndex) {
  var prevItemsContainer = document.getElementById('prev-items');
  if(prevItemsContainer.style.display != "block") {
    prevItemsContainer.style.display = "block";
  }
  var imgURL = getImageURL(currentImg, 't');
  var li = document.createElement("li");
  var img = document.createElement("img");
  img.setAttribute('src', imgURL);
  img.setAttribute('data-index', photoToGet);
  img.addEventListener('click', function() {
    showImageAgain(imgIndex);
  });
  li.appendChild(img);
  var ul = document.getElementById('previous-images');
  ul.insertBefore(li, ul.childNodes[0]);
}

//show an image when clicked from the previous images container
function showImageAgain(photoToGet) {
  getMainImage(photoToGet);
  //remove this image from previous images ul
  var dataIndexes = document.querySelectorAll('[data-index]');
  for (var i=0; i < dataIndexes.length; i++) {
    var index = dataIndexes[i].getAttribute('data-index');
    if (index == photoToGet) {
      var parent = dataIndexes[i].parentNode;
      if (dataIndexes[i].parentNode) {
        //remove the image
        dataIndexes[i].parentNode.removeChild(dataIndexes[i]);
        if(parent.parentNode) {
          //remove the parent li
          parent.parentNode.removeChild(parent);
        }
      }
    }
  }
}

//open menu
function openMenu() {
  var menu = document.getElementById('menu-container');
  var toggle = document.getElementById('rotate-icon');
  if(menu.classList.contains('open')) {
    menu.className="";
    toggle.className="";
  } else {
    menu.className="open";
    toggle.className="open";
  }
}

//preload images for faster display
function preloadImage(url) {
  var img=new Image();
  img.src=url;
}

//random number generator
function getRandomInt(min, max) {
  return Math.round((Math.random() * (max - min) + min));
}
