//firebase

var config = {
  apiKey: "AIzaSyBgjgwDaWiqUh5TLUMVIV9qwVmn_omF0fM",
  databaseURL: "https://myday-60f4f.firebaseio.com",
};

var app = firebase.initializeApp(config);


// cookie 

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getTask(){
 var wall = getCookie('wall');
     // console.log(wall);
 var tasks = app.database().ref('walls/'+wall);
     // console.log(tasks);
 tasks.once("value").then(function(data) {
   // console.log(data.val());
   var defaultTask = data.val();
      console.log(defaultTask);

  var ticket = document.querySelector('.ticket');
  ticket.innerText = defaultTask.task1[0];
 });

}

document.addEventListener("DOMContentLoaded", function(event) {
  var wall = getCookie('wall');
    // console.log(wall);
  getTask();


// change name wall

document.querySelector('.claim').innerText = wall;
console.log(wall);


// ADD TASK - all 

var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");
var label = document.createElement("label");


//New Task
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var link = document.createElement("a");
  var editInput = document.createElement("input"); 
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  
      checkBox.type = "checkbox";
      editInput.type = "text";

  editButton.className = "edit glyphicon glyphicon-pencil";
  deleteButton.className = "delete glyphicon glyphicon-trash";
  

  link.innerHTML = taskString;
  
      listItem.appendChild(label);
      listItem.appendChild(link);
      listItem.appendChild(editInput);
      listItem.appendChild(checkBox);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);

      return listItem;
    }



// Add a new task
var addTask = function() {
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);  
  
  taskInput.value = "";   
}


// Edit an existing task
var editTask = function() { 
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]")
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
    if(containsClass) {
      label.innerText = editInput.value;
    } else {
      editInput.value = label.innerText;
    }

    listItem.classList.toggle("editMode");
  }



// Delete an existing task
var deleteTask = function() {

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

// Mark a task as complete 
var taskCompleted = function() {

  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


// Mark a task as incomplete
var taskIncomplete = function() {

  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {

  var editButton = taskListItem.querySelector("button.edit");
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


for(var i = 0; i <  incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  }

for(var i = 0; i <  completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete); 

  }









});

