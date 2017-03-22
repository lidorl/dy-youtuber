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
