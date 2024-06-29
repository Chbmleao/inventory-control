import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../SearchInput'; // Update the path as necessary

describe('SearchInput', () => {
  it('renders the search input correctly', () => {
    render(<SearchInput setSearchFilter={() => {}} />);
    
    // Check for the input placeholder
    expect(screen.getByPlaceholderText('Pesquisar por Descrição ou Fornecedor')).toBeInTheDocument();
    
    // Check for the input's initial value (should be empty)
    expect(screen.getByRole('searchbox')).toHaveValue('');
    
    // Check for the search icon (by checking if the SVG element is present)
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('calls setSearchFilter with the correct value when the input changes', () => {
    const setSearchFilter = jest.fn();
    render(<SearchInput setSearchFilter={setSearchFilter} />);
    
    // Simulate typing in the search input
    const searchInput = screen.getByPlaceholderText('Pesquisar por Descrição ou Fornecedor');
    fireEvent.change(searchInput, { target: { value: 'Produto 1' } });
    
    // Check if setSearchFilter was called with 'Produto 1'
    expect(setSearchFilter).toHaveBeenCalledWith('Produto 1');
    expect(setSearchFilter).toHaveBeenCalledTimes(1);
    expect(searchInput).toHaveValue('Produto 1');
  });

  it('displays the search icon inside the input field', () => {
    render(<SearchInput setSearchFilter={() => {}} />);
    
    // Check if the search icon is visible inside the input field
    const svgElement = screen.getByTestId('search-icon');
    expect(svgElement).toBeInTheDocument();
  });

  it('has the required attribute', () => {
    render(<SearchInput setSearchFilter={() => {}} />);
    
    // Check if the input field is required
    const searchInput = screen.getByPlaceholderText('Pesquisar por Descrição ou Fornecedor');
    expect(searchInput).toBeRequired();
  });
});