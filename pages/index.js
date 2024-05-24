import axios from "axios";
import Table from "@/components/Table";
import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []); // Isso garante que a função getProducts seja chamada apenas uma vez, quando o componente for montado

  const refreshTable = () => {
    getProducts();
  }


  async function getProducts() {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full p-5 h-screen bg-blue-500">
      <h1 className="font-bold text-white text-4xl p-7 mx-auto text-center">
        Controle de Estoque
      </h1>
      <div className="">
        <Table products={products} refreshTable={refreshTable}/>
      </div>
    </div>
  );
}

