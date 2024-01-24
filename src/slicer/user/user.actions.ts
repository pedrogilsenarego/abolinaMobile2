import { BooksRead, userTypes } from "./user.types";

export const signInSuccess = (user: any) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START,
});

export const facebookSignInStart = () => ({
  type: userTypes.FACEBOOK_SIGN_IN_START,
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START,
});

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS,
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const signUpUserStart = (userCredentials: any) => ({
  type: userTypes.SIGN_UP_USER_START,
  payload: userCredentials,
});

export const emailSignInStart = (userCredentials: {
  email: string;
  password: string;
}) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const recoverPassword = (email: string) => ({
  type: userTypes.RECOVER_PASSWORD,
  payload: email,
});

export const addNewShelf = (shelf: { title: string; books: string[] }) => ({
  type: userTypes.ADD_NEW_SHELF,
  payload: shelf,
});

export const setUser = (currentUser: any) => ({
  type: userTypes.SET_USER,
  payload: currentUser,
});

export const setBooksRead = (updatedBooksRead: BooksRead[]) => ({
  type: userTypes.SET_BOOKS_READ,
  payload: updatedBooksRead,
});

export const addBookOwned = (bookId: string[]) => ({
  type: userTypes.ADD_BOOK_OWNED,
  payload: bookId,
});
