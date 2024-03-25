const { Router } = require('express')
const debug = require("debug")("inventory-app:items-router")
const router = Router()

// read
router.get('/', (req, res) => {
  res.end('All items not implemented yet')
})

router.get('/:id', (req, res) => {
  res.end('item details not implemented yet')
})

//create
router.get('/create', (req, res) => {
  res.end('item create not implemented yet')
})

router.post('/create', (req, res) => {
  res.end('items POST create not implemented yet')
})

//update
router.get('/:id/update', (req, res) => {
  res.end('Item update not yet implemented')
})

router.post('/:id/update', (req, res) => {
  res.end("Item update POST not yet implemented")
})

//delete

router.get('/:id/delete', (req, res) => {
  res.end('Item delete not yet implemented')
})

router.post('/:id/delete', (req, res) => {
  res.end("Item delete POST not yet implemented")
})

module.exports = router