
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

const dayInput = document.getElementById('day')
const hoursSelect = document.getElementById('hours')
const dateForm = document.getElementById('date')

dayInput.onchange = (event) => {
    // console.log("something changed");
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
    console.log("dwadwada")
    console.log(event)
    event.preventDefault()
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
}

