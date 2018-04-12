const express = require('express')
const router = express.Router()
const db = require('../models/index') 
const keywords = require('../keywords') 
const {genParams} = require('../helper') 
const {stringBreak} = require('../stringBreak')

router.get('/', (req, res) => {
    if (!Object.keys(req.query).length) {
        res.send(keywords.urlSample)
        return
    } 
    let parameters = genParams(req.query)
    db.todo.findAll ({
        where: parameters
      }).then(function (result) {
          res.send(result)
      }).catch((e) => {
          res.status(404).send('no records found')
      });
})

router.post('/add', (req, res) => {
    let record = stringBreak(req.body.input)
    console.log(record);
    db.todo.create(record).then(function(data) {
        res.send(data.dataValues);
    }).catch((e) => {
        res.status(404).send(e)
    });
})



module.exports = router