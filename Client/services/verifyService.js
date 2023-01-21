const verifyForm = document.getElementById("verifyForm");
var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

verifyForm.onsubmit = async (event) => {
  event.preventDefault();

  const data = new FormData(verifyForm);
  if (!validateVerifyData(data)) {
    await axios
      .patch("http://localhost:3000/user/verify", {
        code: data.get("code"),
        email: data.get("email"),
      })
      .then((res) => {
        alert("Usuario activado. Inicie sesión."); 
        window.location.href = "index.html";
      })
      .catch((err) => {
        console.log('err', err);
        alert(err.response.data);
      });
  }
};

function onlyDigits(s) {
  for (let i = s.length - 1; i >= 0; i--) {
    const d = s.charCodeAt(i);
    if (d < 48 || d > 57) return false
  }
  return true
}

function validateVerifyData(data) {
  const code = data.get("code");
  const email = data.get("email");
  console.log(code);
  console.log(email);

  if (!code || !email) {
    alert("Datos incompletos.");
    return true;
  }

  if (!validEmailRegex.test(email)) {
    alert("Email incorrecto");
    return true;
  }

  if (!onlyDigits(code)) {
    alert("Formato de código incorrecto (solo números)");
    return true;
  }
  return false;
}

