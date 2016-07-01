//this code created too many edge cases, and ultimately needs more testing than the exercise allowed, but I want to include it to show my thought process

//to include this code, add the following chunk to getImageMeta(), set tags
/*
      li.addEventListener('click', function() {
        limitToTag(thetag);
      });
*/


//limit all future images to a particular tag
function limitToTag(tag) {
  //reset filter
  filteredTagArr = [];

  for (var i=0; i < photoArr.length; i++) {
    var tagArr = photoArr[i].tags.split(" ");
    if (tagArr.indexOf(tag) > -1) {
      filteredTagArr.push(photoArr[i]);
    }
  }
  //add 'Now Showing', tag count, active styling
  //var tagli = document.getElementById(tag);
  
  filterTags = true;
  nextImage();
}

//clear the filtered view to draw from all images
function clearTags() {
  filterTags = false;
  filteredTagArr = [];
  nextImage();
}

