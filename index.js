const express = require('express')
const app = express()
const path = require('path');
let root_path = path.join(__dirname, 'site_files')
const fs = require('fs');

app.get('*', function (req, res, next) {
    var options = {
      root: root_path,
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
  
    var fileName = decodeURIComponent(req.url)
    if(fileName === '/Home.html'){fileName = 'index.html'}
    if(fs.existsSync(path.join(root_path, fileName))) {
        res.sendFile(fileName, options, function (err) {
            if (err) {
                next(err)
            } else {
                console.log('Sent:', fileName)
            }
        })
    }else{
        res.send(403, 'not avaible');
    }
});


app.post('*', function (req, res, next) {
    res.send('ok')
})
 
app.listen(process.env.PORT || 80)