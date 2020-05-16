import rootReducer from "./reducer";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

let middlewares = [];
const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    ...rootReducer
  })
);

middlewares = middlewares.concat(thunk);

if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middlewares = middlewares.concat(logger);
}

export default () => {
  const store = createStore(persistedReducer, applyMiddleware(...middlewares));
  let persistor = persistStore(store);
  return { store, persistor };
};
