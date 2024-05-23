import axios from "axios";

export default function Home() {
  async function createProduct(ev) {
    ev.preventDefault();
    const data = {
      description: "Product 1",
      quantity: 10,
      unity: "unit",
      priceBought: 10,
      supplier: "Supplier 1",
    };
    try {
      await axios.post("/api/products", data);
      alert("Produto criado com sucesso!");
    } catch (error) {
      alert("Erro ao criar o produto.");
    }
  }

  return (
    <>
      <button onClick={createProduct}>
        Click me!
      </button>
    </>
  );
}
