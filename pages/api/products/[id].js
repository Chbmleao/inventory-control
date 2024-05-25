import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

export default async function RequestToProductsDatabase(req, res) {
  const { method } = req
  await mongooseConnect()
  console.log("entrou", method);

  if (method === "DELETE") {
    const { id } = req.query;

    await deleteProductDatabase(id, res);
    res.status(200);

  } else {
    res.status(405).json({ error: "Método não permitido." });
  }
}

async function deleteProductDatabase(id, res){
  try {
    const result = await Product.deleteOne({_id: id})
    console.log(`This many objects deleted: ${result.deletedCount}`)
    res.status(201).json(result.deletedCount)
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o produto." })
  }
}