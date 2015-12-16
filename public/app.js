
(function() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();

jQuery(document).ready(function() {
  $.ajax({

    url : "http://api.wunderground.com/api/d491a9e3880f0a90/forecast/q/80202.json",
    method: "GET",
    dataType: "jsonp",
    success: function(parsed_json){
      var todayTime = parsed_json["forecast"]["txt_forecast"]["date"];
      var dayOfWeek = parsed_json["forecast"]["txt_forecast"]["forecastday"][0]["title"]
      var forecastText = parsed_json["forecast"]["txt_forecast"]["forecastday"][0]["fcttext"];
      var todayHigh = parsed_json["forecast"]["simpleforecast"]["forecastday"][0]["high"]["fahrenheit"];
      var todayLow = parsed_json["forecast"]["simpleforecast"]["forecastday"][0]["low"]["fahrenheit"];
      var conditions = parsed_json["forecast"]["simpleforecast"]["forecastday"][0]["conditions"];
      var icon = parsed_json["forecast"]["txt_forecast"]["forecastday"][0]["icon"];
      var iconURL = parsed_json["forecast"]["txt_forecast"]["forecastday"][0]["icon_url"];
      $(".flex-container").append(    '<li class="flex-item"> Update as of: '+ dayOfWeek + ' at ' + todayTime +'</li>');

      $(".flex-container").append( '<li><img src="' +iconURL+ '"/>'+ conditions +'</li>');
      $(".flex-container").append(    '<li id="forecastText" class="flex-item">'+ forecastText +' </li>');
    }
  });
  $.ajax( {
    url:"http://api.wunderground.com/api/d491a9e3880f0a90/conditions/q/80202.json",
      method: "GET",
    dataType: "jsonp",
    success : function(response) {
      var currentLocation = response["current_observation"]["display_location"]["full"];
      var currentTemp = response["current_observation"]["temp_f"];
      $(".flex-container").append(    '<li class="flex-item" id="firstWeatherbit">  Current Temp: <br> <span>' + currentTemp + ' &deg;F</span></li>');
      $("#weatherHeader").append( '<span> in ' + currentLocation + ' </span>')
    }
  });
});
