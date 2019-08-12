const spreadsheetId = ${GOOGLE_SPREADSHEET_ID};
const driveId = ${GOOGLE_DRIVE_ID};
const emailFolderId = ${GOOGLE_EMAIL_FOLDER_ID};

const sheet = main()[0];
const values = main()[1];

saveDataToDrive(values);
sendEmails(values, sheet);
