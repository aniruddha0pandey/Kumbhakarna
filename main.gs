function main() {
  var sheetName = "Form Responses 1";
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();
  return [sheet, values];
}
