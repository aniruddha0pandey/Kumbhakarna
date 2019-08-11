function sendEmails(values, sheet) {
  var subject = "CYPHER LPU :: Code Apocalypse 4.0 Certificate";
  
  var folder = DriveApp.getFolderById(emailFolderId);
  var messageHTML = folder.getFilesByName('body.html').next().getAs('text/html').getDataAsString();
  var messageTXT = folder.getFilesByName('body.txt').next().getAs('text/html').getDataAsString();

  var cypherLogoUrl = "http://drive.google.com/uc?export=view&id=18rVE0Vk735DQq8_593rveYp3V1iCOcOy";
  var contestLogoUrl = "http://drive.google.com/uc?export=view&id=1F_ZrqSfnA_0tr08mAoK2spA4aKmjG3yj";
  var facebookLogoUrl = "http://drive.google.com/uc?export=view&id=1E3JkVFsc_AJkXOOXERCghv2fEM2N5Hld";
  var linkedinLogoUrl = "http://drive.google.com/uc?export=view&id=1dzd3Bj6GI9C1yekMERzkm0zpmEbDKzsa";
  
  var cypherLogoBlob = UrlFetchApp.fetch(cypherLogoUrl).getBlob().setName("cypherLogoBlob");
  var contestLogoBlob = UrlFetchApp.fetch(contestLogoUrl).getBlob().setName("contestLogoBlob");
  var facebookLogoBlob = UrlFetchApp.fetch(facebookLogoUrl).getBlob().setName("facebookLogoBlob");
  var linkedinLogoBlob = UrlFetchApp.fetch(linkedinLogoUrl).getBlob().setName("linkedinLogoBlob");
  
  for ( var i = 1; i < values.length; ++i ) {
    if (values[i][11] != "EMAIL_SENT") {
      MailApp.sendEmail(values[i][2], subject, addDetails(messageTXT, values, i), {
        name: "CYPHER Programming Organization",
        from: "anirudh.pandev@gmail.com",
        htmlBody: addDetails(messageHTML, values, i),
        inlineImages: {
          cypherLogo: cypherLogoBlob,
          contestLogo: contestLogoBlob,
          facebookLogo: facebookLogoBlob,
          linkedinLogo: linkedinLogoBlob,
        }
      });
      sheet.getRange(i + 1, 12).setValue("EMAIL_SENT");
      SpreadsheetApp.flush();
    }
  }
}

function addDetails(message, values, i) {
  return message
    .replace("${member1Name}", values[i][6])
    .replace("${member2Name}", values[i][7])
    .replace("${certificateUrl}", values[i][12]);
}
