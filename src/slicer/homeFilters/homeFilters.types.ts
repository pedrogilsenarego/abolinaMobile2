export const homeFiltersTypes = {
  SET_ORDER: "SET_ORDER",
  SET_FILTER: "SET_FILTER",
  CLEAR_FILTERS: "CLEAR_FILTERS",
  SET_SHELF: "SET_SHELF",
  EDIT_MODE: "EDIT_MODE",
  UPDATE_BOOKS_SELECTED: "UPDATE_BOOKS_SELECTED",
  CLEAN_BOOKS_UPDATED: "CLEAN_BOOKS_UPDATED",
  SET_SHOP_MODE: "SET_SHOP_MODE",
  SET_PAGE_COLLECTION: "SET_PAGE_COLLECTION",
};

export type HomeFilters = "read" | "not-read" | "not-in-collection";
export type HomeOrder = "asc" | "desc";

export type EditMode = "default" | "book" | "shelf" | "search";
export type ShopMode = "default" | "collections" | "pageCollection" | "search";

export interface HomeFiltersState {
  order: HomeOrder;
  filter: HomeFilters[];
  shelf: string | "allBooks";
  editMode: EditMode;
  booksSelected: string[];
  shopMode: ShopMode;
  selectedCollection: any;
}

export default homeFiltersTypes;
