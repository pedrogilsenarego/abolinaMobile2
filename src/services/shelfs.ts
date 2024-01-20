import { firestore } from "../config/firebaseConfig";

export const addShelf = (
  name: string,
  userId: string,
  shelfs: { title: string; books: string[] }[] | [],
  listBooks: string[],
  newShelf: boolean
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Check if the shelf already exists
    if (shelfs.length > 0) {
      const existingShelf = shelfs.find((shelf) => shelf.title === name);
      if (existingShelf && newShelf) {
        reject("Shelf already exists");
        return;
      }
    }
    // Add the new shelf to the user's shelves
    const updatedShelfs = [...shelfs];
    const existingShelfIndex = updatedShelfs.findIndex(
      (shelf) => shelf.title === name
    );

    if (existingShelfIndex !== -1) {
      // Shelf with the given title already exists, replace it
      updatedShelfs[existingShelfIndex] = {
        title: name,
        books: listBooks,
      };
    } else {
      // Shelf with the given title doesn't exist, add a new shelf
      updatedShelfs.push({
        title: name,
        books: listBooks,
      });
    }

    // Update the user's shelves in the database
    const userRef = firestore.collection("users").doc(userId);
    userRef
      .update({
        shelfs: updatedShelfs,
      })
      .then(() => {
        resolve("Shelf added successfully");
      })
      .catch(() => {
        reject("Failed to add shelf");
      });
  });
};
