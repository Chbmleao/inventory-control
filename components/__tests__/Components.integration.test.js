import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Table from '../Table/Table';
import { act } from 'react';

jest.mock('axios');

describe ("Components Integration Test", () => {
  const products = [
    { _id: '1', description: 'Product 1', quantity: 10, unity: 'kg', priceBought: 100, supplier: 'Supplier A' },
    { _id: '2', description: 'Product 2', quantity: 5, unity: 'l', priceBought: 50, supplier: 'Supplier B' },
  ];

  const refreshTable = jest.fn();

  it('filters Table products based on SearchInput by product description', () => {
    render(<Table products={products} refreshTable={refreshTable} />);

    // Simulate search input
    fireEvent.change(screen.getByPlaceholderText('Pesquisar por Descrição ou Fornecedor'), {
      target: { value: 'Product 2' },
    });

    // Check for filtered product
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
  });

  it('filters Table products based on SearchInput by product supplier', () => {
    render(<Table products={products} refreshTable={refreshTable} />);

    // Simulate search input
    fireEvent.change(screen.getByPlaceholderText('Pesquisar por Descrição ou Fornecedor'), {
      target: { value: 'Supplier A' },
    });

    // Check for filtered product
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });

  it('opens ProductBox when adding a new product to Table', () => {
    render(<Table products={products} refreshTable={refreshTable} />);

    // Simulate clicking the add button
    const addProductButton = screen.getByTestId('add-product-button');
    fireEvent.click(addProductButton);

    // Check if ProductBox is opened
    expect(screen.getByText('Novo Produto')).toBeInTheDocument();

    // Check if the ProductBox is empty
    expect(screen.getAllByDisplayValue('')).toHaveLength(6);
  });

  it('opens ProductBox when editing a Table product', () => {
    render(<Table products={products} refreshTable={refreshTable} />);

    const targetProductIndex = 0;
    const targetProduct = products[targetProductIndex];

    // Simulate clicking the edit button
    const editProductButton = screen.getByTestId('edit-product-button_' + targetProductIndex);
    fireEvent.click(editProductButton);

    // Check if ProductBox is opened
    expect(screen.getByText('Editar Produto')).toBeInTheDocument();

    // Check if the ProductBox is populated with the correct product data
    expect(screen.getByDisplayValue(targetProduct.description)).toBeInTheDocument();
    expect(screen.getByDisplayValue(targetProduct.quantity)).toBeInTheDocument();
    expect(screen.getByDisplayValue(targetProduct.unity)).toBeInTheDocument();
    expect(screen.getByDisplayValue(targetProduct.priceBought)).toBeInTheDocument();
    expect(screen.getByDisplayValue(targetProduct.supplier)).toBeInTheDocument();
  });

  it('closes ProductBox when clicks close button on Table', () => {
    render(<Table products={products} refreshTable={refreshTable} />);

    // Simulate clicking the add button to open ProductBox
    const addProductButton = screen.getByTestId('add-product-button');
    fireEvent.click(addProductButton);

    // Simulate clicking the close button
    const closeButton = screen.getByTestId('cancel-button');
    fireEvent.click(closeButton);

    // Check if ProductBox is closed
    expect(screen.queryByText('Novo Produto')).not.toBeInTheDocument();
    expect(screen.queryByText('Editar Produto')).not.toBeInTheDocument();
  });
});