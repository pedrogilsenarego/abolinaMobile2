import { useDispatch, useSelector } from "react-redux";
import { Book } from "../../slicer/books/books.types";
import { State } from "../../slicer/types";

import {
  HomeFilters,
  HomeFiltersState,
} from "../../slicer/homeFilters/homeFilters.types";
import { CurrentUser } from "../../slicer/user/user.types";

type Props = {
  filteredBooks: Book[];
};

const useSlider = ({ filteredBooks }: Props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state?.user?.currentUser
  );

  const allBooksShelf = {
    title: "Todos os  meus livros",
    books: filteredBooks.map((books) => books.documentID),
  };

  const shelfs = currentUser?.shelfs;

  const homeFilters = useSelector<State, HomeFiltersState>(
    (state) => state.homeFilters
  );

  const { shelf, editMode } = homeFilters;

  homeFilters;
  return { shelfs, shelf, allBooksShelf, editMode };
};

export default useSlider;
