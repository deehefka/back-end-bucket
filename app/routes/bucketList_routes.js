const express = require('express')
const passport = require('passport')

const BucketList = require('../models/bucketList')

const handle = require('../../lib/error_handler')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.get('/bucketLists', requireToken, (req, res) => {
  BucketList.find({ owner: req.user.id })
    .then(bucketLists => {
      return bucketLists.map(bucketList => bucketList.toObject())
    })
    .then(bucketLists => res.status(200).json({ bucketLists: bucketLists }))
    .catch(err => handle(err, res))
})

router.get('/bucketLists/:id', requireToken, (req, res) => {
  BucketList.findById(req.params.id)
    .then(handle404)
    .then(bucketList => res.status(200).json({ bucketList: bucketList.toObject() }))
    .catch(err => handle(err, res))
})

router.post('/bucketLists', requireToken, (req, res) => {
  req.body.bucketList.owner = req.user.id

  BucketList.create(req.body.bucketList)
    .then(bucketList => {
      res.status(201).json({ bucketList: bucketList.toObject() })
    })
    .catch(err => handle(err, res))
})

router.patch('/bucketLists/:id', requireToken, (req, res) => {
  delete req.body.bucketList.owner

  BucketList.findById(req.params.id)
    .then(handle404)
    .then(bucketList => {
      requireOwnership(req, bucketList)

      Object.keys(req.body.bucketList).forEach(key => {
        if (req.body.bucketList[key] === '') {
          delete req.body.bucketList[key]
        }
      })

      return bucketList.update(req.body.bucketList)
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

router.delete('/bucketLists/:id', requireToken, (req, res) => {
  BucketList.findById(req.params.id)
    .then(handle404)
    .then(bucketList => {
      requireOwnership(req, bucketList)
      bucketList.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

module.exports = router
