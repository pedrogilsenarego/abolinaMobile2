import { QueryFunction, QueryKey } from "react-query";
import { firestore } from "../config/firebaseConfig";
import { IDigitalBook } from "../types/digitalBook";

export const fetchDigitalBook: QueryFunction<any, QueryKey> = async ({
  queryKey,
}) => {
  const documentID = queryKey[1] as string;

  try {
    console.log(`fetching book ${documentID}`);
    const data = await handleFetchDigitalBook(documentID);
    return data;
  } catch (error) {
    // Handle the error or throw it to be caught by React Query's error handling
    throw error;
  }
};

export const handleFetchDigitalBook = (
  documentID: string
): Promise<IDigitalBook> => {
  console.log(`Fetching ${documentID} book`);
  return new Promise<IDigitalBook>((resolve, reject) => {
    firestore
      .collection("digitalBooks")
      .doc(documentID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve(snapshot.data() as IDigitalBook);
        } else {
          reject(new Error("Digital book does not exist"));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
