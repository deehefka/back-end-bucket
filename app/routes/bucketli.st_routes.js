const express = require('express')
const passport = require('passport')

const Bucketli.st = require('../models/bucketli.st')

const handle = require('../../lib/error_handler')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.get('/bucketli.sts', requireToken, (req, res) => {
  Bucketli.st.find()
    .then(bucketli.sts => {
      return bucketli.sts.map(bucketli.st => bucketli.st.toObject())
    })
    .then(bucketli.sts => res.status(200).json({ bucketli.sts: bucketli.sts }))
    .catch(err => handle(err, res))
})

router.get('/bucketli.sts/:id', requireToken, (req, res) => {
  Bucketli.st.findById(req.params.id)
    .then(handle404)
    .then(bucketli.st => res.status(200).json({ bucketli.st: bucketli.st.toObject() }))
    .catch(err => handle(err, res))
})

router.post('/bucketli.sts', requireToken, (req, res) => {
  req.body.bucketli.st.owner = req.user.id

  Bucketli.st.create(req.body.bucketli.st)
    .then(bucketli.st => {
      res.status(201).json({ bucketli.st: bucketli.st.toObject() })
    })
    .catch(err => handle(err, res))
})

router.patch('/bucketli.sts/:id', requireToken, (req, res) => {
  delete req.body.bucketli.st.owner

  Bucketli.st.findById(req.params.id)
    .then(handle404)
    .then(bucketli.st => {
      requireOwnership(req, bucketli.st)

      Object.keys(req.body.bucketli.st).forEach(key => {
        if (req.body.bucketli.st[key] === '') {
          delete req.body.bucketli.st[key]
        }
      })

      return bucketli.st.update(req.body.bucketli.st)
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

router.delete('/bucketli.sts/:id', requireToken, (req, res) => {
  Bucketli.st.findById(req.params.id)
    .then(handle404)
    .then(bucketli.st => {
      requireOwnership(req, bucketli.st)
      bucketli.st.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

module.exports = router
