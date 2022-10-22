
//*<body>
//*   <form action="" id="date">
//*       <label for="">selecciona tu dia</label>
//*      <input type="date" id="day" name="day" value="2022-09-22">
 //*       <label for="cars">Selecciona la hora</label>
 //*       <select id="hours" name="hours"></select>

    //*    <button>Guardar</button>
    //*</form>
            let dates = [{
                hours: [13, 14,15, 16, 17, 18],
                day: '2022-09-22'
            }, {
                hours: [13, 14,15, 16, 17, 18],
                day: '2022-10-22'
            }];
            
            const dayInput = document.getElementById('day')
            const hoursSelect = document.getElementById('hours')
            const dateForm = document.getElementById('date')

            dayInput.onchange = (event) => {
                const value = event.target.value
                console.log(value);

                let avalibleHours = []

                for (let index = 0; index < dates.length; index++) {
                    const currentDate = dates[index];
                    if(currentDate.day === value){
                        avalibleHours = currentDate.hours
                    }
                }
                console.log(avalibleHours)

           

                for (let index = 0; index < avalibleHours.length; index++) {
                    const hour = avalibleHours[index];
                    const option = document.createElement('option')
                    option.value = hour
                    option.innerHTML = `${hour}:00 PM`
                    hoursSelect.appendChild(option)
                }
                 
            
            }

            dateForm.onsubmit = (event)=> {
                console.log(event)
                event.preventDefault()
                const data = new FormData(dateForm);
                const day = data.get('day')
                const hour = parseInt(data.get('hours'))
                
                const date = dates.filter((date)=> date.day === day)[0]
                const hours = date.hours.filter(h => h!== hour)

                const newDates = dates.map(d => {
                    if(d.day === day){
                        return { day, hours}
                    }
                    else {
                        return d
                    }
                })
                dates = newDates
            }

  