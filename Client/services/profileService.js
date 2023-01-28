//utlizar window.onload para dentro de él obtener el token y
//descodificarlo (copiando el código del descodificador) Código del JWT Decode
//utilizar jquery para settear el input name con la información de la variable correspondiente al nombre
// creo que se llama "given_name"

window.onload = function () {
  const token = localStorage.getItem("token");
  const data = jwt_decode(token);
  console.log("data:", data);

  $("#name").text(data.name + " " + data.lastname);
  const img = document.getElementById("image");
  // img.src = data.picture;
  img.src = 'https://img.freepik.com/free-icon/user_318-875902.jpg';
  $("#email").text(data.email);
};

function signOut() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

async function payMeeting() {
  const result = await axios.get(
    'http://http://129.153.92.104/meeting/payment'
  );
  let newTab = window.open(result.data.init_point, '_blank', '');
}

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
