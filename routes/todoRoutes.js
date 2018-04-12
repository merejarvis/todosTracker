const express = require('express')
const router = express.Router()
const db = require('../models/index') 
const keyword = require('../keywords')  

router.get('/', (req, res) => {
    if (!Object.keys(req.query).length) {
        res.send(keyword.urlSample)
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

router.post('/', (req, res) => {
    //logic for post
    console.log(req.body);
    res.send(req.body)
})

let genParams = (input) => {
    let searchQuery = {}
    for (let key in input) {
        searchQuery[key] = input[key]
    }
    return searchQuery
}

module.exports = router