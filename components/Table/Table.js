import { Card, Typography } from "@material-tailwind/react";
import ProductBox from "../ProductBox/ProductBox";
import { useState, useEffect } from "react";
import SearchInput from "../SearchInput/SearchInput";
import axios from "axios";

export default function Table({ products, refreshTable }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductBoxOpen, setIsProductBoxOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const closeProductBox = () => {
    setIsProductBoxOpen(false);
    refreshTable();
    setSelectedProduct(null);
  }

  const onEditClick = (product) => {
    setSelectedProduct(product);
    setIsProductBoxOpen(true);
  }

  const onDeleteClick = async (id) => {
    await axios.delete(`/api/products/${id}`);
    refreshTable();
  }

  const getFilteredProducts = () => {
    if (searchFilter === "") {
      return products;
    }

    return products.filter((product) => {
      const { description, supplier } = product;
      return description.toLowerCase().includes(searchFilter.toLowerCase()) || supplier.toLowerCase().includes(searchFilter.toLowerCase());
    });
  }

  return (
    <div className="relative">
      <div className="mb-5">
        <SearchInput setSearchFilter={setSearchFilter} />
      </div>
      <div className="p-2 w-5/6 container mx-auto bg-white rounded-lg">
        <Card className="p-3 overflow-scroll" style={{ height: '65vh'}}>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                  <th
                    key="description"
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Descrição
                    </Typography>
                  </th>
                  <th
                    key="quantity"
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Quantidade
                    </Typography>
                  </th>
                  <th
                    key="unity"
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Unidade
                    </Typography>
                  </th>
                  <th
                    key="priceBought"
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Preço de compra
                    </Typography>
                  </th>
                  <th
                    key="supplier"
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Fornecedor
                    </Typography>
                  </th>
                  <th>
                    <Typography
                      as="a"
                      href=""
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      onClick={(ev) => { ev.preventDefault(); setIsProductBoxOpen(true); }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </Typography>
                  </th>
              </tr>
            </thead>
            <tbody>
              {getFilteredProducts().map(({ description, quantity, unity, priceBought, supplier, _id }, index) => {
                const isLast = index === getFilteredProducts().length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    
                return (
                  <tr key={description + index}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {quantity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {unity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {priceBought}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {supplier}
                      </Typography>
                    </td>
                    <td className={classes} >
                      <div className="container flex space-x-2">
                        <Typography
                          as="a"
                          href=""
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          onClick={(ev) => { ev.preventDefault(); onEditClick({ description, quantity, unity, priceBought, supplier })}}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </Typography>
                        <Typography
                          as="a"
                          href=""
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          onClick={(ev) => { ev.preventDefault(); onDeleteClick(_id)}}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </Typography>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
      {isProductBoxOpen && <ProductBox product={selectedProduct} closeProductBox={closeProductBox} />}
    </div>
  );
}