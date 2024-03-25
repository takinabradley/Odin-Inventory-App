const { Router } = require('express')
const debug = require("debug")("inventory-app:category-router")
const router = Router()
const Category = require('../../models/Category')
const Product = require('../../models/Product')
const asyncErrorHandler = require('../../utils/asyncErrorHandler')

// read
router.get('/', asyncErrorHandler(async (req, res) => {
  const categories = await Category.find()

  res.render('categoriesList', {
    title: "Categories",
    categories,
    searchText: ''
  })
}))

router.get('/search', asyncErrorHandler(async (req, res) => {
  const searchText = req.query.searchText
  let categories = await Category.find()
  if (searchText) {
    categories = categories.reduce((results, category) => {
      if (category.name.includes(searchText)) return [...results, category]
      return results
    }, [])
  }
  res.render('categoriesList', { title: "Categories", categories, searchText: searchText || '' })
}))

router.get('/:id', asyncErrorHandler(async (req, res) => {
  const { name: categoryName } = await Category.findById(req.params.id)
  const products = await Product.find({ category: req.params.id })
  res.render('productsList', { title: categoryName, products })
}))

// create
router.get('/create', (req, res) => {
  res.end('Category create not implemented yet')
})

router.post('/create', (req, res) => {
  res.end('Category POST create not implemented yet')
})

// update
router.get('/:id/update', (req, res) => {
  res.end('Category update not implemented yet')
})

router.post('/:id/update', (req, res) => {
  res.end('Category update POST update not implemented yet')
})

// delete
router.get('/:id/delete', (req, res) => {
  res.end('Category delete not implemented yet')
})

router.post('/:id/delete', (req, res) => {
  res.end('Category delete POST update not implemented yet')
})

module.exports = router