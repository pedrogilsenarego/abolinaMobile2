import firebase from "firebase/compat/app";
import { firestore } from "../config/firebaseConfig";
import { Book } from "../slicer/books/books.types";

export const fetchBooksOwned = (listBooks: string[]): Promise<Book[]> => {
  const bookRefs = listBooks.map((bookId) =>
    firestore.collection("books").doc(bookId)
  );

  console.log("Fetching owned books");
  return new Promise((resolve, reject) => {
    firestore
      .collection("books")
      .where(
        firebase.firestore.FieldPath.documentId(),
        "in",
        bookRefs.map((bookRef) => bookRef.id)
      )
      .onSnapshot((query) => {
        const list: Book[] = [];
        query.forEach((doc) => {
          list.push({ documentID: doc.id, ...doc.data() } as Book);
        });

        resolve(list);
      }, reject);
  });
};

export const checkCoupon = (coupon: string): Promise<Book> => {
  return new Promise((resolve, reject) => {
    // Check if the coupon exists in the "coupons" collection

    const couponRef = firestore.collection("cuppons").doc(coupon);
    couponRef
      .get()
      .then((couponDoc) => {
        if (!couponDoc || !couponDoc.exists) {
          reject("Coupon does not exist");
          return;
        }

        // Retrieve the idBook from the coupon document
        const idBook = couponDoc.data()?.bookId;
        fetchBooksOwned([idBook])
          .then((books) => {
            // Assuming fetchBooksOwned returns an array, get the first book
            const book = books[0];

            // Resolve with the book on success
            resolve(book);
          })
          .catch(reject);
      })
      .catch(() => {
        reject("Failed to retrieve coupon");
      });
  });
};

export const convertCoupons = (
  coupon: string,
  userId: string,
  booksOwnedM: string[]
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const booksOwned = booksOwnedM || [];
    // Check if the coupon exists in the "coupons" collection
    const couponRef = firestore.collection("cuppons").doc(coupon);
    couponRef
      .get()
      .then((couponDoc) => {
        if (!couponDoc || !couponDoc.exists) {
          reject("Coupon does not exist");
          return;
        }

        // Retrieve the idBook from the coupon document
        const idBook = couponDoc.data()?.bookId;
        const originalUser = couponDoc.data()?.userId;

        // Check if the book is already owned
        if (booksOwned.includes(idBook)) {
          reject("Book already owned");
          return;
        }

        // Delete the coupon document from the "coupons" collection
        couponRef
          .delete()
          .then(() => {
            // Remove the coupon ID from the user's "coupons" field
            const userRef = firestore.collection("users").doc(originalUser);
            userRef
              .get()
              .then((userDoc) => {
                if (userDoc.exists) {
                  let userCoupons = userDoc.data()?.coupons || [];

                  // Find the coupon with matching bookId and remove the couponId
                  userCoupons = userCoupons.map(
                    (couponData: { bookId: string; couponId: string[] }) => {
                      if (couponData.bookId === idBook) {
                        const updatedCouponId = couponData.couponId.filter(
                          (couponId: string) => couponId !== coupon
                        );
                        couponData.couponId = updatedCouponId;
                      }
                      return couponData;
                    }
                  );

                  // Remove the coupon data if there are no more coupons remaining
                  userCoupons = userCoupons.filter(
                    (couponData: { couponId: string[] }) =>
                      couponData.couponId.length > 0
                  );

                  userRef
                    .update({
                      coupons: userCoupons,
                    })
                    .then(() => {
                      // Add the idBook to the user's "booksOwned" field
                      const currentUserRef = firestore
                        .collection("users")
                        .doc(userId);
                      currentUserRef
                        .update({
                          booksOwned:
                            firebase.firestore.FieldValue.arrayUnion(idBook),
                        })
                        .then(() => {
                          resolve("Coupon converted successfully");
                        })
                        .catch(() => {
                          reject("Failed to update user list of books");
                        });
                    })
                    .catch(() => {
                      reject("Failed to update user coupons");
                    });
                } else {
                  reject("User does not exist");
                }
              })
              .catch(() => {
                reject("Failed to retrieve user");
              });
          })
          .catch(() => {
            reject("Failed to delete coupon");
          });
      })
      .catch(() => {
        reject("Failed to retrieve coupon");
      });
  });
};
