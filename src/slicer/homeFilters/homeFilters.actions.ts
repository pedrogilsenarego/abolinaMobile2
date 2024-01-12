import homeFiltersTypes, {
  HomeFilters,
  HomeOrder,
  ShopMode,
} from "./homeFilters.types";

export const setHomeFilter = (filter: HomeFilters) => ({
  type: homeFiltersTypes.SET_FILTER,
  payload: filter,
});

export const setHomeOrder = (filter: HomeOrder) => ({
  type: homeFiltersTypes.SET_ORDER,
  payload: filter,
});

export const clearFilters = () => ({
  type: homeFiltersTypes.CLEAR_FILTERS,
});

export const setShelf = (title: string) => ({
  type: homeFiltersTypes.SET_SHELF,
  payload: title,
});

export const setEditMode = (
  value: "default" | "book" | "shelf" | "search"
) => ({
  type: homeFiltersTypes.EDIT_MODE,
  payload: value,
});

export const setShopMode = (value: ShopMode) => ({
  type: homeFiltersTypes.SET_SHOP_MODE,
  payload: value,
});

export const updateBooksSelected = (books: string) => ({
  type: homeFiltersTypes.UPDATE_BOOKS_SELECTED,
  payload: books,
});

export const cleanUpdatedBooks = () => ({
  type: homeFiltersTypes.CLEAN_BOOKS_UPDATED,
});

export const setPageCollection = (collection: any) => ({
  type: homeFiltersTypes.SET_PAGE_COLLECTION,
  payload: collection,
});
