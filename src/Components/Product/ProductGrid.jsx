import { useCart } from "../../Hooks";
import PropType from "prop-types";
import React from "react";
import ProductItem from "./ProductItem";

const ProductGrid = ({ products }) => {
  const { addtToCart, isItemInCart } = useCart();

  return (
    <div>
      {products.length === 0
        ? new Array(12)
            .fill({})
            .map((product, idx) => (
              <ProductItem key={`product-skeleton ${idx}`} />
            ))
        : products.map((product) => (
            <ProductItem
              key={product.id}
              isItemInCart={isItemInCart}
              addtToCart={addtToCart}
              product={product}
            />
          ))}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropType.array.isRequired,
};

export default ProductGrid;
