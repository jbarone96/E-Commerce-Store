import { LoadingOutlined } from "@ant-design/icons";
import { useDocument, useProducts, useScroll } from "../../../Hooks";
import PropType from "prop-types";
import React, { lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { editProduct } from "../../../Redux/Actions/productActions";

const ProductForm = lazy(() => import("../Components/ProductForm"));

const EditProduct = ({ match }) => {
  useDocument("Edit Product | Reactify");
  useScroll();

  const { product, error, isLoading } = useProducts(match.param.id);
  const dispatch = useDispatch();

  const onSubmitForm = (updates) => {
    dispatch(editProduct(product.id, updates));
  };

  return (
    <div className="product-form-container">
      {error && <Redirect to="/dashboard/products" />}
      <h2>Edit Product</h2>
      {product && (
        <Suspense
          fallback={
            <div className="loader" style={{ minHeight: "80vh" }}>
              <h6>Loading...</h6>
              <br />
              <LoadingOutlined />
            </div>
          }
        >
          <ProductForm
            isLoading={isLoading}
            onSubmit={onSubmitForm}
            product={product}
          />
        </Suspense>
      )}
    </div>
  );
};

EditProduct.propTypes = {
  match: PropType.shape({
    param: PropType.shape({
      id: PropType.string,
    }),
  }).isRequired,
};

export default withRouter(EditProduct);
