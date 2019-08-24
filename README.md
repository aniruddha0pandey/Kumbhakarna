# Kumbhakarna

I've used Adobe [Photoshop]("https://www.photoshop.com/") and [Extendscript Toolkit CC]("https://helpx.adobe.com/download-install/kb/creative-cloud-apps-download.html") to programmatically generate certificates from `participants.json` & `merits.json` which was generated from `saveDataToDrive.gs`. Always remember to select the target application, Adobe Photoshop CC 2019 in my case.

Since JSON is not supported in Extendscript I used this pollyfill:
```js
if(typeof JSON!=='object'){JSON={};}(function(){'use strict';function f(n){return n<10?'0'+n:n;}function this_value(){return this.valueOf();}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};Boolean.prototype.toJSON=this_value;Number.prototype.toJSON=this_value;String.prototype.toJSON=this_value;}var cx,escapable,gap,indent,meta,rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
```

I've used [Google Apps Script]("https://script.google.com") to send emails using the `sendEmails.gs` script, which used the GMail, Sheets and Drive API.

I've used the `=PROPER()` function on names column to obtain proper casing for names in Google Spreadsheets.

All configurations and keys are saved in the `.env` file in root directory, thus in `.gitignore`. Use the below command to generate `credentials.gs` file from `.env` file. Tried to use Twelve-Factor App methodology as far as possible.
```bash
$ chmod 755 ./entrypoint.sh
$ ./entrypoint.sh
```

I've used [`Leiningen`]("https://leiningen.org/") to generate server project.
The certificates are stored in heroku postgres served using clojure server. The certificate key is encrypyted using SHA1 Hash Encoding.

## Create Project
```bash
$ lein new template server --to-dir server-template
$ lein new server backend
```

## Configureation
Dependencies in `project.clj` file.
```clj

```

## Development
```bash
$ lein deps
$ lein ring server
$ # lein run -m backend.web
```

## Local
```clj
$ lein repl
user=> (require '[backend.web :as backend])
user=> (def server (backend/-main))
```

## Deploy
```bash
$ heroku login
$ heroku git:remote -a ca4-certificate
$ git subtree push --prefix backend heroku master
$ heroku ps:scale web=1
$ heroku addons:create heroku-postgresql:hobby-dev
$ heroku config
$ heroku open
```

## Database
Add these libraries in the `project.clj` file.
```clj
[org.clojure/java.jdbc "0.3.5"]
[org.postgresql/postgresql "9.4-1201-jdbc4"]
```
```bash
$ heroku pg:psql
$
```
```bash
$ sha1sum 
$
```

## Project Structure
- `builds` folder contain the compiled certificates.
- `psd` contains the photoshop files.
- `emails` contains the email related files.
- `backend` contains the clojure server.

