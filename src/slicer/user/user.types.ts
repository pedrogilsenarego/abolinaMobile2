export const userTypes = {
  ACCEPT_COOKIE_POLICY: "ACCEPT_COOKIE_POLICY",
  EMAIL_SIGN_IN_START: "EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  CHECK_USER_SESSION: "CHECK_USER_SESSION",
  SIGN_OUT_USER_START: "SIGN_OUT_USER_START",
  SIGN_OUT_USER_SUCCESS: "SIGN_OUT_USER_SUCCESS",
  SIGN_UP_USER_START: "SIGN_UP_USER_START",
  RESET_PASSWORD_START: "RESET_PASSWORD_START",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  GOOGLE_SIGN_IN_START: "GOOGLE_SIGN_IN_START",
  FACEBOOK_SIGN_IN_START: "FACEBOOK_SIGN_IN_START",
  USER_ERROR: "USER_ERROR",
  RESET_USER_STATE: "RESET_USER_STATE",
  FETCH_USERS_START: "FETCH_USERS_START",
  SET_USERS: "SET_USERS",
  SET_PREFERENCES: "SET_PREFERENCES",
  SET_USER: "SET_USER",
  RECOVER_PASSWORD: "RECOVER_PASSWORD",
  //Shelfs
  ADD_NEW_SHELF: "ADD_NEW_SHELF",
  SET_BOOKS_READ: "SET_BOOKS_READ",
  ADD_BOOK_OWNED: "ADD_BOOK_OWNED",
};

export interface User {
  currentUser: CurrentUser;
}

export interface InvoiceSettings {
  name: string;
  surname: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  taxId: string;
}

export interface Coupons {
  bookId: string;
  couponId: string[];
  title: string;
}

export type BooksRead = {
  id: string;
  readPercentage: number;
};

export interface CurrentUser {
  id: string;
  email: string;
  userRoles: string[];
  displayName: string;
  invoiceSettings: InvoiceSettings;
  booksOwned: string[];
  booksRead: BooksRead[];
  shelfs: {
    title: string;
    books: string[];
  }[];
  coupons: Coupons[];
}
