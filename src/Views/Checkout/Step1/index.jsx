import { ArrowRightOutlined, ShopOutlined } from "@ant-design/icons";
import { CartItem } from "../../../Components/Cart";
import { CHECKOUT_2 } from "../../../Constants/routes";
import { displayMoney } from "../../../Helpers/utility";
import { useDocumentTitle, useScrollTop } from "../../../Hooks";
import PropType from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { StepTracker } from "../Components";
import withCheckout from "../Utility/withCheckout";

const OrderSummary = ({ cart, subtotal }) => {
  useDocumentTitle("Checkout Step 1 | Reactify");
  useScrollTop();
  const dispatch = useDispatch();
  const history = useHistory();
  const onClickPrevious = () => history.push("/");
  const onClickNext = () => history.push(CHECKOUT_2);

  return (
    <div className="checkout">
      <StepTracker current={1} />
      <div className="checkout-step-1">
        <h3 className="text-center">Order Summary</h3>
        <span className="d-block text-center">Review items in cart.</span>
        <br />
        <div className="checkout-items">
          {cart.map((product) => (
            <CartItem
              cart={cart}
              dispatch={dispatch}
              key={product.id}
              product={product}
            />
          ))}
        </div>
        <br />
        <div className="cart-total text-right">
          <p className="cart-total-title">Subtotal:</p>
          <h2 className="cart-total-amount">{displayMoney(subtotal)}</h2>
        </div>
        <br />
        <div className="checkout-shipping-action">
          <button
            className="button button-muted"
            onClick={onClickPrevious}
            type="button"
          >
            <ShopOutlined />
            &nbsp; Continue Shopping
          </button>
          <button className="button" onClick={onClickNext} type="submit">
            Next &nbsp;
            <ArrowRightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  cart: PropType.arrayOf(PropType.object).isRequired,
  subtotal: PropType.number.isRequired,
};

export default withCheckout(OrderSummary);
