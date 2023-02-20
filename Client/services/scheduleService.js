window.onload = async function () {
  const result = await axios.get('http://localhost:3000/meeting');
  disponibleMeetings(result.data);
}; //petición con axios

function disponibleMeetings(meetings){

  console.log(meetings)
const numberOfDaysToAdd = 14; 

function generateDates() {
  let upDates = []; 

  for (let index = 0; index <= numberOfDaysToAdd; index++) {
    const numberOfDaysToAdd = index; //pa guardar el 7
    console.log(numberOfDaysToAdd)
    const sum = moment().add(numberOfDaysToAdd, 'days')
    upDates.push({hours: [13, 14,15, 16, 17, 18, 19], day: sum.format('DD')}) //agregar algo al arreglo
  } 
  return upDates  
}
let dates = generateDates();
const dayInput = document.getElementById('day');
const hoursSelect = document.getElementById('hours');
const dateForm = document.getElementById('date');
const today = new Date(); //object newDate ya es today

dayInput.min = today.toLocaleDateString('en-ca'); //establece minimo de today
dayInput.value = today.toLocaleDateString('en-ca');
const sum = today.setDate(today.getDate() + numberOfDaysToAdd); //sumando
const max = new Date(sum) //se le pone a new date lo que se sumo

dayInput.max = max.toLocaleDateString('en-ca'); //asigna al input el valor de max

// Muestra las horas disp en un dia
function fillOptions(date) {
  let selectedHours = []

  meetings.forEach(meeting =>  {

    const meetingDay = String( moment(meeting.day).date())
    if(meetingDay === date.day) {
      selectedHours.push(parseInt(meeting.hour))
    }
  })

 

  date.hours.forEach(hour => {
    const isSelected = selectedHours.find(selectedHour =>selectedHour === hour)

    if(isSelected) {
      return;
    }
    const option = document.createElement('option')
    option.value = hour
    option.innerHTML = `${hour}:00 PM`
    hoursSelect.appendChild(option)
  });
}

function deleteOptions() {
  hoursSelect.innerHTML = '';
}
fillOptions(dates[0])




dayInput.onchange = (event) => {
  deleteOptions()
    const selectedDay = moment(event.target.value).date();

    const currentDate = dates.find(
      (date)=> date.day === selectedDay.toString()
    )

    fillOptions(currentDate)
}
console.log(dateForm);

dateForm.onsubmit = (event)=> {
    console.log("bebitos comediantes")
    event.preventDefault();
    console.log("Entró al submit");
    console.log(event);
    const data = new FormData(dateForm);
    const day = data.get('day')
    const hour = parseInt(data.get('hours'))
    const dayString = moment(day).date().toString()

    console.log(day)
    console.log(dates)
    const date = dates.find((date)=> date.day === dayString) 
    //
    console.log("date", date);

    const hours = date.hours.filter(h => h!== hour)
    console.log("hours", hours);
    console.log("hour", hour);
    console.log("day", day);
    // console.log("date", date);

//no se le esta haciendo la peticion al servidor en el onSubmit
    const newDates = dates.map(d => {
        if(d.day === dayString){
            return { day:dayString, hours}
        }
        else {
            return d
        }
    })
    dates = newDates
    const token = localStorage.getItem("token");
    const tokenData = jwt_decode(token);
    const completeName = tokenData.given_name + " " + tokenData.family_name;
    const email = tokenData.email;

    axios.post(
        'http://localhost:3000/meeting/add', 
        {
            hour: hour,
            day: day,
            completeName: completeName,
            email: email,
        },
    )
        .then(res => alert("Petición enviada con éxito."))
        .catch(err => alert("Ocurrió un error."))
}//fin de funcion 


    //1. Guardas en variables los datos que necesitas guardar en BDD
    /*
    2. Utilizas axios o ajax para hacer una petición (mediante el Servidor) 
    a la BDD para guardar los datos.
    (Para el servidor (API REST) se necesita NodeJs y realizar una conexión
    a la BDD)
    3. Exponer un endpoint para guardar los datos (paso 2)

    */


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