 // Initialize Firebase
 function body_onload() {
     sessionStorage.login = "";
     localStorage.rememberUser = "";
     if (localStorage.chkRememb != null) {
         document.getElementById("txtSignInEmail").value = localStorage.chkRemember;
         document.getElementById("txtSignInRemember").checked = true;

     }

     var config = {
         apiKey: "AIzaSyC464TZPeZqCQgfm_1o0kZNRY413MJmW08",
         authDomain: "fermion-f23d4.firebaseapp.com",
         databaseURL: "https://fermion-f23d4.firebaseio.com",
         projectId: "fermion-f23d4",
         storageBucket: "fermion-f23d4.appspot.com",
         messagingSenderId: "978855189389"
     };
     firebase.initializeApp(config);

     btnSignIn.onclick = btnSignIn_onclick;
 }



 var attempt = 3; // Variable to count number of attempts.
 function btnSignIn_onclick() {

     //Check to make sure all the inputs are valid
     if (txtSignInEmail.value === "") {
         alert("Employee ID is required.");
         txtEmployeeID.focus();
         return;
     }
     // validates email
     checkEmail();
     if (txtSignInPassword.value === "") {
         alert("Password is required.");
         txtPassword.focus();
         return;
     }

     if (validateSignIn() === true) {
         //window.open('mainpage.html') //opens the target page while Id & password matches
         window.location = "/html/mainpage.html"; // Redirecting to other page.
     } else {
         attempt--; // Decrementing by one.
         alert("Error Password or Username, You have left " + attempt + " attempt;");
         // Disabling fields after 3 attempts.
         if (attempt == 0) {
             document.getElementById("txtEmployeeID").disabled = true;
             document.getElementById("txtPassword").disabled = true;
             document.getElementById("btnSignIn").disabled = true;
             alert("Sorry you have ran out of attempt contact admin or refresh browser to try again");
         }
         return;
     }
 }

 function validateSignIn() {
     var email = document.getElementById("txtEmployeeID").value;
     var password = document.getElementById("txtPassword").value;
     var rememberchk = document.getElementById("chkRemember").value;
     var valid = false;

     // Sign in user
     firebase.auth().signInWithEmailAndPassword(email, password)
         .then(function(firebaseUser) {
             // Success 
             if (document.getElementById("chkRemember").checked === true) {
                 localStorage.rememberUser = username;
             }
             sessionStorage.login = "true";
             valid = true;
         })
         .catch(function(error) {
             // Error Handling
             var errorCode = error.code;
             var errorMessage = error.message;
             console.log('signIn error', error);
             // ...
         });

     if (valid === true) {
         return true;
     }
     return false;
 }

 function createUser(email, password) {

     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
         // ...
     });
 }


 //onclick='Javascript:checkEmail()
 function checkEmail() {

     var email = document.getElementById('txtSignInEmail');
     var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

     if (!filter.test(email.value)) {
         alert('Please provide a valid email address');
         email.focus;
         return;
     }
 }