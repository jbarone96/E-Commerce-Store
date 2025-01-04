import { displayToast } from "@/Helpers/utility";
import { useDispatch, useSelector } from "react-redux";
// import {addToCart as dispatchAddToCart, removeFromCart} from "@/redux/actions/basketActions"

const useCart = () => {
  const { cart } = useSelector((state) => ({ cart: state.cart }));
  const dispatch = useDispatch();

  const isItemInCart = (id) => !!cart.find((item) => item.id === id);

  const addToCart = (product) => {
    if (isItemInCart(product.id)) {
      dispatch(removeFromCart(product.id));
      displayToast("Item removed from cart.", "info");
    } else {
      dispatch(dispatchAddToCart(product));
      displayToast("Item added to cart!", "success");
    }
  };

  return { cart, isItemInCart, addToCart };
};

export default useCart;
