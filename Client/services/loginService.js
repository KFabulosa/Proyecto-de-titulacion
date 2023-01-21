const loginForm = document.getElementById("loginForm");
var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

loginForm.onsubmit = async (event) => {
  event.preventDefault();


  const data = new FormData(loginForm);
  if (!validateLoginData(data)) {
    await axios
      .post("http://localhost:3000/user/login", {
        password: data.get("password"),
        email: data.get("email"),
      })
      .then((response) => {
        alert("Logueado correctamente."); 
        // console.log('%cloginService.js line:17 response', 'color: #007acc;', response);
        localStorage.setItem("token", response.data);
        window.location.href = "schedule.html";
      })
      .catch((err) => {
        console.log('err', err);
        alert(err.response.data);
      });
  }
};

function validateLoginData(data) {
  const password = data.get("password");
  const email = data.get("email");
  console.log(password);
  console.log(email);

  if (!password || !email) {
    alert("Datos incompletos.");
    return true;
  }

  if (!validEmailRegex.test(email)) {
    alert("Email incorrecto");
    return true;
  }

  return false;
}
