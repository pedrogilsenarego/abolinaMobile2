import { Books } from "./books/books.types";
import { CartState } from "./cart/cart.types";
import { FavoritesState } from "./favorites/favorites.types";
import { GeneralState } from "./general/general.types";
import { HomeFiltersState } from "./homeFilters/homeFilters.types";
import { User } from "./user/user.types";

export interface State {
  general: GeneralState;
  books: Books;
  user: User;
  cart: CartState;
  homeFilters: HomeFiltersState;
  favorites: FavoritesState;
}
