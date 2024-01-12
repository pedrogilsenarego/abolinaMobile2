import cartTypes, { HomeFiltersState } from "./homeFilters.types";

const INITIAL_STATE: HomeFiltersState = {
  order: "asc",
  filter: ["not-read", "read", "not-in-collection"],
  shelf: "Todos os  meus livros",
  editMode: "default",
  booksSelected: [],
  shopMode: "default",
  selectedCollection: {},
};

interface Action {
  type: string;
  payload: any;
}

const homeFiltersReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case cartTypes.SET_FILTER:
      const filterIndex = state.filter.indexOf(action.payload);

      if (filterIndex === -1) {
        // If the payload is not in the filter array, add it
        return {
          ...state,
          filter: [...state.filter, action.payload],
        };
      } else {
        // If the payload is already in the filter array, remove it
        const updatedFilter = [...state.filter];
        updatedFilter.splice(filterIndex, 1);

        return {
          ...state,
          filter: updatedFilter,
        };
      }
    case cartTypes.SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case cartTypes.CLEAR_FILTERS:
      return INITIAL_STATE;

    case cartTypes.SET_SHELF:
      return {
        ...state,
        shelf: action.payload,
      };
    case cartTypes.EDIT_MODE:
      return {
        ...state,
        editMode: action.payload,
      };
    case cartTypes.UPDATE_BOOKS_SELECTED:
      const bookToRemoveOrAdd = action.payload;

      // Check if the book is already in the array
      const isBookSelected = state.booksSelected.includes(bookToRemoveOrAdd);

      if (isBookSelected) {
        // If the book is already in the array, remove it
        const updatedBooksSelected = state.booksSelected.filter(
          (book) => book !== bookToRemoveOrAdd
        );

        return {
          ...state,
          booksSelected: updatedBooksSelected,
        };
      } else {
        // If the book is not in the array, add it
        const updatedBooksSelected = [
          ...state.booksSelected,
          bookToRemoveOrAdd,
        ];

        return {
          ...state,
          booksSelected: updatedBooksSelected,
        };
      }

    case cartTypes.CLEAN_BOOKS_UPDATED:
      return {
        ...state,
        booksSelected: [],
      };
    case cartTypes.SET_SHOP_MODE:
      return {
        ...state,
        shopMode: action.payload,
      };
    case cartTypes.SET_PAGE_COLLECTION:
      return {
        ...state,
        selectedCollection: action.payload,
      };
    default:
      return state;
  }
};

export default homeFiltersReducer;
