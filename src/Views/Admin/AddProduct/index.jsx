import { LoadingOutlined } from "@ant-design/icons";
import { useDocument, useScroll } from "../../../Hooks";
import React, { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { addProduct } from "../../../Redux/Actions/productActions";

const ProductForm = lazy(() => import("../Components/ProductForm"));

const AddProduct = () => {
  useScroll();
  useDocument("Add New Product | Reactify");

  const isLoading = useSelector((state) => state.app.isLoading);
  const dispatch = useDispatch();

  const onSubmit = (product) => {
    dispatch(addProduct(product));
  };

  return (
    <div className="product-form-container">
      <h2>Add New Product</h2>
      <Suspense
        fallback={
          <div className="loader" style={{ minHeight: "80vh" }}>
            <h6>Loading</h6>
          </div>
        }
      >
        <ProductForm
          isLoading={isLoading}
          onSubmit={onSubmit}
          product={{
            name: "",
            brand: "",
            price: 0,
            maxQuantity: 0,
            description: "",
            keywords: [],
            sizes: [],
            image: "",
            isFeatured: false,
            isRecommended: false,
            availableColors: [],
            imageCollection: [],
          }}
        />
      </Suspense>
    </div>
  );
};

export default withRouter(AddProduct);
