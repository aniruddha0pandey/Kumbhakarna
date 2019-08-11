function saveDataToDrive(values) {
  var database = [];
  if (!values) Logger.log("Error");
  else {
    for ( var i = 1; i < values.length; ++i ) {
      database.push({
          name: values[i][1],
          email: values[i][2],
          phone: values[i][3],
          member1: [values[i][6],values[i][4]],
          member2: [values[i][7],values[i][5]]
      });
    }
  }
  
  var folder = DriveApp.getFolderById(driveId);
  folder.createFile("details.json", JSON.stringify(database)); 
}
