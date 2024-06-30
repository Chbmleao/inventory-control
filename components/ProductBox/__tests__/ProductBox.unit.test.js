import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import ProductBox from "../ProductBox";

describe("ProductBox", () => {
  it("should render the box creating a new product", () => {
    render(<ProductBox />);
    expect(screen.getByText("Novo Produto")).toBeInTheDocument();
    expect(screen.getByText("Descrição")).toBeInTheDocument();
    expect(screen.getByText("Quantidade")).toBeInTheDocument();
    expect(screen.getByText("Unidade")).toBeInTheDocument();
    expect(screen.getByText("Preço de compra")).toBeInTheDocument();
    expect(screen.getByText("Fornecedor")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Salvar")).toBeInTheDocument();
  });

  it("should render the box editing a product", () => {
    const product = {
      description: "Produto 1",
      quantity: "10",
      unity: "kg",
      priceBought: "29.99",
      supplier: "Fornecedor 1",
    };

    render(<ProductBox product={product} />);
    expect(screen.getByText("Editar Produto")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Produto 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("10")).toBeInTheDocument();
    expect(screen.getByDisplayValue("kg")).toBeInTheDocument();
    expect(screen.getByDisplayValue("29.99")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Fornecedor 1")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Salvar")).toBeInTheDocument();
  });

  it("should allow editing fields", async () => {
    const product = {
      description: "Produto 1",
      quantity: "10",
      unity: "kg",
      priceBought: "29.99",
      supplier: "Fornecedor 1",
    };

    render(<ProductBox product={product} closeProductBox={() => {}} />);

    // Simulate changes in input fields
    fireEvent.change(screen.getByDisplayValue("Produto 1"), { target: { value: "Produto 1 Editado" } });
    fireEvent.change(screen.getByDisplayValue("10"), { target: { value: "20" } });
    fireEvent.change(screen.getByDisplayValue("kg"), { target: { value: "g" } });
    fireEvent.change(screen.getByDisplayValue("29.99"), { target: { value: "19.99" } });
    fireEvent.change(screen.getByDisplayValue("Fornecedor 1"), { target: { value: "Fornecedor 2" } });


    expect(screen.getByDisplayValue("Produto 1 Editado")).toBeInTheDocument();
    expect(screen.getByDisplayValue("20")).toBeInTheDocument(); 
    expect(screen.getByDisplayValue("g")).toBeInTheDocument();
    expect(screen.getByDisplayValue("19.99")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Fornecedor 2")).toBeInTheDocument();
  });

  it("should allow saving changes", async () => {
    const product = {
      id: "1",
      description: "Produto 1",
      quantity: "10",
      unity: "kg",
      priceBought: "29.99",
      supplier: "Fornecedor 1",
    };

    // Mock axios.put to simulate a successful update
    const mockPut = jest.spyOn(axios, "put").mockResolvedValueOnce({ data: {} });

    render(<ProductBox product={product} closeProductBox={() => {}} />);

    // Simulate changes in input fields
    fireEvent.change(screen.getByDisplayValue("Produto 1"), { target: { value: "Produto 1 Editado" } });
    fireEvent.change(screen.getByDisplayValue("10"), { target: { value: "20" } });

    // Trigger save action
    fireEvent.click(screen.getByText("Salvar"));

    // Ensure axios.put was called with the updated data
    await waitFor(() => {
      expect(mockPut).toHaveBeenCalledWith("/api/products", {
        description: "Produto 1 Editado",
        quantity: "20",
        unity: "kg",
        priceBought: "29.99",
        supplier: "Fornecedor 1",
      });
    });
    expect(mockPut).toHaveBeenCalledTimes(1); 
  });

  it("should allow saving new products", async () => {
    // Mock axios.post to simulate a successful creation
    const mockPost = jest.spyOn(axios, "post").mockResolvedValueOnce({ data: {} });

    render(<ProductBox closeProductBox={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText('Novo Produto')).toBeInTheDocument();
    });

    // Simulate changes in input fields
    fireEvent.change(screen.getByLabelText("Descrição"), { target: { value: "Produto 1" } });
    fireEvent.change(screen.getByLabelText("Quantidade"), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText("Unidade"), { target: { value: "kg" } });
    fireEvent.change(screen.getByLabelText("Preço de compra"), { target: { value: "29.99" } });
    fireEvent.change(screen.getByLabelText("Fornecedor"), { target: { value: "Fornecedor 1" } });

    // Trigger save action
    fireEvent.click(screen.getByText("Salvar"));

    // Ensure axios.post was called with the new data
    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith("/api/products", {
        description: "Produto 1",
        quantity: "10",
        unity: "kg",
        priceBought: "29.99",
        supplier: "Fornecedor 1",
      });
    });
    expect(mockPost).toHaveBeenCalledTimes(1);
  });
});

