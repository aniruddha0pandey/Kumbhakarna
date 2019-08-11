# Kumbhakarna

I've used Adobe [Photoshop]("https://www.photoshop.com/") and [Extendscript Toolkit CC]("https://helpx.adobe.com/download-install/kb/creative-cloud-apps-download.html") to programmatically generate certificates from `details.json` which was generated from `saveDataToDrive.gs`.

I've used [Google Apps Script]("https://script.google.com") to send emails using the `sendEmails.gs` script, which used the GMail, Sheets and Drive API.

All configurations and keys are saved in the `.env` file in root directory, thus in `.gitignore`. Use the below command to generate `credentials.gs` file from `.env` file. Tried to use Twelve-Factor App methodology as far as possible.
```bash
$ chmod 755 ./entrypoint.sh
$ ./entrypoint.sh
```

The certificates are stored in heroku's clojure based postgres database in a hash table.

## Project Structure
- `builds` folder contain the compiled certificates.
- `psd` contains the photoshop files.
- `emails` contains the email related files.
- `server` contains the clojure server.

