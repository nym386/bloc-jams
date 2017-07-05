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

var albumSatellite = {
  title: 'The Dog',
  artist: 'Satellite Doying',
  label: 'Brindle',
  year: '2011',
  albumArtUrl:'assets/images/album_covers/05.png',
  songs: [
    { title: "Bark Bark", duration: "0:01"},
    { title: "Yawn", duration: "0:05"},
    { title: "Snoozin", duration: "100:21"},
    { title: "Sad Dog Eyes", duration: "1:14"},
    { title: "Whine", duration: "0:03"},
  ]
};

var createSongRow = function(songNumber, songName, songLength){
  var template =
        '<tr class="album-view-song-item">'
      + '<td class="song-item-number">' + songNumber +'</td>'
      + '<td class="song-item-title">' + songName + '</td>'
      + '<td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

      return template;
}

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

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

var toggleImage = function(){
  //select element
  var count = 0;
  //add eventlistener to the element
  albumImage.addEventListener('click', function(){
    if (count === 0){
      setCurrentAlbum(albumMarconi);
      count ++;
    }else if (count === 1){
      setCurrentAlbum(albumSatellite);
      count ++;
    }else {
      setCurrentAlbum(albumPicasso)
      count = 0;
    }
  });
}


window.onload = function(){
  setCurrentAlbum(albumPicasso);
  toggleImage();
} ;
