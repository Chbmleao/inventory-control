import React from 'react';

const firstLabelStyles = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
const labelStyles = firstLabelStyles +  " mt-5";
const inputStyles = "block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

export default function ProductBox({ product }) {
  return (
    <div className="fixed bg-gray-900 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 p-4 bg-white shadow-lg rounded-lg z-20 w-1/3">
      <div className="w-full h-1/2 rounded-lg mt-8 mb-8">
        <h1 className="text-2xl font-bold text-center text-white mb-5">
          Novo Produto
        </h1>
        <form className="max-w-sm mx-auto">
          <div>
            <label htmlFor="small-input" className={firstLabelStyles}>
              Descrição
            </label>
            <input type="text" id="small-input" className={inputStyles} />

            <label htmlFor="small-input" className={labelStyles}>
              Quantidade
            </label>
            <input type="text" id="small-input" className={inputStyles} />

            <label htmlFor="small-input" className={labelStyles}>
              Unidade
            </label>
            <input type="text" id="small-input" className={inputStyles} />

            <label htmlFor="small-input" className={labelStyles}>
              Preço de compra
            </label>
            <input type="text" id="small-input" className={inputStyles} />

            <label htmlFor="small-input" className={labelStyles}>
              Fornecedor
            </label>
            <input type="text" id="small-input" className={inputStyles} />
          </div>
        </form>
      </div>
    </div>
  );
}
