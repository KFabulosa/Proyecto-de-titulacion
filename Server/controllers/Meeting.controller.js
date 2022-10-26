const meetingCtrl = {}

meetingCtrl.createNewMeeting = (req, res) => {
  res.send("new meeting");
  // obtener del req la hora y la fecha
  // guardar en bdd en el schema de meeting
  // mandar correo al usuario

  //codigo para enviar un correo
}

module.exports = meetingCtrl;