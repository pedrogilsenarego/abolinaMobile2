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

export const removeShelf = (
  userId: string,
  shelfTitle: string
): Promise<{ message: string; user?: any }> => {
  return new Promise((resolve, reject) => {
    const userRef = firestore.collection("users").doc(userId);

    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          if (userData && userData.shelfs) {
            const updatedShelfs = userData.shelfs.filter(
              (shelf: any) => shelf.title !== shelfTitle
            );

            // Update the user's shelves in the database
            userRef
              .update({
                shelfs: updatedShelfs,
              })
              .then(() => {
                const updatedUser = {
                  ...userData,
                  shelfs: updatedShelfs,
                  id: userId,
                };
                resolve({
                  message: "Shelf removed successfully",
                  user: updatedUser,
                });
              })
              .catch(() => {
                reject({ message: "Failed to remove shelf" });
              });
          } else {
            reject({ message: "User data or shelves not found" });
          }
        } else {
          reject({ message: "User not found" });
        }
      })
      .catch(() => {
        reject({ message: "Failed to fetch user data" });
      });
  });
};

export const updateShelf = (
  newName: string,
  userId: string,
  listBooks: string[],
  currentShelf: string
): Promise<{ message: string; user?: any }> => {
  return new Promise((resolve, reject) => {
    const userRef = firestore.collection("users").doc(userId);

    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          if (userData && userData.shelfs) {
            const updatedShelfs = userData.shelfs.map((shelf: any) =>
              shelf.title === currentShelf
                ? { ...shelf, title: newName, books: listBooks }
                : shelf
            );

            // Update the user's shelves in the database
            userRef
              .update({
                shelfs: updatedShelfs,
              })
              .then(() => {
                const updatedUser = {
                  ...userData,
                  shelfs: updatedShelfs,
                  id: userId,
                };
                resolve({
                  message: "Shelf updated successfully",
                  user: updatedUser,
                });
              })
              .catch(() => {
                reject({ message: "Failed to update shelf" });
              });
          } else {
            reject({ message: "User data or shelves not found" });
          }
        } else {
          reject({ message: "User not found" });
        }
      })
      .catch(() => {
        reject({ message: "Failed to fetch user data" });
      });
  });
};
