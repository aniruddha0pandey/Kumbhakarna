function credentials() {
  const spreadsheetId = ${GOOGLE_SPREADSHEET_ID};
  const driveId = ${GOOGLE_DRIVE_ID};
  const emailFolderId = ${GOOGLE_EMAIL_FOLDER_ID};
  const [sheet, values] = main(spreadsheetId);
  
  saveDataToDrive(values, driveId);
  sendEmails(values, sheet, emailFolderId);
}
