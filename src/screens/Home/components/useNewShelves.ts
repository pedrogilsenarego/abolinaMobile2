import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { fetchBooksOwned } from "../../../services/books";
import { Book } from "../../../slicer/books/books.types";
import { State } from "../../../slicer/types";
import { CurrentUser } from "../../../slicer/user/user.types";
import { organizeBooks } from "../../../utils/utilsBooks";

const useNewShelves = () => {
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state?.user?.currentUser
  );

  const listBooksOwned = currentUser?.booksOwned || [];

  const {
    data: books,
    isLoading: loadingBooks,
    error: errorBooks,
  } = useQuery<Book[]>("booksOwned", () => fetchBooksOwned(listBooksOwned), {
    enabled: listBooksOwned.length > 0,
  });

  const organizedBooks = organizeBooks(books || []);

  return { organizedBooks };
};

export default useNewShelves;
