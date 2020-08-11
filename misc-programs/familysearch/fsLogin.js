javascript: (
    function () {
        let userData = {
            "username": "user",
            "password": "pass"
        }
        let main = event => {
            document.removeEventListener("copy", main, true);
            event.preventDefault();

            document.getElementById("userName").value = userData.username
            document.getElementById("password").value = userData.password
            document.getElementById("login").click()
        };
        document.addEventListener("copy", main, true);
        document.execCommand("copy")
    }
  )()