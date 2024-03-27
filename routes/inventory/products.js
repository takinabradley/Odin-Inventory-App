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
router.get('/create', asyncErrorHandler(async (req, res) => {
  const categories = await Category.find({}, {name: 1})
  res.render('productCreate', {title: "Create Product", categories, errors: []})
}))

router.post('/create',
  body('productName').notEmpty().isString().toLowerCase().escape().withMessage('requires three or more letters'),
  body('productQuantity').notEmpty().toInt().isInt({min: 0}).withMessage("must be greater than 0"),
  body('productDescription').notEmpty().isString().isLength({min: 10, max: 1000}).withMessage("must be greater than 10 and less than 1000").escape(),
  body('productPrice').notEmpty().toInt().isInt({min: 0}).withMessage("must be greater than 0"),
  body('productCategory').notEmpty().isString().isLength({min: 24, max: 24}).withMessage("Invalid category"),
  asyncErrorHandler(async (req, res) => {
    const validationMessages = validationResult(req)
    console.log(validationMessages.array())
    const categories = await Category.find({}, {name: 1})
    if(!validationMessages.isEmpty()) {
      res.render('productCreate', {title: "Create Product", categories, errors: validationMessages.array()})
      return
    } 
    
    console.log(typeof req.body.productPrice, req.body.productQuantity)
    await Product.create({
      name: req.body.productName,
      quantity: req.body.productQuantity,
      description: req.body.productDescription,
      price: req.body.productPrice,
      category: req.body.productCategory
    })

    res.redirect('/inventory/products/')
  })
)

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