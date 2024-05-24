import axios from "axios";
import Table from "@/components/Table";

const products = [
  {
    _id: "1",
    description: "Product 1",
    quantity: 10,
    unity: "unit",
    priceBought: 10,
    supplier: "Supplier 1",
  },
  {
    _id: "2",
    description: "Product 2",
    quantity: 20,
    unity: "unit",
    priceBought: 20,
    supplier: "Supplier 2",
  },
  {
    _id: "3",
    description: "Product 3",
    quantity: 30,
    unity: "unit",
    priceBought: 30,
    supplier: "Supplier 3",
  },
];

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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full h-screen bg-blue-500">
      <h1>Produtos</h1>
      <button onClick={createProduct}>Criar produto</button>
      <div className="">
        <Table products={products} />
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const { data } = await axios.get("/api/products");
//   return {
//     props: {
//       products: data,
//     },
//   };
// }
