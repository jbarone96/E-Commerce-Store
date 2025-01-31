import { LoadingOutlined } from "@ant-design/icons";
import { Boundary, MessageDisplay } from "../../Components/Common";
import { ProductGrid } from "../../Components/Product/";
import { useDidMount } from "../../Hooks";
import PropType from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRequestStatus } from "../../Redux/Actions/miscActions";
import { searchProduct } from "../../Redux/Actions/productActions";

const Search = ({ match }) => {
  const { searchKey } = match.params;
  const dispatch = useDispatch();
  const didMount = useDidMount(true);
  const store = useSelector((state) => ({
    isLoading: state.app.loading,
    products: state.products.searchedProducts.items,
    cart: state.cart,
    requestStatus: state.app.requestStatus,
  }));

  useEffect(() => {
    if (didMount && !store.isLoading) {
      dispatch(searchProduct(searchKey));
    }
  }, [searchKey]);

  useEffect(() => {
    dispatch(setRequestStatus(""));
  }, []);

  if (store.requestStatus && !store.isLoading) {
    return (
      <main>
        <MessageDisplay
          message={store.requestStatus}
          desc="Try again using the correct filter or keyword."
        />
      </main>
    );
  }

  if (!store.requestStatus && !store.isLoading) {
    return (
      <Boundary>
        <main className="content">
          <section className="product-list-wrapper product-list-search">
            {!store.requestStatus && (
              <div className="product-list-header">
                <div className="product-list-header-title">
                  <h5>
                    {`Found ${store.products.length} ${
                      store.products.length > 1 ? "products" : "product"
                    } with keyword ${searchKey}`}
                  </h5>
                </div>
              </div>
            )}
            <ProductGrid products={store.products} />
          </section>
        </main>
      </Boundary>
    );
  }

  return (
    <main className="content">
      <div className="loader">
        <h4>Searching Product...</h4>
        <br />
        <LoadingOutlined style={{ fontSize: "3rem" }} />
      </div>
    </main>
  );
};

Search.propTypes = {
  match: PropType.shape({
    params: PropType.shape({
      searchKey: PropType.string,
    }),
  }).isRequired,
};

export default Search;
