import { applyMiddleware, compose, configureStore } from "@reduxjs/toolkit";
import { persistCombineReducers, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../Reducers";
import rootSaga from "../Sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const authPersistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "profile", "cart", "checkout"],
};

export default () => {
  const store = configureStore(
    persistCombineReducers(authPersistConfig, rootReducer),
    composeEnhancer(applyMiddleware(sagaMiddleware))
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};
