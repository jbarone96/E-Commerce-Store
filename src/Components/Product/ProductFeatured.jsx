import { ImageLoader } from "../../Components/Common";
import PropType from "prop-types";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useHistory } from "react-router-dom";

const ProductFeatured = ({ product }) => {
  const history = useHistory();

  const onClickItem = () => {
    if (!product) return;

    history.push(`/product/${product.id}`);
  };

  return (
    <SkeletonTheme color="#E1E1E1" highlightColor="#F2F2F2">
      <div
        className="product-display"
        onClick={onClickItem}
        role="presentation"
      >
        <div className="product-display-img">
          {product.iamge ? (
            <ImageLoader className="product-card-img" src={product.img} />
          ) : (
            <Skeleton width="100%" height="100%" />
          )}
        </div>
        <div className="product-display-details">
          <h2>{product.name || <Skeleton width={80} />}</h2>
          <p className="text-subtle text-italic">
            {product.brand || <Skeleton width={40} />}
          </p>
        </div>
      </div>
    </SkeletonTheme>
  );
};

ProductFeatured.propTypes = {
  product: PropType.shape({
    image: PropType.string,
    name: PropType.string,
    id: PropType.string,
    brand: PropType.string,
  }).isRequired,
};

export default ProductFeatured;
