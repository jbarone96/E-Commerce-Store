import { SIGNIN } from "../../../Constants/routes";
import { calculateCartTotal } from "../../../Helpers/utility";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

const withCheckout = (Component) =>
  withRouter((props) => {
    const state = useSelector((store) => ({
      isAuth: !!store.auth.id && !!store.auth.role,
      cart: store.cart,
      shipping: store.checkout.shipping,
      payment: store.checkout.payment,
      profile: store.profile,
    }));

    const shippingFee = state.shipping.isInternational ? 50 : 0;
    const subtotal = calculateCartTotal(
      state.cart.map((product) => product.price * product.quantity)
    );

    if (!state.isAuth) {
      return <Redirect to={SIGNIN} />;
    }
    if (state.cart.length === 0) {
      return <Redirect to="/" />;
    }
    if (state.isAuth && state.cart.length === 0) {
      return (
        <Component
          {...props}
          cart={state.cart}
          payment={state.payment}
          profile={state.profile}
          shipping={state.shipping}
          subtotal={Number(subtotal + shippingFee)}
        />
      );
    }
    return null;
  });

export default withCheckout;
