
//*<body>
//*   <form action="" id="date">
//*       <label for="">selecciona tu dia</label>
//*      <input type="date" id="day" name="day" value="2022-09-22">
 //*       <label for="cars">Selecciona la hora</label>
 //*       <select id="hours" name="hours"></select>

    //*    <button>Guardar</button>
    //*</form>
let dates = [{
    hours: [13, 14,15, 16, 17, 18, 19],
    day: '2022-09-22'
}, {
    hours: [13, 14,15, 16, 17, 18],
    day: '2022-10-22'
}];

const dayInput = document.getElementById('day');
const hoursSelect = document.getElementById('hours');
const dateForm = document.getElementById('date');

dayInput.onchange = (event) => {
    const value = event.target.value;
    console.log(value);

    let availableHours = [];

    for (let index = 0; index < dates.length; index++) {
        const currentDate = dates[index];
        if(currentDate.day === value){
            availableHours = currentDate.hours
        }
    }
    console.log(availableHours)

    for (let index = 0; index < availableHours.length; index++) {
        const hour = availableHours[index];
        const option = document.createElement('option')
        option.value = hour
        option.innerHTML = `${hour}:00 PM`
        hoursSelect.appendChild(option)
    }
}

dateForm.onsubmit = (event)=> {
    event.preventDefault();
    console.log("Entró al submit");
    console.log(event);
    const data = new FormData(dateForm);
    const day = data.get('day')
    const hour = parseInt(data.get('hours'))
    
    const date = dates.filter((date)=> date.day === day)[0]
    //
    console.log("date", date);

    const hours = date.hours.filter(h => h!== hour)
    console.log("hours", hours);
    console.log("hour", hour);
    console.log("day", day);
    // console.log("date", date);


    const newDates = dates.map(d => {
        if(d.day === day){
            return { day, hours}
        }
        else {
            return d
        }
    })
    dates = newDates

    //1. Guardas en variables los datos que necesitas guardar en BDD
    /*
    2. Utilizas axios o ajax para hacer una petición (mediante el Servidor) 
    a la BDD para guardar los datos.
    (Para el servidor (API REST) se necesita NodeJs y realizar una conexión
    a la BDD)
    3. Exponer un endpoint para guardar los datos (paso 2)

    */

    const token = localStorage.getItem("token");
    const tokenData = jwt_decode(token);
    const completeName = tokenData.given_name + " " + tokenData.family_name;
    const email = tokenData.email;

    axios.post(
        'http://129.153.92.104/meeting/add', 
        {
            hour: hour,
            day: day,
            completeName: completeName,
            email: email,
        },
    )
        .then(res => alert("Petición enviada con éxito."))
        .catch(err => alert("Ocurrió un error."))
}


// Encontrar la forma de no repetir este bloque de código
///////////////////////////////////////////////////////////////////////////////////////////////////

(function (factory) {
    typeof define === "function" && define.amd ? define(factory) : factory();
  })(function () {
    "use strict";
  
    /**
     * The code was extracted from:
     * https://github.com/davidchambers/Base64.js
     */
  
    var chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  
    function InvalidCharacterError(message) {
      this.message = message;
    }
  
    InvalidCharacterError.prototype = new Error();
    InvalidCharacterError.prototype.name = "InvalidCharacterError";
  
    function polyfill(input) {
      var str = String(input).replace(/=+$/, "");
      if (str.length % 4 == 1) {
        throw new InvalidCharacterError(
          "'atob' failed: The string to be decoded is not correctly encoded."
        );
      }
      for (
        // initialize result and counters
        var bc = 0, bs, buffer, idx = 0, output = "";
        // get next character
        (buffer = str.charAt(idx++));
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer &&
        ((bs = bc % 4 ? bs * 64 + buffer : buffer),
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4)
          ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
          : 0
      ) {
        // try to find character in table (0-63, not found => -1)
        buffer = chars.indexOf(buffer);
      }
      return output;
    }
  
    var atob =
      (typeof window !== "undefined" &&
        window.atob &&
        window.atob.bind(window)) ||
      polyfill;
  
    function b64DecodeUnicode(str) {
      return decodeURIComponent(
        atob(str).replace(/(.)/g, function (m, p) {
          var code = p.charCodeAt(0).toString(16).toUpperCase();
          if (code.length < 2) {
            code = "0" + code;
          }
          return "%" + code;
        })
      );
    }
  
    function base64_url_decode(str) {
      var output = str.replace(/-/g, "+").replace(/_/g, "/");
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += "==";
          break;
        case 3:
          output += "=";
          break;
        default:
          throw "Illegal base64url string!";
      }
  
      try {
        return b64DecodeUnicode(output);
      } catch (err) {
        return atob(output);
      }
    }
  
    function InvalidTokenError(message) {
      this.message = message;
    }
  
    InvalidTokenError.prototype = new Error();
    InvalidTokenError.prototype.name = "InvalidTokenError";
  
    function jwtDecode(token, options) {
      if (typeof token !== "string") {
        throw new InvalidTokenError("Invalid token specified");
      }
  
      options = options || {};
      var pos = options.header === true ? 0 : 1;
      try {
        return JSON.parse(base64_url_decode(token.split(".")[pos]));
      } catch (e) {
        throw new InvalidTokenError("Invalid token specified: " + e.message);
      }
    }
  
    /*
     * Expose the function on the window object
     */
  
    //use amd or just through the window object.
    if (window) {
      if (typeof window.define == "function" && window.define.amd) {
        window.define("jwt_decode", function () {
          return jwtDecode;
        });
      } else if (window) {
        window.jwt_decode = jwtDecode;
      }
    }
  });
  //# sourceMappingURL=jwt-decode.js.map