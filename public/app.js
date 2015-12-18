


jQuery(document).ready(function() {
  $.ajax({

    url : "https://cors-anywhere.herokuapp.com/http://api.wunderground.com/api/d491a9e3880f0a90/forecast/q/80202.json",
    method: "GET",
    dataType: "json",
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
    url:"https://cors-anywhere.herokuapp.com/http://api.wunderground.com/api/d491a9e3880f0a90/conditions/q/80202.json",
      method: "GET",
    dataType: "json",
    success : function(response) {
      var currentLocation = response["current_observation"]["display_location"]["full"];
      var currentTemp = response["current_observation"]["temp_f"];
      $(".flex-container").append(    '<li class="flex-item" id="firstWeatherbit">  Current Temp: <br> <span>' + currentTemp + ' &deg;F</span></li>');
      $("#weatherHeader").append( '<span> in ' + currentLocation + ' </span>')
    }
  });
});
$(function() {
  $( "#draggable" ).draggable();
  $( "#droppable" ).droppable({
    drop: function( event, ui ) {
      $( this )
        .addClass( "ui-state-highlight" )
        .find( "p" )
          .html( "Dropped!" );
    }
  });
});


$(".btn-primary").click(function(){

  $("#right").append(
  '<div id="draggable" class="ui-widget-content"><p>'+ $("#textarea")[0].value + '</p></div>'
    )
    
})



var defaults = {
  // CSS selectors and attributes that would be used by the JavaScript functions
  todoTask: "todo-task",
  // todoHeader: "task-header",
  // todoDate: "task-date",
  todoDescription: "task-description",
  taskId: "task-",
  formId: "todo-form",
  dataAttribute: "data",
  deleteDiv: "delete-div"
}, codes = {
  "1" : "#pending", // For pending tasks
  "2" : "#inProgress",
  "3" : "#completed"
};

// Add Task
var generateElement = function(params) {
  var parent = $(codes[params.code]),
      wrapper;

  if (!parent) {
    return;
  }

  wrapper = $("<div />", {
    "class" : defaults.todoTask,
    "id" : defaults.taskId + params.id,
    "data" : params.id
  }).appendTo(parent);

  // $("<div />", {
  //   "class" : defaults.todoHeader,
  //   "text": params.title
  // }).appendTo(wrapper);

  // $("<div />", {
  //   "class" : defaults.todoDate,
  //   "text": params.date
  // }).appendTo(wrapper);

  $("<div />", {
    "class" : defaults.todoDescription,
    "text": params.description
  }).appendTo(wrapper);
};

var removeElement = function(params) {
  $("#" + defaults.taskId + params.id).remove();
};

var data = JSON.parse(localStorage.getItem("todoData"));
