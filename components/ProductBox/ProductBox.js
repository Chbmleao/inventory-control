import React, { useEffect } from 'react';
import { useState } from "react";
import axios from "axios";

const firstLabelStyles = "block mb-2 text-sm font-medium text-white";
const labelStyles = firstLabelStyles +  " mt-5";
const inputStyles = "block w-full p-2 border rounded-lg text-xs bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500";

export default function ProductBox({ product, closeProductBox }) {
  const [newDescription, setNewDescription] = useState(product?.description || "");
  const [newQuantity, setNewQuantity] = useState(product?.quantity || "");
  const [newUnity, setNewUnity] = useState(product?.unity || "");
  const [newPriceBought, setNewPriceBought] = useState(product?.priceBought || "");
  const [newSupplier, setNewSupplier] = useState(product?.supplier || "");
  const [isEditing, setIsEditing] = useState(product ? true : false);

  useEffect(() => {
    if (product) {
      setNewDescription(product.description);
      setNewQuantity(product.quantity);
      setNewUnity(product.unity);
      setNewPriceBought(product.priceBought);
      setNewSupplier(product.supplier);
    } else {
      setNewDescription("");
      setNewQuantity("");
      setNewUnity("");
      setNewPriceBought("");
      setNewSupplier("");
    }
  }, [product]);

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setNewQuantity(event.target.value);
  };

  const handleUnityChange = (event) => {
    setNewUnity(event.target.value);
  };

  const handlePriceBoughtChange = (event) => {
    setNewPriceBought(event.target.value);
  };

  const handleSupplierChange = (event) => {
    setNewSupplier(event.target.value);
  };

  const handleSave = async () => {
    
    const data = {
      description: newDescription,
      quantity: newQuantity,
      unity: newUnity,
      priceBought: newPriceBought,
      supplier: newSupplier,
    }
    
    if (isEditing) {
      await axios.put("/api/products", data);
      closeProductBox();
    } else {
      await axios.post("/api/products", data);
    }

    closeProductBox();

  }


  return (
    <div className="fixed bg-gray-900 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 p-4 shadow-lg rounded-lg z-20 w-1/3">
      <div className="w-full h-1/2 rounded-lg mt-8 mb-8">
        {isEditing ? (
          <h1 className="text-2xl font-bold text-center text-white mb-5">
            Editar Produto
          </h1>
        ) : (
          <h1 className="text-2xl font-bold text-center text-white mb-5">
            Novo Produto
          </h1>
        )}
        
        <form className="max-w-sm mx-auto">
          <div> 
            <label htmlFor="small-input" className={firstLabelStyles}>
              Descrição
            </label>
            <input
              type="text"
              id="description-input"
              className={inputStyles + (isEditing ? " cursor-default" : "")}
              value={newDescription}
              onChange={handleDescriptionChange}
              readOnly={isEditing}
          />

            <label htmlFor="small-input" className={labelStyles}>
              Quantidade
            </label>
            <input
              type="text"
              id="quantity-input"
              className={inputStyles}
              value={newQuantity}
              onChange={handleQuantityChange}
            />

            <label htmlFor="small-input" className={labelStyles}>
              Unidade
            </label>
            <input
              type="text"
              id="unity-input"
              className={inputStyles}
              value={newUnity}
              onChange={handleUnityChange}
            />

            <label htmlFor="small-input" className={labelStyles}>
              Preço de compra
            </label>
            <input
              type="text"
              id="priceBought-input"
              className={inputStyles}
              value={newPriceBought}
              onChange={handlePriceBoughtChange}
            />

            <label htmlFor="small-input" className={labelStyles}>
              Fornecedor
            </label>
            <input
              type="text"
              id="supplier-input"
              className={inputStyles}
              value={newSupplier}
              onChange={handleSupplierChange}
            />
          </div>
        </form>
      </div>
      <div className="flex justify-around">
        <button
          onClick={closeProductBox}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Cancelar
        </button>

        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}