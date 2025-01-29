import { Boundary } from "../../../Components/Common";
import { Filters, ProductList } from "../../../Components/Product";
import { useDocument, useScroll } from "../../../Hooks";
import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectFilter } from "../../../Selectors/selector";
import { ProductsNavbar } from "../Components";
import ProductsTable from "../Components/ProductsTable";

const Products = () => {
  useDocument("Product List | Reactify");
  useScroll();

  const store = useSelector((state) => ({
    filteredProducts: selectFilter(state.products.items, state.filter),
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    products: state.products,
  }));

  return (
    <Boundary>
      <ProductsNavbar
        productsCount={store.products.items.length}
        totalProductsCount={store.products.total}
      />
      <div className="product-admin-items">
        <ProductList {...store}>
          <AppliedFilters filter={store.filter} />
          <ProductsTable filteredProducts={store.filteredProducts} />
        </ProductList>
      </div>
    </Boundary>
  );
};

export default withRouter(Products);
