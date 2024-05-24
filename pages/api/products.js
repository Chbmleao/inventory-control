import { mongooseConnect } from "@/lib/mongoose"
import Product from "@/models/Product"

export default async function handle(req, res) {
  const { method } = req
  await mongooseConnect()

  if (method === "POST") {
    const { description, quantity, unity, priceBought, supplier } = req.body

    try {
      const productDoc = await Product.create({
        description,
        quantity,
        unity,
        priceBought,
        supplier,
      })
      res.status(201).json(productDoc)
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar o produto." })
    }
  } else if (method === "DELETE") {
    const { description } = req.body

    try {
      const result = await Product.deleteOne({ 'test.description': description })
      console.log(`This many objects deleted: ${result.deletedCount}`)
      res.status(201).json(result.deletedCount)
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar o produto." })
    }
  } else if (method === "GET") {

    try {
      const products = await Product.find({})
      res.status(201).json(products)
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar o produto." })
    }
  } else if (method === "PUT") {
    const { description, quantity, unity, priceBought, supplier } = req.body
    
    try {
      const updatedProduct = await Product.findOneAndUpdate(
        { description: description },
        { quantity, unity, priceBought, supplier },
        { new: true }
      )
  
      if (!updatedProduct) {console.log(`No product found with description: ${description}`)}
  
      console.log('Updated Product:', updatedProduct)
      res.status(201).json(updatedProduct)
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar o produto." })
    }
  } else {
    res.status(405).json({ error: "Método não permitido." })
  }
}
