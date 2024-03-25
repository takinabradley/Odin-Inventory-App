const { Router } = require('express')
const router = Router()
const categoriesRouter = require('./categories.js')
const productsRouter = require('./products.js')

router.get('/', (req, res) => {
  res.render('inventoryIndex', { title: "Inventory App" })
})

router.use('/categories', categoriesRouter)
router.use('/products', productsRouter)

module.exports = router