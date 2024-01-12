import { Book } from "../books/books.types";

export const favoritesTypes = {
  ADD_PRODUCT_TO_FAVORITES: "ADD_PRODUCT_TO_FAVORITES",
  CLEAR_FAVORITES: "CLEAR_FAVORITES",
  DELETE_FAVORITE: "DELETE_FAVORITE",
  NOTIFICATION_FAVORITE: "NOTIFICATION_FAVORITE",
};

export interface FavoritesProduct {
  product: Book;
  notifications: boolean;
}

export interface FavoritesState {
  favoritesItems: FavoritesProduct[];
}

export default favoritesTypes;
