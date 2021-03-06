
var defaults = {
  // CSS selectors and attributes that would be used by the JavaScript functions
  clipTask: "clipTask",
  clipHeader: "clipHeader",
  clipDate: "clipDate",
  clipDescription: "clipDescription",
  clipId: "clip-",
  formId: "clipForm",
  dataAttribute: "data",
  deleteDiv: "delete-div"
}, codes = {
  "1" : "#open", // For pending tasks
  // "2" : "#inProgress",
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
     "class" : defaults.clipTask,
     "id" : defaults.taskId + params.id,
     "data" : params.id
   }).appendTo(parent);

   $("<div />", {
  "class" : defaults.clipHeader,
  "text": params.title
}).appendTo(wrapper);

$("<div />", {
    "class" : defaults.clipDate,
    "text": params.date
  }).appendTo(wrapper);


  $("<div />", {
    "class" : defaults.clipDescription,
    "text": params.description
  }).appendTo(wrapper);
};

var removeElement = function(params) {
  $("#" + defaults.taskId + params.id).remove();
};

var data = JSON.parse(localStorage.getItem("clipData"));
localStorage.setItem("clipData", JSON.stringify(data));

var addItem = function() {
  var inputs = $("#" + defaults.formId + " :input"),
      errorMessage = "Title can not be empty",
      id, title, description, date, tempData;

  if (inputs.length !== 4) {
    return;
  }

  title = inputs[0].value;
  description = inputs[1].value;
  date = inputs[2].value;

  if (!title) {
    generateDialog(errorMessage);
    return;
  }

  id = new Date().getTime();

  tempData = {
    id : id,
    code: "1",
    title: title,
    date: date,
    description: description
  };

  // Saving element in local storage
  data[id] = tempData;
  localStorage.setItem("clipData", JSON.stringify(data));

  // Generate Todo Element
  generateElement(tempData);

  // Reset Form
  inputs[0].value = "";
  inputs[1].value = "";
  inputs[2].value = "";
};

// // Adding drop function to each category of task
// $.each(codes, function(index, value) {
//   $(value).droppable({
//     drop: function(event, ui) {
//       var element = ui.helper,
//           css_id = element.attr("id"),
//           id = css_id.replace(options.taskId, ""),
//           object = data[id];
//
//       // Removing old element
//       removeElement(object);
//
//       // Changing object code
//       object.code = index;
//
//       // Generating new element
//       generateElement(object);
//
//       // Updating Local Storage
//       data[id] = object;
//       localStorage.setItem("clipData", JSON.stringify(data));
//
//       // Hiding Delete Area
//       $("#" + defaults.deleteDiv).hide();
//     }
//   });
// });
//
//
// // Adding drop function to delete div
// $("#" + options.deleteDiv).droppable({
//   drop: function(event, ui) {
//     var element = ui.helper,
//         css_id = element.attr("id"),
//         id = css_id.replace(options.taskId, ""),
//         object = data[id];
//
//     // Removing old element
//     removeElement(object);
//
//     // Updating local storage
//     delete data[id];
//     localStorage.setItem("clipData", JSON.stringify(data));
//
//     // Hiding Delete Area
//     $("#" + defaults.deleteDiv).hide();
//   }
// });
