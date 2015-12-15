// var ajaxCall = $.ajax( {
//   url:"http://api.wunderground.com/api/d491a9e3880f0a90/geolookup/q/80210.json",
//   method: "GET",
//   dataType: "json"
// });
//
// ajaxCall.done(function(response){
//   console.log(response);
// })


jQuery(document).ready(function() {
  $.ajax({
  url : "http://api.wunderground.com/api/d491a9e3880f0a90/forecast/q/80202.json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var todayTime = parsed_json["forecast"]["txt_forecast"]["date"];
  var dayOfWeek = parsed_json["forecast"]["txt_forecast"]["forecastday"][0]["title"]
  var forecastText = parsed_json["forecast"]["txt_forecast"]["forecastday"][0]["fcttext"];
  var todayHigh = parsed_json["forecast"]["simpleforecast"]["forecastday"][0]["high"]["fahrenheit"];
  var todayLow = parsed_json["forecast"]["simpleforecast"]["forecastday"][0]["low"]["fahrenheit"];
  var conditions = parsed_json["forecast"]["simpleforecast"]["forecastday"][0]["conditions"];
  var icon = parsed_json["forecast"]["txt_forecast"]["forecastday"][0]["icon"];
  var iconURL = parsed_json["forecast"]["txt_forecast"]["forecastday"][0]["icon_url"];
  $(".flex-container").append(    '<li class="flex-item">'+ dayOfWeek + " at "+ todayTime +'</li>');

  $(".flex-container").append( '<li><img src="' +iconURL+ '"/>'+ conditions +'</li>');
  $(".flex-container").append(    '<li class="flex-item">'+ forecastText +'</li>');

  }
  });
});
