'use strict'
const express = require('express')
const mongoose = require('mongoose')
const assert = require('assert')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const Bottle = require('./model/bottles')
const Diet   = require('./model/diet')
const ED     = require('./model/ed')
const Skin   = require('./model/skin')
const Muscle = require('./model/muscle')
const User = require('./model/user')
const config  = require('./config')
const authRoutes = require('./routes/auth')
const apiRoutes = require('./routes/api')
const localSignupStrategy = require('./passport/local-signup')
const localLoginStrategy = require('./passport/local-login')
const authCheckMiddleware = require('./middleware/auth-check')

//create app
const app = express()
const router = express.Router()


//set port to 8081 or option
var port = process.env.API_PORT || 8081;
//db login details

require('./model').connect(config.dbUri);
//configure bodyParser for url and json encoding
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
if (process.env.NODE_ENV == 'production'){
  app.use(express.static('build'))
} else {
  app.use(express.static('public'))
}
// //passport user auth
app.use(passport.initialize())

passport.use('local-signup', localSignupStrategy)
passport.use('local-login', localLoginStrategy)
//


// Set CORS Headers
app.use((req, res, next) => {

//   res.setHeader('Access-Control-Allow-Origin', '*')
//
//   res.setHeader('Access-Control-Allow-Credentials', 'true')
//   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
//   res.setHeader('Access-Control-Allow-Headers','Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
//
//   //remove caching
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

// routes
router.get('/', (req, res) =>{
  res.json({ message: 'API Initialized'})
})
router.route('/bottles')
// get bottles
  .get((req, res) => {
    Bottle.find((err, bottles) => {
      if (err) res.send(err)
      res.json(bottles)
    })
  })
  //post bottles
  .post((req, res) => {
    var bottle = new Bottle()
    //bodyParser allows use of req.body
    bottle.step1 = req.body.step1
    bottle.step2 = req.body.step2

    bottle.save((err) => {
      if (err) res.send(err)
      res.json({ message: 'Bottle added successfully!'})
    })
  })

  //put and delete route handler
  router.route('/bottles/:bottle_id')
  .put((req, res) => {
    Bottle.findById(req.params.bottle_id, (err, bottle) =>{
      if (err){ res.send(err)}
      (req.body.step1) ? bottle.step1 = req.body.step1 : null;
      (req.body.step2) ? bottle.step2 = req.body.step2 : null;
      (req.body.step1ImageUrl) ? bottle.step1ImageUrl = req.body.step1ImageUrl : null;
      (req.body.step2ImageUrl) ? bottle.step2ImageUrl = req.body.step2ImageUrl : null;
      bottle.save((err) => {
        if (err) res.send(err)
        res.json({ message: 'Bottles Updated'})
      })

    })
  })
  .delete((req, res) => {
    Bottle.remove({ _id: req.params.bottle_id }, (err, bottle) => {
      if (err) res.send(err)
      res.json({ message: 'Bottle deleted' })
    })
  })
  /********************* Muscle Route ************************/
  router.route('/muscle')
  // get bottles
    .get((req, res) => {
      Muscle.find((err, muscle) => {
        if (err) res.send(err)
        res.json(muscle)
      })
    })
    //post bottles
    .post((req, res) => {
      var muscle = new Muscle()
      //bodyParser allows use of req.body
      muscle.step1 = req.body.step1
      muscle.step2 = req.body.step2
      muscle.step1ImageUrl = req.body.step1ImageUrl
      muscle.step2ImageUrl = req.body.step2ImageUrl

      muscle.save((err) => {
        if (err) res.send(err)
        res.json({ message: 'Muscle Offer added successfully!'})
      })
    })

    //put and delete route handler
    router.route('/muscle/:muscle_id')
    .put((req, res) => {
      Muscle.findById(req.params.muscle_id, (err, muscle) =>{
        if (err){ res.send(err)}
        (req.body.step1) ? muscle.step1 = req.body.step1 : null;
        (req.body.step2) ? muscle.step2 = req.body.step2 : null;
        (req.body.step1ImageUrl) ? muscle.step1ImageUrl = req.body.step1ImageUrl : null;
        (req.body.step2ImageUrl) ? muscle.step2ImageUrl = req.body.step2ImageUrl : null;
        muscle.save((err) => {
          if (err) res.send(err)
          res.json({ message: 'Muscle Offer Updated'})
        })

      })
    })
    .delete((req, res) => {
      Muscle.remove({ _id: req.params.muscle_id }, (err, muscle) => {
        if (err) res.send(err)
        res.json({ message: 'Muscle Offer deleted' })
      })
    })

/**************** Skin Route ***************************************/
router.route('/skin')
// get bottles
  .get((req, res) => {
    Skin.find((err, skin) => {
      if (err) res.send(err)
      res.json(skin)
    })
  })
  //post bottles
  .post((req, res) => {
    var skin = new Skin()
    //bodyParser allows use of req.body
    skin.step1 = req.body.step1
    skin.step2 = req.body.step2
    skin.step1ImageUrl = req.body.step1ImageUrl
    skin.step2ImageUrl = req.body.step2ImageUrl

    skin.save((err) => {
      if (err) res.send(err)
      res.json({ message: 'Skin Offer added successfully!'})
    })
  })

  //put and delete route handler
  router.route('/skin/:skin_id')
  .put((req, res) => {
    Skin.findById(req.params.skin_id, (err, skin) =>{
      if (err){ res.send(err)}
      (req.body.step1) ? skin.step1 = req.body.step1 : null;
      (req.body.step2) ? skin.step2 = req.body.step2 : null;
      (req.body.step1ImageUrl) ? skin.step1ImageUrl = req.body.step1ImageUrl : null;
      (req.body.step2ImageUrl) ? skin.step2ImageUrl = req.body.step2ImageUrl : null;
      skin.save((err) => {
        if (err) res.send(err)
        res.json({ message: 'Skin Offer Updated'})
      })

    })
  })
  .delete((req, res) => {
    Skin.remove({ _id: req.params.skin_id }, (err, skin) => {
      if (err) res.send(err)
      res.json({ message: 'Skin Offer deleted' })
    })
  })
/***********************Diet Route ***********************/
router.route('/diet')
// get bottles
  .get((req, res) => {
    Diet.find((err, diet) => {
      if (err) res.send(err)
      res.json(diet)
    })
  })
  //post bottles
  .post((req, res) => {
    var diet = new Diet()
    //bodyParser allows use of req.body
    diet.step1 = req.body.step1
    diet.step2 = req.body.step2
    diet.step1ImageUrl = req.body.step1ImageUrl
    diet.step2ImageUrl = req.body.step2ImageUrl

    diet.save((err) => {
      if (err) res.send(err)
      res.json({ message: 'Diet Offer added successfully!'})
    })
  })

  //put and delete route handler
  router.route('/diet/:diet_id')
  .put((req, res) => {
    Diet.findById(req.params.diet_id, (err, diet) =>{
      if (err){ res.send(err)}
      (req.body.step1) ? diet.step1 = req.body.step1 : null;
      (req.body.step2) ? diet.step2 = req.body.step2 : null;
      (req.body.step1ImageUrl) ? diet.step1ImageUrl = req.body.step1ImageUrl : null;
      (req.body.step2ImageUrl) ? diet.step2ImageUrl = req.body.step2ImageUrl : null;
      diet.save((err) => {
        if (err) res.send(err)
        res.json({ message: 'Diet Offer Updated'})
      })

    })
  })
  .delete((req, res) => {
    Diet.remove({ _id: req.params.diet_id }, (err, diet) => {
      if (err) res.send(err)
      res.json({ message: 'Diet Offer deleted' })
    })
  })
/*************************** ED Route *********************/
router.route('/ed')
// get bottles
  .get((req, res) => {
    ED.find((err, ed) => {
      if (err) res.send(err)
      res.json(ed)
    })
  })
  //post bottles
  .post((req, res) => {
    var ed = new ED()
    //bodyParser allows use of req.body
    ed.step1 = req.body.step1
    ed.step2 = req.body.step2
    ed.step1ImageUrl = req.body.step1ImageUrl
    ed.step2ImageUrl = req.body.step2ImageUrl

    ed.save((err) => {
      if (err) res.send(err)
      res.json({ message: 'ED Offer added successfully!'})
    })
  })

  //put and delete route handler
  router.route('/ed/:ed_id')
  .put((req, res) => {
    ED.findById(req.params.ed_id, (err, ed) =>{
      if (err){ res.send(err)}
      (req.body.step1) ? ed.step1 = req.body.step1 : null;
      (req.body.step2) ? ed.step2 = req.body.step2 : null;
      (req.body.step1ImageUrl) ? ed.step1ImageUrl = req.body.step1ImageUrl : null;
      (req.body.step2ImageUrl) ? ed.step2ImageUrl = req.body.step2ImageUrl : null;
      ed.save((err) => {
        if (err) res.send(err)
        res.json({ message: 'ED Offer Updated'})
      })

    })
  })
  .delete((req, res) => {
    ED.remove({ _id: req.params.ed_id }, (err, ed) => {
      if (err) res.send(err)
      res.json({ message: 'ED Offer deleted' })
    })
  })
// use router when /api is called

// router.route('/offer-ids')

app.use('/api', authCheckMiddleware)
app.use('/api', apiRoutes)

app.use('/api', router)
app.use('/auth', authRoutes)
// /********************************************************************************/
// const authCheckMiddleware = require('./server/middleware/auth-check');
// app.use('/api', authCheckMiddleware)

// const appRoutes = require('./routes/api')
// app.use('/api', apiRoutes)
// /*********************************************************************************/

//start server and listen
app.listen(port, () => {
  console.log(`api running on port ${port}`)
})
