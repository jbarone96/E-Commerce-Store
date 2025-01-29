import { Filters } from "../../Components/Common";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  clearRecentSearch,
  removedSelectedRecent,
  setTextFilter,
} from "../../Redux/Actions/filterActions";

const ProductSearch = () => {
  const history = useHistory();

  const { productsLength, filter, products, isLoading } = useSelector(
    (state) => ({
      filter: state.filter,
      products: state.products.items,
      isLoading: state.app.loading,
      productsLength: state.products.length,
    })
  );

  const dispatch = useDispatch();
  const searchInput = useRef(null);
  let input = "";

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  const onSearchChange = (e) => {
    const value = e.target.value.trim();
    input = value;

    if (value === "" && productsLength !== 0) {
      dispatch(setTextFilter(value));
      history.push("/");
    }
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13 && productsLength !== 0) {
      dispatch(setTextFilter(input));
      history.push("/");
    }
  };

  const onClearRecent = () => {
    dispatch(clearRecentSearch());
  };

  return (
    <div className="product-search">
      <div className="product-search-header">
        <h3 onClick={history.goBack} role="presentation">
          <i className="fa fa-chevron-left" />
        </h3>
        <div className="product-search-wrapper">
          <input
            className="product-search-input"
            onChange={onSearchChange}
            onKeyUp={onKeyUp}
            placeholder="Search"
            ref={searchInput}
            type="text"
          />
          <div className="searchBar-icon" />
        </div>
      </div>
      <div className="product-search-body">
        <div className="product-search-recent">
          <div className="product-search-recent-header">
            <h5>Recent Searches</h5>
            <h5
              onClick={onClearRecent}
              style={{ color: "red" }}
              role="presentation"
            >
              Clear
            </h5>
          </div>
          {filter.recent.map((item, idx) => (
            <div className="pill-wrapper" key={`${item}${idx}`}>
              <div className="pill padding-right-1">
                <h5
                  className="pill-content margin-0"
                  onClick={() => {
                    dispatch(setTextFilter(item));
                    history.push("/");
                  }}
                  role="presentation"
                >
                  {item}
                </h5>
                <div
                  className="pill-remove"
                  onClick={() => dispatch(removedSelectedRecent(item))}
                  role="presentation"
                >
                  <h5 className="text-subtle margin-0">
                    <i className="fa fa-times-circle" />
                  </h5>
                </div>
              </div>
            </div>
          ))}
          {filter.recent.length === 0 && (
            <h5 className="text-subtle">No Recent Searches</h5>
          )}
        </div>
        <div className="product-search-filter">
          <h5 className="margin-0">Choose Filters</h5>
        </div>
        <div className="product-search-filter-sub">
          <Filters
            dispatch={dispatch}
            filter={filter}
            isLoading={isLoading}
            products={products}
            productsLength={productsLength}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
