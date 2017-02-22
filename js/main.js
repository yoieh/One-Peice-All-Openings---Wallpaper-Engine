// 2. This code loads the IFrame Player API code asynchronously.

var videoId = 'vakTljk8lWA';
var windowHeight = $(document).height();
var navHeight = $('ul.nav').outerHeight();
var playerHeight = windowHeight;

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player, videoData;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: playerHeight,
    width: '100%',
    videoId: videoId,
    playerVars: { 'autoplay': 1,
                  'controls': 0,
                  'iv_load_policy': 3,
                  'loop': 1,
                  'frameborder': 0,
                  'showinfo': 0,
                  'modestbranding': 1,
                  'autohide': 1,
                  'playlist': videoId
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  videoData = player.getVideoData();
  videoID = videoData['video_id'];
  player.playVideo(videoID);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
  videoData = player.getVideoData();
  videoID = videoData['video_id'];
  if (event.data === YT.PlayerState.ENDED) {
      player.playVideo(videoID);
  }
}
function stopVideo() {
  player.stopVideo();
}

function onPlayerReady(event) {
  event.target.setPlaybackQuality('highres');
}

function main() {
  $("body").css("overflow", "hidden");
  $('body').height( $('#player') + navHeight );
}

$('#mute-toggle').on('click', function() {
  var mute_toggle = $(this);
  var icon = $(mute_toggle.find('span'));

  if(player.isMuted()){
      player.unMute();
      icon.toggleClass('glyphicon-volume-off glyphicon-volume-up');
  }
  else{
      player.mute();
      icon.toggleClass('glyphicon-volume-off glyphicon-volume-up');
  }
});

$(document).on('click', 'a', function ( e ) {
  var status_id = $(this).attr('href').split('=');
  videoID = status_id[1];
  if (videoID !== undefined) {
    player.loadVideoById(videoID);
    main();
  }
});

$(document).ready(function(){
  main();
});
