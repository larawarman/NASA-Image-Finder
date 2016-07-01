//preloading slows safari down significantly
//removing it, but including it here so you can see my process

/* on get images callback

    for (var i=0; i < photoArr.length; i++) {
      var imgURL = getImageURL(photoArr[i], 'h');
      imagesArr.push(imgURL);
    }
    for (var i=0; i < imagesArr.length; i++) {
      preloadImage(imagesArr[i]);
    }
*/

var imagesArr = [];


//preload images for faster display
function preloadImage(url) {
  var img=new Image();
  img.src=url;
}