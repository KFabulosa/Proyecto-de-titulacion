const registerForm = document.getElementById("registerForm");
var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

registerForm.onsubmit = async (event) => {
  event.preventDefault();
  console.log("Entró al submit register");
  console.log(event);

  const data = new FormData(registerForm);
  if (!validateData(data)) { 
    await axios
      .post("http://localhost:3000/user/register", {
        name: data.get("name"),
        lastname: data.get("lastname"),
        email: data.get("email"),
        phoneNumber: data.get("phoneNumber"),
        password: data.get("password"),
      })
      .then((res) => alert("Usuario creado con éxito. Verificar bandeja de correo."))
      .catch((err) => {
        console.log('%cregisterService.js line:20 err', 'color: #007acc;', err);
        alert(err.response.data);
      });
  }
};


function validateData(data) {
  const name = data.get("name");
  const lastname = data.get("lastname");
  const email = data.get("email");
  const phoneNumber = data.get("phoneNumber");
  const password = data.get("password");
  const confirmPassword = data.get("confirmPassword");

  if (
    !name || 
    !lastname || 
    !email || 
    !phoneNumber || 
    !password || 
    !confirmPassword
  ) {
    alert("Datos incompletos.");
    return true;
  }
  if (!validEmailRegex.test(email)) {
    alert("Email incorrecto");
    return true;
  }
  if (!onlyDigits(phoneNumber)) {
    alert("Número de teléfono incorrecto");
    return true;
  }
  if (!(password === confirmPassword)) {
    alert("Las contraseñas no son iguales");
    return true;
  }
  return false;
}

function onlyDigits(s) {
  for (let i = s.length - 1; i >= 0; i--) {
    const d = s.charCodeAt(i);
    if (d < 48 || d > 57) return false
  }
  return true
}