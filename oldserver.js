const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

var hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: 'views/partials'
})

hbs.handlebars.registerPartial('form', '{{form}}')
hbs.handlebars.registerPartial('product-list', '{{product-list}}')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', 'views/partials')

var db

var creds = {
  user: 'AdsInc',
  pass: 'Ads123'
}

MongoClient.connect('mongodb://' + creds.user + ':' + creds.pass + '@ds151909.mlab.com:51909/product-store', (err, database) =>{
  if (err) return console.log(err)
  else{
    console.log('Connected to database product-store at mlab.com')
    db = database
    app.listen(3000, () => {
      console.log('listening on port 3000')
    })
  }
})

console.log('its working!!')




// Get Methods
app.get('/', (req, res) => {
  db.collection('products').find().toArray((err, result) => {
    if (err) return console.log(err)

    res.render('index', {
      product: result,
      title: 'index'
    })
  })
})
app.get('/muscle', (req, res) => {
  db.collection('muscle').find().toArray((err, result) => {
    if (err) return console.log(err)

    res.render('product', {
      product: result,
      title: 'muscle'
      })
    })
  })
app.get('/ed', (req, res) => {
  db.collection('ed').find().toArray((err, result) => {
    if (err) return console.log(err)

    res.render('product', {
      product: result,
      title: 'ed'
    })
  })
})
app.get('/skin', (req, res) => {
  db.collection('skin').find().toArray((err, result) => {
    if (err) return console.log(err)

    res.render('product', {
      product: result,
      title: 'skin'
    })
  })
})
app.get('/diet', (req, res) => {
  db.collection('diet').find().toArray((err, result) => {
    if (err) return console.log(err)

    res.render('product', {
      product: result,
      title: 'diet'
    })
  })
})

//Post methods for database
app.post('/muscle', (req, res) =>{
  db.collection('muscle').save(req.body, (err, result) =>{
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/muscle')
  })
  console.log(req.body)
})

app.post('/ed', (req, res) =>{
  db.collection('ed').save(req.body, (err, result) =>{
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/ed')
  })
  console.log(req.body)
})

app.post('/skin', (req, res) =>{
  db.collection('skin').save(req.body, (err, result) =>{
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/skin')
  })
  console.log(req.body)
})

app.post('/diet', (req, res) =>{
  db.collection('diet').save(req.body, (err, result) =>{
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/diet')
  })
  console.log(req.body)
})

/* TODO Make delete, select from DB based on ID, not step One; */

app.delete('/muscle', (req, res) => {
  db.collection('muscle').findOneAndDelete({"step-1": req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send(result)
  })
})
