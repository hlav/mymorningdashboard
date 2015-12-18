


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


  for (var key in localStorage) {
    $("#right").append(
      '<div id="draggable" class="ui-widget-content"><p>'+ localStorage[key] + '</p></div>'
    );
  };



    });


// });
// $(function() {
//   $( "#draggable" ).draggable();
//   $( "#droppable" ).droppable({
//     drop: function( event, ui ) {
//       $( this )
//         .hide();
//         var removeElement = function() {
//           $("#draggable").remove();
//         };
        // .addClass( "ui-state-highlight" )
        // .find( "p" )
        //   .html( "Dropped!" );
    // }



// });



$(".btn-primary").click(function(){

  $("#right").append(
  '<div id="draggable" class="ui-widget-content"><p>'+ $("#textarea")[0].value + '</p></div>'
);
  localStorage.setItem("note"+Date.now(), ($("#textarea")[0].value));
  $( "#draggable" ).draggable();

});

// var todo = todo || {},
//     data = JSON.parse(localStorage.getItem("todoData"));
//
// data = data || {};
//
// (function(todo, data, $) {
//
//     var defaults = {
//             todoTask: "todo-task",
//             todoHeader: "task-header",
//             todoDate: "task-date",
//             todoDescription: "task-description",
//             taskId: "task-",
//             formId: "todo-form",
//             dataAttribute: "data",
//             deleteDiv: "delete-div"
//         }, codes = {
//             "1" : "#pending",
//             "2" : "#inProgress",
//             "3" : "#completed"
//         };
//
//     todo.init = function (options) {
//
//         options = options || {};
//         options = $.extend({}, defaults, options);
//
//         $.each(data, function (index, params) {
//             generateElement(params);
//         });
//
//         /*generateElement({
//             id: "123",
//             code: "1",
//             title: "asd",
//             date: "22/12/2013",
//             description: "Blah Blah"
//         });*/
//
//         /*removeElement({
//             id: "123",
//             code: "1",
//             title: "asd",
//             date: "22/12/2013",
//             description: "Blah Blah"
//         });*/
//
//         // Adding drop function to each category of task
//         $.each(codes, function (index, value) {
//             $(value).droppable({
//                 drop: function (event, ui) {
//                         var element = ui.helper,
//                             css_id = element.attr("id"),
//                             id = css_id.replace(options.taskId, ""),
//                             object = data[id];
//
//                             // Removing old element
//                             removeElement(object);
//
//                             // Changing object code
//                             object.code = index;
//
//                             // Generating new element
//                             generateElement(object);
//
//                             // Updating Local Storage
//                             data[id] = object;
//                             localStorage.setItem("todoData", JSON.stringify(data));
//
//                             // Hiding Delete Area
//                             $("#" + defaults.deleteDiv).hide();
//                     }
//             });
//         });
//
//         // Adding drop function to delete div
//         $("#" + options.deleteDiv).droppable({
//             drop: function(event, ui) {
//                 var element = ui.helper,
//                     css_id = element.attr("id"),
//                     id = css_id.replace(options.taskId, ""),
//                     object = data[id];
//
//                 // Removing old element
//                 removeElement(object);
//
//                 // Updating local storage
//                 delete data[id];
//                 localStorage.setItem("todoData", JSON.stringify(data));
//
//                 // Hiding Delete Area
//                 $("#" + defaults.deleteDiv).hide();
//             }
//         })
//
//     };
//
//     // Add Task
//     var generateElement = function(params){
//         var parent = $(codes[params.code]),
//             wrapper;
//
//         if (!parent) {
//             return;
//         }
//
//         wrapper = $("<div />", {
//             "class" : defaults.todoTask,
//             "id" : defaults.taskId + params.id,
//             "data" : params.id
//         }).appendTo(parent);
//
//         // $("<div />", {
//         //     "class" : defaults.todoHeader,
//         //     "text": params.title
//         // }).appendTo(wrapper);
//         //
//         // $("<div />", {
//         //     "class" : defaults.todoDate,
//         //     "text": params.date
//         // }).appendTo(wrapper);
//
//         $("<div />", {
//             "class" : defaults.todoDescription,
//             "text": params.description
//         }).appendTo(wrapper);
//
// 	    wrapper.draggable({
//             start: function() {
//                 $("#" + defaults.deleteDiv).show();
//             },
//             stop: function() {
//                 $("#" + defaults.deleteDiv).hide();
//             },
// 	        revert: "invalid",
// 	        revertDuration : 200
//         });
//
//     };
//
//     // Remove task
//     var removeElement = function (params) {
//         $("#" + defaults.taskId + params.id).remove();
//     };
//
//     todo.add = function() {
//         var inputs = $("#" + defaults.formId + " :input"),
//             errorMessage = "Title can not be empty",
//             id, title, description, date, tempData;
//
//         if (inputs.length !== 4) {
//             return;
//         }
//
//         title = inputs[0].value;
//         description = inputs[1].value;
//         date = inputs[2].value;
//
//         if (!title) {
//             generateDialog(errorMessage);
//             return;
//         }
//
//         id = new Date().getTime();
//
//         tempData = {
//             id : id,
//             code: "1",
//             title: title,
//             date: date,
//             description: description
//         };
//
//         // Saving element in local storage
//         data[id] = tempData;
//         localStorage.setItem("todoData", JSON.stringify(data));
//
//         // Generate Todo Element
//         generateElement(tempData);
//
//         // Reset Form
//         inputs[0].value = "";
//         inputs[1].value = "";
//         inputs[2].value = "";
//     };
//
//     var generateDialog = function (message) {
//         var responseId = "response-dialog",
//             title = "Messaage",
//             responseDialog = $("#" + responseId),
//             buttonOptions;
//
//         if (!responseDialog.length) {
//             responseDialog = $("<div />", {
//                     title: title,
//                     id: responseId
//             }).appendTo($("body"));
//         }
//
//         responseDialog.html(message);
//
//         buttonOptions = {
//             "Ok" : function () {
//                 responseDialog.dialog("close");
//             }
//         };
//
// 	    responseDialog.dialog({
//             autoOpen: true,
//             width: 400,
//             modal: true,
//             closeOnEscape: true,
//             buttons: buttonOptions
//         });
//     };
//
//     todo.clear = function () {
//         data = {};
//         localStorage.setItem("todoData", JSON.stringify(data));
//         $("." + defaults.todoTask).remove();
//     };
//
// })(todo, data, jQuery);
