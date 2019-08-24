function saveDataToDrive(values, driveId) {
  var database = [];
  var srno = 0;
  if (!values) Logger.log("Error");
  else {
    for ( var i = 1; i < values.length; ++i ) {
      if (values[i][2] === "") continue;
      database.push({
          srno: ++srno,
          name: values[i][1],
          email: values[i][2],
          phone: values[i][3],
          member1: [values[i][6],values[i][4]],
          member2: [values[i][7],values[i][5]]
      });
    }
  }
  
  var folder = DriveApp.getFolderById(driveId);
  folder.createFile("participants.json", JSON.stringify(database)); 
}
