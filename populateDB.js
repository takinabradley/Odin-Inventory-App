const Category = require('./models/Category')
const Product = require('./models/Product')
const mongoose = require('mongoose')

const devURI = process.env.MONGO_DEV_URI || ''
console.log("DevURI is", devURI)
mongoose.connect(devURI).then(_ => console.log('success')).catch(err => console.log(err.message))


async function getCategories() {
  const categories = await fetch('https://fakestoreapi.com/products/categories')
  return await categories.json()
}

async function getProducts() {
  const products = await fetch('https://fakestoreapi.com/products/')
  return await products.json()
}

async function populate() {
  const categories = await getCategories()
  const products = await getProducts()

  for (const category of categories) {
    try {
      await Category.create({ name: category })
    } catch (e) { console.log(e.message) }
  }
  console.log('categories created')

  products
    .map(product => {
      const { title, price, description, category, image } = product
      return { name: title, price, description, category, image, quantity: 0 }
    })
    .forEach(async (product) => {
      try {
        const category = await Category.findOne({ name: product.category })
        product.category = category._id
        console.log(category)
        await Product.create(product)
      } catch (e) { console.log(e.message) }

      console.log('products created')
    })
}

populate()
