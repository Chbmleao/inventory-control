import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

async function postProductsDatabase(informations,res){
  
  const { description, quantity, unity, priceBought, supplier } = informations
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

}

async function getProductDatabse(res){

  try {
    const products = await Product.find({})
    res.status(201).json(products)
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o produto." })
  }

}

async function putProductDatabase(informations,res){

  const { description, quantity, unity, priceBought, supplier } = informations
    
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

}

export default async function RequestToProductsDatabase(req, res) {
  const { method } = req
  await mongooseConnect()
  console.log("entrou", method);

  if (method === "POST") {

    postProductsDatabase(req.body,res);

  } else if (method === "GET") {

    getProductDatabse(res);
    
  } else if (method === "PUT") {

    putProductDatabase(req.body,res);
    
  } else {
    res.status(405).json({ error: "Método não permitido." });
  }
}
