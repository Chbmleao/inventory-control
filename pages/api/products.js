import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const { description, quantity, unity, priceBought, supplier } = req.body;

    try {
      const productDoc = await Product.create({
        description,
        quantity,
        unity,
        priceBought,
        supplier,
      });
      res.status(201).json(productDoc);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar o produto." });
    }
  } else {
    res.status(405).json({ error: "Método não permitido." });
  }
}
