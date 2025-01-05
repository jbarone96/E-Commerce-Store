import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";
import filterReducer from "./filterReducer";
import miscReducer from "./miscReducer";
import productReducer from "./productReducer";
import profileReducer from "./profileReducer";
import userReducer from "./userReducer";

const rootReducer = {
  products: productReducer,
  cart: cartReducer,
  auth: authReducer,
  profile: productReducer,
  filter: filterReducer,
  users: userReducer,
  checkout: checkoutReducer,
  app: miscReducer,
};

export default rootReducer;
