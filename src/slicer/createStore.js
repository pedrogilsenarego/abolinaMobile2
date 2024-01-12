import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import createSagaMiddle from "@redux-saga/core";
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

import rootSaga from "./rootSaga";
const sagaMiddleware = createSagaMiddle();

export const middlewares = [thunk, sagaMiddleware];

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
export const store = createStore(
  persistedReducer, // Use the persisted reducer
  composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// eslint-disable-next-line
export default {
  store,
  persistor,
};
