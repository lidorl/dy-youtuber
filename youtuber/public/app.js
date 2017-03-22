/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var apis = __webpack_require__(3);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function lsConnector($provide){
  $provide.factory('lsConnector', function(){

    var appLsKey = 'Bjr38DvwCC';

    function load(){
      var videos = localStorage.getItem(appLsKey)
      if (videos)
        videos = JSON.parse(videos)
      else
        videos = {}
      return videos
    }

    function save(videos){
      if (videos && typeof videos == 'object')
        localStorage.setItem(appLsKey, JSON.stringify(videos))
    }

    return {
      load: load,
      save: save
    }
  })
}

module.exports = lsConnector;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function search($provide){
  $provide.factory('searchVideo', ['$http', function($http){
    return function(params, next){

      function handleResponse(response){
        var arrToRet = [];
        response.result.items.forEach(function(item){
          arrToRet.push({
            title: item.snippet.title,
            desc: item.snippet.description,
            pic: item.snippet.thumbnails.medium,
            id: item.id.videoId
          })
        })
        next(arrToRet);
      }

      var request = gapi.client.youtube.search.list({
        q: params,
        part: 'snippet',
        maxResults: 10,
        type: 'video'
      });

      request.execute(handleResponse);
    }
  }])
}

module.exports = search;


/***/ }),
/* 3 */
/***/ (function(module, exports) {


function initAPI(onLoad){
  gapi.load('client', function(){
    gapi.client.setApiKey('AIzaSyBqFIt8tOFbDJ2sJOh65RAQE7FA99j2MqI')
    gapi.client.load('youtube', 'v3', onLoad);
  })
}

module.exports = initAPI;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var lsConnector = __webpack_require__(1);
var searchVideo = __webpack_require__(2);;
var homeController = __webpack_require__(0);

var app = angular.module('youtuberApp', []);

// register services
app.config(['$provide', function($provide){
  searchVideo($provide);
  lsConnector($provide);
}])

//register controller
app.controller('homeController', ['$scope', '$sce', 'searchVideo', 'lsConnector', homeController]);

//register custom directives

//you tube player directvei
app.directive('dyYoutubePlayer', function(){
  return {
    templateUrl: 'templates/player.html'
  }
})

//search result directive
app.directive('searchResultBlock', function(){
  return {
    templateUrl: 'templates/search-result.html',
    link: function(scope, element, attrs){
      element[0].firstChild.addEventListener('click',function(){
        var parent = this.parentElement;
        var container = parent.parentElement;
        this.classList.add('search-result-block-out');
        setTimeout(function(){container.removeChild(parent)}, 200);
      })
    }
  }
})

//library item direcive
app.directive('myListItem', function(){
  return {
    templateUrl: 'templates/list-item.html'
  }
})

//horizontal scroll for library
app.directive('dyScroll', function(){
  return (function(scope, element, attrs){
    var delta = 0;
    element[0].addEventListener('mousewheel', function(e){
      if (e.deltaY > 0)
        delta -= 5;
      else
        delta += 5;
      delta = (delta > 0) ? 0 : delta;
      delta = (delta < -50) ? -50 : delta;
      this.style.transform = 'translate(' + delta + '%,0)'
    })
  })
})


/***/ })
/******/ ]);