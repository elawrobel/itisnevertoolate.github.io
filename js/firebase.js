// cookies
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// DOM loaded
document.addEventListener("DOMContentLoaded", function(event) {


// FIREBASE - database
var config = {
	apiKey: "AIzaSyBgjgwDaWiqUh5TLUMVIV9qwVmn_omF0fM",
	databaseURL: "https://myday-60f4f.firebaseio.com",
};


// create wall
var app = firebase.initializeApp(config);
var create = document.querySelector(".create");
console.log(create);

var textInput = document.querySelector('.createWall');
create.addEventListener('click', function(){
	var newWall = app.database().ref('walls/'+textInput.value);
	console.log(newWall.set({'task1': {
			// data: '02.02.2020',
			// time: '30min',
			complete: true
		}}));

	console.log(textInput.value);
    setCookie('wall',textInput.value);
    setTimeout(function(){
        window.location.href = 'todo.html';
    }, 3000);
    // console.log('added');  
});


create.addEventListener('click', function(){
	var walls = app.database().ref('walls');
	walls.once("value", function(data) {
		console.log(data.val());
	}, function (error) {
		console.log("Error: " + error.code);
	});
});


// search wall

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
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


var search = document.querySelector(".search");
console.log(search);
var searchWall = document.querySelector('.searchWall');

search.addEventListener('click', function(){
	var walls = app.database().ref('walls/'+searchWall.value);
	walls.on("value", function(data) {
		console.log(data.val());
	}, function (error) {
		console.log("Error: " + error.code);
	});
getCookie('wall', searchWall.value);
setTimeout(function(){
    window.location.href = 'todo.html';
}, 3000);

})






})