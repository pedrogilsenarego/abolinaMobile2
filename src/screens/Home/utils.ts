import { Book } from "../../slicer/books/books.types";
import {
  HomeFilters,
  HomeOrder,
} from "../../slicer/homeFilters/homeFilters.types";
import { BooksRead } from "../../slicer/user/user.types";

export const filterBooks = (
  listBooks: Book[],
  filters: HomeFilters[],
  booksRead: BooksRead[]
) => {
  const finalList: Book[] = [];

  if (filters.includes("read")) {
    listBooks.forEach((book) => {
      const bookRead = booksRead?.find((read) => read.id === book.documentID);
      if (bookRead && bookRead.readPercentage === 100) {
        finalList.push(book);
      }
    });
  }

  if (filters.includes("not-read")) {
    listBooks.forEach((book) => {
      const bookRead = booksRead.find((read) => read.id === book.documentID);
      if (!bookRead) {
        finalList.push(book);
      } else if (bookRead.readPercentage === 0) {
        finalList.push(book);
      }
    });
  }
  if (filters.includes("not-in-collection")) {
    const uniqueNotInCollectionBooks = listBooks.filter((book) => {
      const isInReadList = booksRead.some(
        (read) => read.id === book.documentID
      );
      const isInNotReadList = finalList.some(
        (finalBook) => finalBook.documentID === book.documentID
      );
      return !book.collections && !isInReadList && !isInNotReadList;
    });

    finalList.push(...uniqueNotInCollectionBooks);
  }
  return finalList;
};

export const orderedBooks = (listBooks: Book[], order: HomeOrder) => {
  if (order === "asc") {
    return listBooks.slice().sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  } else if (order === "desc") {
    return listBooks.slice().sort((a, b) => {
      return b.title.localeCompare(a.title);
    });
  } else {
    return listBooks.slice();
  }
};
