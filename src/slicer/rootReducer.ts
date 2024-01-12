import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import booksReducer from "./books/books.reducer";
import cartReducer from "./cart/cart.reducer";
import favoritesReducer from "./favorites/favorites.reducer";
import generalReducer from "./general/general.reducer";
import homeFiltersReducer from "./homeFilters/homeFilters.reducer";
import userReducer from "./user/user.reducer";

export const rootReducer = combineReducers({
  general: generalReducer,
  books: booksReducer,
  user: userReducer,
  cart: cartReducer,
  homeFilters: homeFiltersReducer,
  favorites: favoritesReducer,
});

const configStorage = {
  key: "root",
  storage: AsyncStorage,
};

export default persistReducer(configStorage, rootReducer);
