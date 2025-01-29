import { CloseCircleOutlined } from "@ant-design/icons";
import PropType from "prop-types";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { applyFilter } from "../../Redux/Actions/filterActions";

const ProductFilters = ({ filteredProducts }) => {
  const filter = useSelector((state) => state.filter, shallowEqual);
  const fields = ["brand", "minPrice", "maxPrice", "sortBy", "keyword"];
  const isFiltered = fields.some((key) => !!filter(key));
  const dispatch = useDispatch();

  const onRemoveKeyword = () => {
    dispatch(applyFilter({ keyword: "" }));
  };

  const onRemovePriceRange = () => {
    dispatch(applyFilter({ minPrice: 0, maxPrice: 0 }));
  };

  const onRemoveBrand = () => {
    dispatch(applyFilter({ brand: "" }));
  };

  const onRemoveSort = () => {
    dispatch(applyFilter({ sortBy: "" }));
  };

  return !isFiltered ? null : (
    <>
      <div className="product-list-header">
        <div className="product-list-header-title">
          <h5>
            {filteredProducts > 0 &&
              `Found ${filteredProducts} ${
                filteredProducts > 1 ? "products" : "product"
              }`}
          </h5>
        </div>
      </div>
      <div className="product-applied-filter">
        {filter.keyword && (
          <div className="pill-wrapper">
            <span className="d-block">Keyword</span>
            <div className="pill padding-right-1">
              <h5 className="pill-content margin-0">{filter.keyword}</h5>
              <div
                className="pill-remove"
                onClick={onRemoveKeyword}
                role="presentation"
              >
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}
        {filter.brand && (
          <div className="pill-wrapper">
            <span className="d-block">Brand</span>
            <div className="pill padding-right-1">
              <h5 className="pill-content margin-0">{filter.brand}</h5>
              <div
                className="pill-remove"
                onClick={onRemoveBrand}
                role="presentation"
              >
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}
        {(!!filter.minPrice || !!filter.maxPrice) && (
          <div className="pill-wrapper">
            <span className="d-block">Price Range</span>
            <div className="pill padding-right 1">
              <h5 className="pill-content maring-0">
                ${filter.minPrice}- ${filter.maxPrice}
              </h5>
              <div
                className="pill-remove"
                onClick={onRemovePriceRange}
                role="presentation"
              >
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}
        {filter.sortBy && (
          <div className="pill-wrapper">
            <span className="d-block">Sort By</span>
            <div className="pill padding-right-1">
              <h5 className="pill-content margin-0">
                {filter.sortBy === "price-desc"
                  ? "Price High to Low"
                  : filter.sortBy === "price-asc"
                  ? "Price Low to High"
                  : filter.sortBy === "name-desc"
                  ? "Name Z - A"
                  : "Name A -Z"}
              </h5>
              <div
                className="pill-remove"
                onClick={onRemoveSort}
                role="presentation"
              >
                <h5 className="margin-0 text-subtle">
                  <CloseCircleOutlined />
                </h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

ProductFilters.defaultProps = {
  filteredProducts: 0,
};

ProductFilters.propTypes = {
  filteredProducts: PropType.number,
};

export default ProductFilters;
