import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Table from '../Table';
import { act } from 'react';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');
jest.mock('../../ProductBox/ProductBox', () => {
  return jest.fn(() => (
    <div data-testid="product-box">
      ProductBox Mock
    </div>
  ));
});

jest.mock('../../SearchInput/SearchInput', () => {
  return jest.fn(() => (
    <div data-testid="search-input">
      SearchInput Mock
    </div>
  ));
});

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
    expect(screen.getByText('kg')).toBeInTheDocument();
    expect(screen.getByText('Supplier A')).toBeInTheDocument();

    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('l')).toBeInTheDocument();
    expect(screen.getByText('Supplier B')).toBeInTheDocument();
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

  it('opens the ProductBox when edit button is clicked', async () => {
    render(<Table products={products} refreshTable={refreshTable} />);

    // Simulate clicking the edit button
    const editProductButton = screen.getByTestId('edit-product-button_0');
    fireEvent.click(editProductButton);

    // Check if ProductBox is displayed
    await waitFor(() => expect(screen.getByTestId('product-box')).toBeInTheDocument());
  });
});
