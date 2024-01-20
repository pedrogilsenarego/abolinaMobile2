import { auth, firestore } from "../config/firebaseConfig";
import { store } from "../slicer/createStore";

interface BookUpdate {
  id: string;
  readPercentage: number;
}

export const updateAddBooksRead = (
  userId: string,
  bookIdsToUpdate: string[]
): Promise<BookUpdate[]> => {
  return new Promise((resolve, reject) => {
    // Update the user's booksRead in the database
    const userRef = firestore.collection("users").doc(userId);

    // Get the current booksRead array
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const currentBooksRead = doc.data()?.booksRead || [];

          // Filter out existing entries with the same book IDs
          const filteredBookIds = bookIdsToUpdate.filter(
            (id) => !currentBooksRead.some((book: BookUpdate) => book.id === id)
          );

          // Update booksRead with specified book IDs and set read percentage to 100
          const updatedBooksRead = [
            ...currentBooksRead,
            ...filteredBookIds.map((id) => ({ id, readPercentage: 100 })),
          ];

          // Update the user's booksRead in the database
          userRef
            .update({
              booksRead: updatedBooksRead,
            })
            .then(() => {
              resolve(updatedBooksRead);
            })
            .catch(() => {
              reject("Failed to update booksRead");
            });
        } else {
          reject("User not found");
        }
      })
      .catch(() => {
        reject("Failed to fetch user data");
      });
  });
};

export const updateRemoveBooksRead = (
  userId: string,
  bookIdsToRemove: string[]
): Promise<BookUpdate[]> => {
  return new Promise((resolve, reject) => {
    // Update the user's booksRead in the database
    const userRef = firestore.collection("users").doc(userId);

    // Get the current booksRead array
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const currentBooksRead = doc.data()?.booksRead || [];

          // Filter out the books to be removed
          const updatedBooksRead = currentBooksRead.filter(
            (existingBook: BookUpdate) =>
              !bookIdsToRemove.includes(existingBook.id)
          );

          // Update the user's booksRead in the database
          userRef
            .update({
              booksRead: updatedBooksRead,
            })
            .then(() => {
              resolve(updatedBooksRead);
            })
            .catch(() => {
              reject("Failed to update booksRead");
            });
        } else {
          reject("User not found");
        }
      })
      .catch(() => {
        reject("Failed to fetch user data");
      });
  });
};

export const signOut = () => {
  auth.signOut();
};
