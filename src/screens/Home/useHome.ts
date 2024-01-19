import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooksOwned } from "../../services/books";
import { Book } from "../../slicer/books/books.types";
import { HomeFiltersState } from "../../slicer/homeFilters/homeFilters.types";
import { State } from "../../slicer/types";

import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  cleanUpdatedBooks,
  setEditMode,
} from "../../slicer/homeFilters/homeFilters.actions";
import { CurrentUser } from "../../slicer/user/user.types";
import { filterBooks, orderedBooks } from "./utils";

const useHome = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [searchField, setSearchField] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state?.user?.currentUser
  );
  const homeFilters = useSelector<State, HomeFiltersState>(
    (state) => state.homeFilters
  );

  const lastRead = useSelector<State, string | null>(
    (state) => state.general.lastRead
  );

  const { filter, order, shelf } = homeFilters;

  const listBooksOwned = currentUser?.booksOwned || [];
  const booksRead = currentUser?.booksRead || [];

  const {
    data: books,
    isLoading: loadingBooks,
    error: errorBooks,
    refetch,
  } = useQuery<Book[]>("booksOwned", () => fetchBooksOwned(listBooksOwned), {
    enabled: listBooksOwned.length > 0,
  });

  useEffect(() => {
    if (!isFocused) {
      dispatch(setEditMode("default"));
      dispatch(cleanUpdatedBooks());
      setSearchField(null);
    } else refetch();
  }, [isFocused]);

  const filteredBooks = () => {
    if (books) {
      let initialBooks = [...books];

      if (filter) {
        initialBooks = filterBooks(initialBooks, filter, booksRead);
      }

      if (order) initialBooks = orderedBooks(initialBooks, order);

      // Check if lastRead exists in filteredBooks
      const lastReadBook = initialBooks.find(
        (book) => book.documentID === lastRead
      );

      if (lastReadBook) {
        // Remove the found book from its current position
        initialBooks = initialBooks.filter(
          (book) => book.documentID !== lastRead
        );

        // Prepend the found book to the first position
        initialBooks = [lastReadBook, ...initialBooks];
      }

      if (searchField) {
        // Filter books based on the searchField in the title
        initialBooks = initialBooks.filter((book) =>
          book.title.toLowerCase().includes(searchField.toLowerCase())
        );
      }

      return initialBooks;
    }

    return [];
  };

  return {
    shelf,
    listBooksOwned,
    filteredBooks,
    setSearchField,
    currentIndex,
    setCurrentIndex,
  };
};

export default useHome;
