import { Filters, ProductGrid, ProductList } from "../../Components/Product";
import { useDocument, useScroll } from "../../Hooks";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { selectFilter } from "../../Selectors/selector";

const Shop = () => {
  useDocument("Shop | Reactify");
  useScroll();

  const store = useSelector(
    (state) => ({
      filteredProducts: selectFilter(state.products.items, state.filter),
      products: state.products,
      requestStatus: state.app.requestStatus,
      isLoading: state.app.loading,
    }),
    shallowEqual
  );

  return (
    <main className="content">
      <section className="product-list-wrapper">
        <Filters filteredProductsCount={store.filteredProducts.length} />
        <ProductList {...store}>
          <ProductGrid products={store.filteredProducts} />
        </ProductList>
      </section>
    </main>
  );
};

export default Shop;
