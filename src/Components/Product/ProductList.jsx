import { Boundary, MessageDisplay } from "../../Components/Common";
import PropType from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../Redux/Actions/miscActions";
import { getProducts } from "../../Redux/Actions/productActions";

const ProductList = (props) => {
  const { products, filteredProducts, isLoading, requestStatus, children } =
    props;
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();

  const fetchProducts = () => {
    setIsFetching(true);
    dispatch(getProducts(products.lastRefKey));
  };

  useEffect(() => {
    if (products.items.length === 0 || !products.lastRefKey) {
      fetchProducts();
    }

    window.scrollTo(0, 0);
    return () => dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    setIsFetching(false);
  }, [products.lastRefKey]);

  if (filteredProducts.length === 0 && !isLoading) {
    return (
      <MessageDisplay message={requestStatus?.message || "No Product Found."} />
    );
  }
  if (filteredProducts.length === 0 && requestStatus) {
    return (
      <MessageDisplay
        message={requestStatus?.message || "Something went wrong."}
        action={fetchProducts}
        buttonLabel="Try Again"
      />
    );
  }

  return (
    <Boundary>
      {children}
      {products.items.length < products.total && (
        <div className="d-flex-center padding-1">
          <button
            className="button button-small"
            disabled={isFetching}
            onClick={fetchProducts}
            type="button"
          >
            {isFetching ? "Fetching products..." : "Show more products"}
          </button>
        </div>
      )}
    </Boundary>
  );
};

ProductList.defaultProps = {
  requestStatus: null,
};

ProductList.propTypes = {
  products: PropType.object.isRequired,
  filteredProducts: PropType.array.isRequired,
  isLoading: PropType.bool.isRequired,
  requestStatus: PropType.string,
  children: PropType.oneOfType([PropType.arrayOf(PropType.node), PropType.node])
    .isRequired,
};

export default ProductList;
