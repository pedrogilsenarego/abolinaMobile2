import favoritesTypes, { FavoritesState } from "./favorites.types";
import { handleAddToCart } from "./favorites.utils";

const INITIAL_STATE: FavoritesState = {
  favoritesItems: [],
};

interface Action {
  type: string;
  payload: any;
}

const favoritesReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case favoritesTypes.ADD_PRODUCT_TO_FAVORITES:
      return {
        ...state,
        favoritesItems: handleAddToCart({
          prevCartItems: state.favoritesItems,
          nextCartItems: action.payload,
        }),
      };
    case favoritesTypes.DELETE_FAVORITE:
      return {
        ...state,
        favoritesItems: state.favoritesItems.filter(
          (item, id) => item.product.documentID !== action.payload
        ),
      };

    case favoritesTypes.NOTIFICATION_FAVORITE:
      const { itemId, signal } = action.payload;
      return {
        ...state,
        favoritesItems: state.favoritesItems.map((item) => {
          if (item.product.documentID === itemId) {
            return {
              ...item,
              notifications: signal,
            };
          }
          return item;
        }),
      };

    case favoritesTypes.CLEAR_FAVORITES:
      return {
        ...state,
        favoritesItems: [],
      };

    default:
      return state;
  }
};

export default favoritesReducer;
