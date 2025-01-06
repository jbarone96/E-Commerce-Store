import PropType from "prop-types";
import React from "react";
import { ProductItem } from ".";

const ProductsTable = ({ filteredProducts }) => (
  <div>
    {filteredProducts.length > 0 && (
      <div className="gird grid-product grid-count-6">
        <div className="grid-col" />
        <div className="grid-col">
          <h5>Name</h5>
        </div>
        <div className="grid-col">
          <h5>Brand</h5>
        </div>
        <div className="grid-col">
          <h5>Price</h5>
        </div>
        <div className="grid-col">
          <h5>Date Added</h5>
        </div>
        <div className="grid-col">
          <h5>Quantity</h5>
        </div>
      </div>
    )}
    {filteredProducts.length === 0
      ? new Array(10)
          .fill({})
          .map((product, index) => (
            <ProductItem key={`product-skeleton ${index}`} product={product} />
          ))
      : filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
  </div>
);

ProductsTable.propTypes = {
  filteredProducts: PropType.array.isRequired,
};

export default ProductsTable;
