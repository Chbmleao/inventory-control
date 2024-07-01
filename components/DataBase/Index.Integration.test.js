import React from 'react';
import axios from "axios";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import Table from '../Table/Table';

// Integration test: Data Base

describe('DataBase', () => {
  
  const prodName = 'Product Int Test';
  const prodQuantity = 10;
  const prodUnity = 'kg';
  const prodPrice = 100;
  const prodSupplier = 'Supplier Mc Test';
  const newProduct = {description: prodName, quantity: prodQuantity, unity: prodUnity, priceBought: prodPrice, supplier: prodSupplier };

  it('create a new product and check its existence', async () => {
    
    // Retreive products from mongodb
    const response = await axios.get("/api/products");
    const products = response.data;
    
    render(<Table products={products} refreshTable={() => {}} />);

    // Create new product
    fireEvent.click(screen.getByTestId('add-product-button'));
    fireEvent.change(screen.getByLabelText('Descrição'), { target: { value: prodName } });
    fireEvent.change(screen.getByLabelText('Quantidade'), { target: { value: prodQuantity } });
    fireEvent.change(screen.getByLabelText('Unidade'), { target: { value: prodUnity } });
    fireEvent.change(screen.getByLabelText('Preço de compra'), { target: { value: prodPrice } });
    fireEvent.change(screen.getByLabelText('Fornecedor'), { target: { value: prodSupplier } });
    fireEvent.click(screen.getByText('Salvar'));

    // Wait for the product to be added on Data Base
    sleep(1000);

    // Check for products in the table
    expect(screen.getByText(prodName)).toBeInTheDocument();
    expect(screen.getByText(prodQuantity)).toBeInTheDocument();
    expect(screen.getByText(prodUnity)).toBeInTheDocument();
    expect(screen.getByText(prodPrice)).toBeInTheDocument();
    expect(screen.getByText(prodSupplier)).toBeInTheDocument();
  });

  it('should filter products based on new product description', async () => {
    
    // Retreive products from mongodb
    const response = await axios.get("/api/products");
    const products = response.data;
    
    render(<Table products={products} refreshTable={() => {}} />);

    // Simulate search input
    fireEvent.change(screen.getByPlaceholderText('Pesquisar por Descrição ou Fornecedor'), {
      target: { value: prodName },
    });

    // Check for filtered product
    expect(screen.getByText(prodName)).toBeInTheDocument();
  });  
});