import { userTypes } from "./user.types";

interface Shelf {
  title: string;
  books: any[]; // replace 'any[]' with the actual type of your books
}

interface User {
  shelfs: Shelf[];
  booksOwned: string[];
  booksRead:
    | {
        id: string;
        readPercentage: number;
      }[]
    | [];
}

interface State {
  currentUser: User;
  resetPasswordSuccess: boolean;
  userErr: any[];
  users: any[];
  cookiePolicy: boolean;
}

const INITIAL_STATE: State = {
  currentUser: { shelfs: [], booksRead: [], booksOwned: [] },
  resetPasswordSuccess: false,
  userErr: [],
  users: [],
  cookiePolicy: false,
};

interface Action {
  type: string;
  payload: any;
}

const userReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case userTypes.ACCEPT_COOKIE_POLICY:
      return {
        ...state,
        cookiePolicy: action.payload,
      };
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userErr: [],
      };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
      };
    case userTypes.USER_ERROR:
      return {
        ...state,
        userErr: action.payload,
      };
    case userTypes.SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.RESET_USER_STATE:
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case userTypes.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case userTypes.ADD_NEW_SHELF:
      const { title, books } = action.payload;
      const updatedShelfs = [...state.currentUser?.shelfs];

      const existingShelfIndex = updatedShelfs.findIndex(
        (shelf) => shelf.title === title
      );

      if (existingShelfIndex !== -1) {
        // Shelf with the given title already exists, replace it
        updatedShelfs[existingShelfIndex] = {
          title,
          books,
        };
      } else {
        // Shelf with the given title doesn't exist, add a new shelf
        updatedShelfs.push({
          title,
          books,
        });
      }

      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          shelfs: updatedShelfs,
        },
      };
    case userTypes.SET_BOOKS_READ:
      return {
        ...state,
        currentUser: { ...state.currentUser, booksRead: action.payload },
      };
    case userTypes.ADD_BOOK_OWNED:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          booksOwned: [...state.currentUser.booksOwned, ...action.payload],
        },
      };
    default:
      return state;
  }
};

export default userReducer;
