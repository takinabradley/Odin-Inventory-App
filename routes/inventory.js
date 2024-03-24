const { Router } = require('express')
const debug = require("debug")("inventory-app:RouterDebug")
const router = Router()

router.get('/', (req, res) => {
  res.render('inventoryIndex', { title: "Inventory App" })
})

// read
router.get('/categories', (req, res) => {
  res.render('categoriesList', {
    title: "Categories",
    categories: [
      'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
      'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen'
    ].map(name => ({ name })),
    searchText: ''
  })
  //res.end('category list not implemented yet')
})

router.get('/categories/search', (req, res) => {
  const searchText = req.query.searchText
  let categories = []
  if (searchText) {
    categories = [
      'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
      'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen'
    ].reduce((results, string) => {
      if (string.includes(searchText)) return [...results, { name: string }]
      return results
    }, [])
  }
  debug(categories)
  res.render('categoriesList', { title: "Categories", categories, searchText: searchText || '' })

  // res.render('categoriesList', { title: "Categories" })
  //res.end('category list not implemented yet')
})

router.get('/categories/:id', (req, res) => {
  //res.render('categoriesList', { title: "Categories" })
  res.end('category details not implemented yet')
})

router.get('/items/all', (req, res) => {
  res.end('All items not implemented yet')
})

router.get('items/:id', (req, res) => {
  res.end('item details not implemented yet')
})

// create
router.get('/categories/create', (req, res) => {
  res.end('Category create not implemented yet')
})

router.post('/categories/create', (req, res) => {
  res.end('Category POST create not implemented yet')
})

router.get('/items/create', (req, res) => {
  res.end('item create not implemented yet')
})

router.post('/items/create', (req, res) => {
  res.end('items POST create not implemented yet')
})

// update
router.get('/categories/:id/update', (req, res) => {
  res.end('Category update not implemented yet')
})

router.post('/categories/:id/update', (req, res) => {
  res.end('Category update POST update not implemented yet')
})

router.get('/items/:id/update', (req, res) => {
  res.end('Item update not yet implemented')
})

router.post('/items/:id/update', (req, res) => {
  res.end("Item update POST not yet implemented")
})

// delete
router.get('/categories/:id/delete', (req, res) => {
  res.end('Category delete not implemented yet')
})

router.post('/categories/:id/delete', (req, res) => {
  res.end('Category delete POST update not implemented yet')
})

router.get('/items/:id/delete', (req, res) => {
  res.end('Item delete not yet implemented')
})

router.post('/items/:id/delete', (req, res) => {
  res.end("Item delete POST not yet implemented")
})

module.exports = router