import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Table from '../Table';
import { act } from 'react';

jest.mock('axios');

describe('Table', () => {
  const products = [
    { _id: '1', description: 'Product 1', quantity: 10, unity: 'kg', priceBought: 100, supplier: 'Supplier A' },
    { _id: '2', description: 'Product 2', quantity: 5, unity: 'l', priceBought: 50, supplier: 'Supplier B' },
  ];

  const refreshTable = jest.fn();

  it('renders the table component correctly', () => {
    render(<Table products={products} refreshTable={refreshTable} />);

    // Check for table headers
    expect(screen.getByText('Descrição')).toBeInTheDocument();
    expect(screen.getByText('Quantidade')).toBeInTheDocument();
    expect(screen.getByText('Unidade')).toBeInTheDocument();
    expect(screen.getByText('Preço de compra')).toBeInTheDocument();
    expect(screen.getByText('Fornecedor')).toBeInTheDocument();

    // Check for products in the table
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText(10)).toBeInTheDocument();
    expect(screen.getByText('kg')).toBeInTheDocument();
    expect(screen.getByText(100)).toBeInTheDocument();
    expect(screen.getByText('Supplier A')).toBeInTheDocument();

    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText(5)).toBeInTheDocument();
    expect(screen.getByText('l')).toBeInTheDocument();
    expect(screen.getByText(50)).toBeInTheDocument();
    expect(screen.getByText('Supplier B')).toBeInTheDocument
  });

  it('filters products based on search input', () => {
    render(<Table products={products} refreshTable={refreshTable} />);

    // Simulate search input
    fireEvent.change(screen.getByPlaceholderText('Pesquisar por Descrição ou Fornecedor'), {
      target: { value: 'Supplier A' },
    });

    // Check for filtered product
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });

  it('opens ProductBox when adding a new product', () => {
    render(<Table products={products} refreshTable={refreshTable} />);

    // Simulate clicking the add button
    const addProductButton = screen.getByTestId('add-product-button');
    fireEvent.click(addProductButton);

    // Check if ProductBox is opened
    expect(screen.getByText('Novo Produto')).toBeInTheDocument();

    // Check if the ProductBox is empty
    expect(screen.getAllByDisplayValue('')).toHaveLength(6);
  });

  it('opens ProductBox when editing a product', () => {
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

  it('deletes a product on delete click', async () => {
    axios.delete.mockResolvedValueOnce({});

    render(<Table products={products} refreshTable={refreshTable} />);

    const targetProductIndex = 0;
    const targetProduct = products[targetProductIndex];

    // Simulate clicking the delete button
    const deleteProductButton = screen.getByTestId('delete-product-button_' + targetProductIndex);
    fireEvent.click(deleteProductButton);

    // Wait for delete request
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('/api/products/' + targetProduct._id);
    });

    // Check if refreshTable was called
    expect(refreshTable).toHaveBeenCalledTimes(1);
  });

  it('closes ProductBox when clicks close button', () => {
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
