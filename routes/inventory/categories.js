const { Router } = require('express')
const debug = require("debug")("inventory-app:category-router")
const router = Router()
const Category = require('../../models/Category')
const Product = require('../../models/Product')
const asyncErrorHandler = require('../../utils/asyncErrorHandler')
const { validationResult, body } = require("express-validator")

// quick trick to pass context between routes
let showDeleteError = false;

// create
router.get('/create', (req, res) => {
  res.render('categoryCreate', {title: "Create category", errors: []})
})

router.post(
  '/create', 
  body('categoryName').notEmpty().escape(),
  asyncErrorHandler(async (req, res) => {
    const validationMessages = validationResult(req)
    if(validationMessages.isEmpty()) {
      await Category.create({name: req.body.categoryName})
      res.redirect('/inventory/categories/')
    } else {
      const errors = validationMessages.array();
      res.render('categoryCreate', {title: "Create category", errors})
    }
  })
)

// read
router.get('/', asyncErrorHandler(async (req, res) => {
  const categories = await Category.find()

  res.render('categoriesList', {
    title: "Categories",
    categories,
    searchText: '',
    showDeleteError: showDeleteError,
  })

  showDeleteError = false
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
  const category = await Category.findById(req.params.id)
  const products = await Product.find({ category: req.params.id })
  res.render('productsList', { title: category.name, products, submittedFrom: category.url})
}))

// update
router.get('/:id/update', (req, res) => {
  res.end('Category update not implemented yet')
})

router.post('/:id/update', (req, res) => {
  res.end('Category update POST update not implemented yet')
})

// delete

router.post('/:id/delete', asyncErrorHandler(async (req, res) => {
  const categoryToDelete = await Category.findById(req.params.id)
  const productsInCategory = await Product.find({category: req.params.id})
  
  if(categoryToDelete === null || productsInCategory.length > 0) {
    showDeleteError = true
    res.redirect(req.baseUrl)
    return
  }

  await Category.findByIdAndDelete(req.params.id)
  res.redirect(req.baseUrl)
}))

module.exports = router