import { Book } from "../books/books.types";
import favoritesTypes from "./favorites.types";

export const addProductToFavorites = (product: Book[]) => ({
  type: favoritesTypes.ADD_PRODUCT_TO_FAVORITES,
  payload: product,
});

export const deleteProductFavorites = (id: string) => ({
  type: favoritesTypes.DELETE_FAVORITE,
  payload: id,
});

export const clearFavorites = () => ({
  type: favoritesTypes.CLEAR_FAVORITES,
});

export const notificationsToggle = (itemId: string, signal: boolean) => ({
  type: favoritesTypes.NOTIFICATION_FAVORITE,
  payload: { itemId, signal },
});
