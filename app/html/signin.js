function body_onload() {

    sessionStorage.setItem("login", "");

    if (localStorage.chkRememb != null) {
        document.getElementById("txtEmployeeID").value = localStorage.chkRemember;
        document.getElementById("chkRemember").checked = true;

    }
    btnSignIn.onclick = btnSignIn_onclick;
}

var attempt = 3; // Variable to count number of attempts.
function btnSignIn_onclick() {

    //Check to make sure all the inputs are valid
    if (txtEmployeeID.value === "") {
        alert("Employee ID is required.");
        txtEmployeeID.focus();
        return;
    }
    if (txtPassword.value === "") {
        alert("Password is required.");
        txtPassword.focus();
        return;
    }

    if (validateSignIn() === true) {
        //window.open('mainpage.html') //opens the target page while Id & password matches
        window.location = "mainpage.html"; // Redirecting to other page.
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

// Below function Executes on click of login button.
function validateSignIn() {
    var arrEmployeeID = ["mamadou", "ebriama", "samba", "demba", "pateh"];
    var arrPassword = ["Saabako", "Volvonize", "BaMbino", "Koloca", "bambatous"];

    var username = document.getElementById("txtEmployeeID").value;
    var password = document.getElementById("txtPassword").value;
    var rememberchk = document.getElementById("chkRemember").value;
    var valid = false;

    for (i = 0; i < arrEmployeeID.length; i++) {
        if (username == arrEmployeeID[i] && password == arrPassword[i]) {
            if (document.getElementById("chkRemember").checked === true) {
                localStorage.chkRememb = "username";
                localStorage.chkRemember = username;
            }
            sessionStorage.login = "login";
            valid = true;
            break;
        }
    }
    if (valid === true) {
        return true;
    }
    return false;
}