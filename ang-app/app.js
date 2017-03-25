var lsConnector = require('./services/ls-connector.js');
var searchVideo = require('./services/search.js');;
var homeController = require('./controllers/main.js');

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
    templateUrl: 'templates/player.html',
    link: function(scope, el, attr){
      //todo, add youtube player api
    }
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
    var el = element[0];
    element[0].parentElement.addEventListener('mousewheel', function(e){
      if (e.deltaY > 0)
        delta -= 5;
      else
        delta += 5;
      delta = (delta > 0) ? 0 : delta;
      delta = (delta < -50) ? -50 : delta;
      el.style.transform = 'translate(' + delta + '%,0)'
    })
  })
})
