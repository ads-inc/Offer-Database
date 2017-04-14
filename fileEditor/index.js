const fs = require('fs')

fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    return console.log(err)
  }
  var result = data.replace(/{{step1}}/g, /*var with id of text from database*/)
})
