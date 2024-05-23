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
  
    await axios.post("/api/products", data);
  }

  return (
    <>
      <button onClick={createProduct}>
        Click me!
      </button>
    </>
  );
}
