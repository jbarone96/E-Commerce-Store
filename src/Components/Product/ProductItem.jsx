import { CheckOutlined } from "@ant-design/icons";
import { ImageLoader } from "../../Components/Common";
import { displayCurrency } from "../../Helpers/utility";
import PropType from "prop-types";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useHistory } from "react-router-dom";

const ProductItem = ({ product, isItemInCart, addToCart }) => {
  const history = useHistory();

  const onClickItem = () => {
    if (!product) return;

    if (product.id) {
      history.push(`/product/${product.id}`);
    }
  };

  const itemInCart = isItemInCart ? isItemInCart(product.id) : false;

  const handleAddToCart = () => {
    if (addToCart) addToCart({ ...product, selectedSize: product.sizes[0] });
  };

  return (
    <SkeletonTheme>
      <div
        className={`product-card ${!product.id ? "product-loading" : ""}`}
        style={{
          border: product && itemInCart ? "1px solid #A5A5A5" : "",
          boxShadow:
            product && itemInCart ? "0 10px 15px rgba(0,0,0,0.7)" : "none",
        }}
      >
        {itemInCart && (
          <CheckOutlined className="fa fa-check product-card-check" />
        )}
        <div
          className="product-card-content"
          onClick={onClickItem}
          role="presentation"
        >
          <div className="product-card-img-wrapper">
            {product.image ? (
              <ImageLoader
                alt={product.name}
                className="product-card-img"
                src={product.image}
              />
            ) : (
              <Skeleton width="100%" height="90%" />
            )}
          </div>
          <div className="product-details">
            <h5 className="product-card-name text-overflow-ellipsis margin-auto">
              {product.name || <Skeleton width={80} />}
            </h5>
            <p className="product-card-brand">
              {product.brand || <Skeleton width={60} />}
            </p>
            <h4 className="product-card-price">
              {product.price ? (
                displayCurrency(product.price)
              ) : (
                <Skeleton width={40} />
              )}
            </h4>
          </div>
        </div>
        {product.id && (
          <button
            className={`product-card-button button-small button button-block ${
              isItemInCart ? "button-border button-border-gray" : ""
            }`}
            onClick={handleAddToCart}
            type="button"
          >
            {itemInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        )}
      </div>
    </SkeletonTheme>
  );
};

ProductItem.defaultProps = {
  isItemInCart: undefined,
  addToCart: undefined,
};

ProductItem.propTypes = {
  product: PropType.object.isRequired,
  isItemInCart: PropType.func,
  addToCart: PropType.func,
};

export default ProductItem;
