import { CartItem, CartToggle } from "../Cart";
import { Boundary, Modal } from "../Common";
import { CHECKOUT_1 } from "../../Constants/routes";
import firebase from "firebase/compat/app";
import { calculateCartTotal, displayCurrency } from "../../Helpers/utility";
import { useDidMount, useModal } from "../../Hooks";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { clearCart } from "../../Redux/Actions/cartActions";

const Cart = () => {
  const { isOpenModal, onOpenModal, onCloseModal } = useModal();
  const { cart, user } = useSelector((state) => ({
    cart: state.cart,
    user: state.auth,
  }));
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const didMount = useDidMount();

  useEffect(() => {
    if (didMount && firebase.auth.currentUser && cart.length !== 0) {
      firebase
        .saveCartItems(cart, firebase.auth.currentUser.uid)
        .then(() => {
          console.log("Item saved to cart.");
        })
        .catch((e) => [console.log(e)]);
    }
  }, [cart.length]);

  const onCheckout = () => {
    if (cart.length !== 0 && user) {
      document.body.classList.remove("is-cart-open");
      history.push(CHECKOUT_1);
    } else {
      onOpenModal();
    }
  };

  const onSignIn = () => {
    onCloseModal();
    document.body.classList.remove("basket-open");
    history.push(CHECKOUT_1);
  };

  const onClearCart = () => {
    if (cart.length !== 0) {
      dispatch(clearCart());
    }
  };

  return user && user.role == "ADMIN" ? null : (
    <Boundary>
      <Modal isOpen={isOpenModal} onRequestClose={onCloseModal}>
        <p>You must sign in to continue checkout</p>
        <br />
        <div className="d-flex-center">
          <button
            className="button button-border button-border-gray button-small"
            onClick={onCloseModal}
            type="button"
          >
            Continue Shopping
          </button>
          &nbsp;
          <button
            className="button button-small"
            onClick={onSignIn}
            type="button"
          >
            Sign In
          </button>
        </div>
      </Modal>
      <div className="cart">
        <div className="cart-list">
          <div className="cart-header">
            <h3 className="cart-header-title">
              My Cart &nbsp;
              <span>
                ({` ${cart.length} ${cart.length > 1 ? "items" : "item"}`})
              </span>
            </h3>
            <CartToggle>
              {({ onClickToggle }) => (
                <span
                  className="cart-toggle button button-border button-border-gray button-small"
                  onClick={onClickToggle}
                  role="presentation"
                >
                  Close
                </span>
              )}
            </CartToggle>
            <button
              className="cart-clear button button-border button-border-gray button-small"
              disabled={cart.length === 0}
              onClick={onClearCart}
              type="button"
            >
              <span>Clear Cart</span>
            </button>
          </div>
          {cart.length <= 0 && (
            <div className="cart-empty">
              <h5 className="cart-empty-msg">You Cart is Empty.</h5>
            </div>
          )}
          {cart.map((product, idx) => (
            <CartItem
              key={`${product.id}_${idx}`}
              product={product}
              cart={cart}
              dispatch={dispatch}
            />
          ))}
        </div>
        <div className="cart-checkout">
          <div className="cart-total">
            <p className="cart-total-title">Subtotal:</p>
            <h2>
              {displayCurrency(
                calculateCartTotal(
                  cart.map((product) => product.price * product.quantity)
                )
              )}
            </h2>
          </div>
          <button
            className="cart-checkout-button button"
            disabled={cart.length === 0 || pathname === "/checkout"}
            onClick={onCheckout}
            type="button"
          >
            Checkout
          </button>
        </div>
      </div>
    </Boundary>
  );
};

export default Cart;
