var apis = require('../api/init.js');

function home($scope, $sce, searchVideo, lsConnector){

  var DEFAULT_VIDEO_ID = 'cXDgW04p_1w';
  var BASE_URL = 'http://www.youtube.com/embed/';
  var DEFAULT_URL = 'http://www.youtube.com/embed/' + DEFAULT_VIDEO_ID;
  var AUTOPLAY = '?autoplay=1';

  $scope.myList = {};
  $scope.currVid = {};
  $scope.currVidUrl = DEFAULT_URL;
  $scope.searchText = '';
  $scope.searchResults = [];

  $scope.trustUrl = $sce.trustAsResourceUrl;

  function getVideoUrl(id){
    return BASE_URL + id + AUTOPLAY;
  }

  //load videos from local storage
  function loadVideos(){
    $scope.myList = lsConnector.load();
  }

  //return size of library list
  function getSizeOfList(){
    return Object.keys($scope.myList).length;
  }

  //select video fro watching
  function selectVideo(video){
    $scope.currVid = video;
    $scope.currVidUrl = getVideoUrl(video.id);
  }

  //add video to library
  function addVideoToList(video){
    if ($scope.myList[video.id] == undefined)
      $scope.myList[video.id] = video;

    lsConnector.save($scope.myList);
  }

  //remove video from library
  function removeVideo(video){
    if ($scope.myList[video.id] != undefined)
      delete $scope.myList[video.id];

    lsConnector.save($scope.myList);
  }

  //search youtube
  function search(e){
    if ($scope.searchText.length > 0){
      searchVideo($scope.searchText, function(res){
        $scope.searchResults = res;
        $scope.$apply();
      })
    }
    else{
      $scope.searchResults = [];
    }
  }

  $scope.getSizeOfList = getSizeOfList;
  $scope.selectVideo = selectVideo;
  $scope.addVideoToList = addVideoToList;
  $scope.removeVideo = removeVideo;
  $scope.search = search;

  function init(){
    //load all the google APIs (client & youtube)
    apis(function(){ console.log('google api loaded!') })
    loadVideos();
  }

  init();

}

module.exports = home;
