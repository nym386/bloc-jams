//my Example album
var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl:'assets/images/album_covers/01.png',
  songs: [
    { title: "Blue", duration: "4:26"},
    { title: "Green", duration: "3:14"},
    { title: "Red", duration: "5:01"},
    { title: "Pink", duration: "3:21"},
    { title: "Magenta", duration: "2:15"},
  ]
};

var albumMarconi = {
  title: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl:'assets/images/album_covers/20.png',
  songs: [
    { title: "Hello, Operator?", duration: "1:01"},
    { title: "Ring, ring, ring", duration: "5:01"},
    { title: "Fits in your pocket", duration: "3:21"},
    { title: "Can you hear me now?", duration: "3:14"},
    { title: "Wrong phone number", duration: "2:15"},
  ]
};

var createSongRow = function(songNumber, songName, songLength){
  var template =
        '<tr class="album-view-song-item">'
      + '<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber +'</td>'
      + '<td class="song-item-title">' + songName + '</td>'
      + '<td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

      return template;
}
// Album button template vars
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//song state var
var currentlyPlayingSong = null;

//element vars
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var setCurrentAlbum = function(album) {


  albumTitle.firstChild.nodeValue = album.title;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);

  albumSongList.innerHTML = '';

  for (var i = 0; i < album.songs.length; i ++) {
    albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
  }
};


//function for finding a parent by class name
var findParentByClassName = function(element, parentClassName){
  //create a function within the function to run the recursion so that we can do one check outside of the recursive loop
  var recursiveFind = function(element, parentClassName){
    if (element.parentElement === null){return console.log("No parent found with that class name")}
    //establish a variable to store the parentElement
    var parent = element.parentElement;
    //a console log to check what is being identified as a parent
    //console.log(parent.className + " is parent");
    if(parent.className === parentClassName){
      //should return parent object if it has the same name as the one we are looking for
      return parent;
    }else{
      //recursively call the function again to find the next parent up the chain
      return recursiveFind(parent, parentClassName,);
    }
  };
  //checks to see if a parent exists: HTML has no parents :(
  if (element.tagName === "HTML"){
    console.log("No parent found");
  }else{
    return recursiveFind(element, parentClassName);
  }
};

//function that returns Song Item
var getSongItem = function(element){
  switch (element.className) {
    case 'album-song-button' :
    case 'ion-play' :
    case 'ion-pause' :
      return findParentByClassName(element, 'song-item-number');
      break;
    case 'album-view-song-item' :
      return element.querySelector('.song-item-number');
      break;
    case 'song-item-title' :
    case 'song-item-duration':
      return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
      break;
    case 'song-item-number' :
      return element;
      break
    default :
      return;
      break;

  }
};
// a function defining what happenes when yo click a target in the player
var clickHandler = function (targetElement){
  //store the song=item-number of the clicked row in a variable
  var songItem = getSongItem(targetElement);

  if (currentlyPlayingSong === null){
    //change the innerHTML from song number to a puase button (because you just started the song)
    songItem.innerHTML = pauseButtonTemplate;
    //set the variable currently playing song to the clicked item number
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')){
    //change the innerHTML from a puase button to a play button (because you just stopped the song)
    songItem.innerHTML = playButtonTemplate;
    //change the currently playing song to null because there is no music playing
    currentlyPlayingSong = null;
  } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')){
    //since the item you clicked is not playing and another item is, we need to work with two items
    //create a variable to store the element from the song that was previously playing by using currently playing song
    var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]')
    //change innerHTML of that song BACK to a number since it is no longer playing
    currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
    //change the clicked element to puase since you started the song & set currently playing song
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }
};

window.onload = function(){
  setCurrentAlbum(albumPicasso);
/* my function.  The example function is uncommented below while waiting for an update from Jacob
  albumSongList.addEventListener('mouseover', function (event){

    if (event.target.parentElement.className === 'album-view-song-item' && getSongItem(event.target).getAttribute('data-song-number') !== currentlyPlayingSong){
        event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
    }
  });
*/
  albumSongList.addEventListener('mouseover', function(event) {
      if (event.target.parentElement.className === 'album-view-song-item') {
              var songItem = getSongItem(event.target);
              if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                  songItem.innerHTML = playButtonTemplate;
              }
      }
  });


  for (var i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event) {
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');
      if (songItemNumber !== currentlyPlayingSong){
        songItem.innerHTML = songItemNumber;
      }
    });

    songRows[i].addEventListener('click', function(event) {
      clickHandler(event.target);
    });
  }
}
