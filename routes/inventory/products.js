const { Router } = require('express')
const debug = require("debug")("inventory-app:items-router")
const router = Router()
const Product = require('../../models/Product')
const asyncErrorHandler = require('../../utils/asyncErrorHandler')
const Category = require('../../models/Category')
const { validationResult, body } = require("express-validator")

// read
router.get('/', asyncErrorHandler(async (req, res) => {
  const  products = await Product.find()
  res.render('productsList', { title: "All Products", products, submittedFrom: req.baseUrl })
}))

/* router.get('/:id', (req, res) => {
  res.end('item details not implemented yet')
}) */

//create
router.get('/create', (req, res) => {
  res.end('item create not implemented yet')
})

router.post('/create', (req, res) => {
  res.end('items POST create not implemented yet')
})

//update

router.post(
  '/:id/update',
  body('productQuantity').notEmpty(),
  body('productQuantity').isInt({min: 0}),
  asyncErrorHandler(async (req, res) => {
    const validationMessages = validationResult(req)
    const productToUpdate = await Product.findById(req.params.id)
    let categories = (await Category.find({})).map(category => category.url)
    if(
      !(["/inventory/products", ...categories].includes(req.body.submittedFrom))
    ) {
      res.redirect('/')
    } else if (productToUpdate === null || !validationMessages.isEmpty()) {
      res.redirect(req.body.submittedFrom)
    } else {
      productToUpdate.quantity = req.body.productQuantity
      await productToUpdate.save()
      res.redirect(req.body.submittedFrom)
    }

  })
)

//delete

router.post('/:id/delete', asyncErrorHandler(async (req, res) => {
  const productToDelete = Product.findById(req.params.id)
  let categories = await Category.find({})
  categories = categories.map(category => category.url)
  if(
    !(["/inventory/products", ...categories].includes(req.body.submittedFrom))
  ) {
    res.redirect('/')
  } else if (productToDelete === null) {
    res.redirect(req.body.submittedFrom)
  } else {
    await Product.findByIdAndDelete(req.params.id)
    res.redirect(req.body.submittedFrom)
  }
}))

module.exports = router