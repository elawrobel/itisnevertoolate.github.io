document.addEventListener("DOMContentLoaded", function(){
     
     var button = document.querySelector(".btn");
     
     var email = document.querySelector("#email");
     var name = document.querySelector("#name");
     var surname = document.querySelector("#surname"); 
     var message = document.querySelector("#message");
     
     function sendForm (event) {
         var emailValue = email.value.indexOf("@") >= 0;
         var nameValue = name.value.length > 5;
         var surnameValue = surname.value.length > 5;         
     }
     
     button.addEventListener("click", sendForm);
 });