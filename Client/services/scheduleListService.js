window.onload = async function () {
  const result = await axios.get('http://localhost:3000/meeting');
  //aqui

  mapMeetingsToTableRow(result.data);
};

function mapMeetingsToTableRow(rows) {
  let table = document.getElementById("scheduleTable");

  rows.forEach(rowData => {
    let row = table.insertRow(-1);
    let pacientName = row.insertCell(-1);
    let email = row.insertCell(1);
    let day = row.insertCell(2);
    let hour = row.insertCell(3);
    let meetingCode = row.insertCell(4);
    pacientName.innerHTML = rowData.completeName;
    email.innerHTML = rowData.email;
    day.innerHTML = rowData.day;
    hour.innerHTML = rowData.hour;
    meetingCode.innerHTML = rowData._id;
  });
}

//en lugar que de que llene las opciones de la tabla, hace lo de las horas disponibles