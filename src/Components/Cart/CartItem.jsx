import { CloseOutlined } from "@ant-design/icons";
import { CartItemControl } from "@/components/cart";
import { ImageLoader } from "@/components/common";
import { displayCurrency } from "../../Helpers/utility";
import PropType from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "@/redux/actions/cartActions";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const onRemoveFromCart = () => dispatch(removeFromCart(product.id));

  return (
    <div className="cart-item">
      <CartItemControl product={product} />
      <div className="cart-item-wrapper">
        <div className="cart-item-img-wrapper">
          <ImageLoader
            alt={product.name}
            className="cart-item-img"
            src={product.image}
          />
        </div>
        <div className="cart-item-details">
          <Link
            to={`/product/${product.id}`}
            onClick={() => document.body.classList.remove("is-cart-open")}
          >
            <h4 className="underline cart-item-name">{product.name}</h4>
          </Link>
          <div className="cart-item-specs">
            <div>
              <span className="spec-title">Quantity</span>
              <h5 className="my-0">{product.quantity}</h5>
            </div>
            <div>
              <span className="spec-title">Size</span>
              <h5 className="my-0">{product.selectedSize}</h5>
            </div>
            <div>
              <span className="spec-title">Color</span>
              <div
                style={{
                  backgroundColor:
                    product.selectedColor || product.availableColors[0],
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                }}
              ></div>
            </div>
          </div>
          <div className="cart-item-price">
            <h4>{displayCurrency(product.price * product.quantity)}</h4>
          </div>
          <button
            className="cart-item-remove button button-border button-border-gray button-small"
            onClick={onRemoveFromCart}
            type="button"
          >
            <CloseOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes -
  {
    product: PropType.shape({
      id: PropType.string,
      name: PropType.string,
      brand: PropType.string,
      price: PropType.number,
      quantity: PropType.number,
      maxQuantity: PropType.number,
      description: PropType.string,
      keywords: PropType.arrayOf(PropType.string),
      selectedSize: PropType.string,
      selectedColor: PropType.string,
      imageCollection: PropType.arrayOf(PropType.string),
      sizes: PropType.arrayOf(PropType.number),
      image: PropType.string,
      imageUrl: PropType.string,
      isFeatured: PropType.bool,
      isRecommended: PropType.bool,
      availableColors: PropType.arrayOf(PropType.string),
    }).isRequired,
  };

export default CartItem;
