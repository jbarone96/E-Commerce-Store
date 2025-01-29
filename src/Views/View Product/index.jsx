import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  ColorPicker,
  ImageLoader,
  MessageDisplay,
} from "../../Components/Common";
import { ProductShowcase } from "../../Components/Product";
import { RECOMMENDED_PRODUCTS, SHOP } from "../../Constants/routes";
import { displayCurrency } from "../../Helpers/utility";
import {
  useCart,
  useDocument,
  useProducts,
  useRecommendedProducts,
  useScroll,
} from "../../Hooks";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Select from "react-select/base";

const ViewProduct = () => {
  const { id } = useParams();
  const { product, isLoading, error } = useProducts(id);
  const { addToCart, isItemInCart } = useCart(id);
  useScroll();
  useDocument(`View ${product?.name || "Item"}`);

  const [selectedImage, setSelectedImage] = useState(product?.image || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured,
  } = useRecommendedProducts(6);
  const colorOverlay = useRef(null);

  useEffect(() => {
    setSelectedImage(product?.image);
  }, [product]);

  const onSizeChange = (newValue) => {
    selectedSize(newValue.value);
  };

  const onColorChange = (color) => {
    setSelectedColor(color);
    if (colorOverlay.current) {
      colorOverlay.current.value = color;
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor,
      selectedSize: selectedSize || product.sizes[0],
    });
  };

  return (
    <main className="content">
      {isLoading && (
        <div className="loader">
          <h4>Loading Product...</h4>
          <br />
          <LoadingOutlined style={{ fontSize: "3rem" }} />
        </div>
      )}
      {error && <MessageDisplay message={error} />}
      {product && !isLoading && (
        <div className="product-view">
          <Link to={SHOP}>
            <h3 className="button-link d-inline-flex">
              <ArrowLeftOutlined />
              &nbsp; Back to Shop
            </h3>
          </Link>
          <div className="product-modal">
            {product.imageCollection.length !== 0 && (
              <div className="product-modal-image-collection">
                {product.imageCollection.map((image) => (
                  <div
                    className="product-modal-image-collection-wrapper"
                    key={image.id}
                    onClick={() => setSelectedImage(image.url)}
                    role="presentation"
                  >
                    <ImageLoader
                      className="product-modal-image-collection-img"
                      src={image.url}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="product-modal-image-wrapper">
              {selectedColor && (
                <input
                  type="color"
                  disabled
                  ref={colorOverlay}
                  id="color-overlay"
                />
              )}
              <ImageLoader
                alt={product.name}
                className="product-modal-image"
                src={selectedImage}
              />
            </div>
            <div className="product-modal-details">
              <br />
              <span className="text-subtle">{product.brand}</span>
              <h1 className="margin-top-0">{product.name}</h1>
              <span>{product.description}</span>
              <br />
              <br />
              <div className="divider" />
              <br />
              <div>
                <span>UPDATE THIS!!!</span>
                <br />
                <br />
                <Select
                  placeholder="--Select Size--"
                  onChange={onSizeChange}
                  options={product.sizes
                    .sort((a, b) => (a < b ? -1 : 1))
                    .map((size) => ({ label: `${size}`, value: size }))}
                  styles={{ menu: (provided) => ({ ...provided, zIndex: 10 }) }}
                />
              </div>
              <br />
              {product.availableColors.length >= 1 && (
                <div>
                  <span className="text-subtle">Choose Color</span>
                  <br />
                  <br />
                  <ColorPicker
                    availableColors={product.availableColors}
                    onColorChange={onColorChange}
                  />
                </div>
              )}
              <h1>{displayCurrency(product.price)}</h1>
              <div className="product-modal-action">
                <button
                  className={`button button-small ${
                    isItemInCart(product.id)
                      ? "button-border button-border-gray"
                      : ""
                  }`}
                  onClick={handleAddToCart}
                  type="button"
                >
                  {isItemInCart(product.id)
                    ? "Remove From Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "10rem" }}>
            <div className="display-header">
              <h1>Recommended</h1>
              <Link to={RECOMMENDED_PRODUCTS}>Shop All</Link>
            </div>
            {errorFeatured && !isLoadingFeatured ? (
              <MessageDisplay
                message={error}
                action={fetchRecommendedProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcase
                products={recommendedProducts}
                skeletonCount={3}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default ViewProduct;
