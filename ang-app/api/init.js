
function initAPI(onLoad){
  gapi.load('client', function(){
    gapi.client.setApiKey('AIzaSyBqFIt8tOFbDJ2sJOh65RAQE7FA99j2MqI')
    gapi.client.load('youtube', 'v3', onLoad);
  })
}

module.exports = initAPI;
