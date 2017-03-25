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
        maxResults: 50,
        type: 'video'
      });

      request.execute(handleResponse);
    }
  }])
}

module.exports = search;
