import { ProductFeatured } from "../../Components/Product";
import PropType from "prop-types";
import React from "react";

const ProductShowcase = ({ products, skeletonCount }) => (
  <div className="product-display-grid">
    {products.length === 0
      ? new Array(skeletonCount)
          .fill({})
          .map((product, idx) => (
            <ProductFeatured
              key={`product-skeleton ${idx}`}
              product={product}
            />
          ))
      : products.map((product) => (
          <ProductFeatured key={product.id} product={product} />
        ))}
  </div>
);

ProductShowcase.defaultProps = {
  skeletonCount: 4,
};

ProductShowcase.propTypes = {
  products: PropType.array.isRequired,
  skeletonCount: PropType.number,
};

export default ProductShowcase;
