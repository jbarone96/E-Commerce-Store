import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import PropType from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import {
  addQuantityItem,
  removeQuantityItem,
} from "@/redux/actions/cartActions";

const CartItemControl = ({ product }) => {
  const dispatch = useDispatch();

  const onAdd = () => {
    if (product.quantity < product.maxQuantity) {
      dispatch(addQuantityItem(product.id));
    }
  };

  const onSubtract = () => {
    if (product.maxQuantity >= product.quantity && product.quantity !== 0) {
      dispatch(removeQuantityItem(product.id));
    }
  };

  return (
    <div className="cart-item-control">
      <button
        className="button button-border button-border-gray button-small cart-control cart-control-add"
        disabled={product.maxQuantity === product.quantity}
        onClick={onAdd}
        type="button"
      >
        <PlusOutlined style={{ fontSize: "9px" }} />
      </button>
      <button
        className="button button-border button-border-gray button-small cart-control cart-control-subtract"
        disabled={product.quantity === 1}
        onClick={onSubtract}
        type="button"
      >
        <MinusOutlined style={{ fontSize: "9px" }} />
      </button>
    </div>
  );
};

CartItemControl.propTypes = {
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

export default CartItemControl;
