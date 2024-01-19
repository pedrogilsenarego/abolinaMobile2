import { useSelector } from "react-redux";
import { State } from "../../../slicer/types";
import { CurrentUser } from "../../../slicer/user/user.types";

const useShelves = () => {
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state.user.currentUser
  );
  const shelves = currentUser.shelfs || [];
  const currentShelf = useSelector<State, string>(
    (state) => state.homeFilters.shelf
  );
  return { shelves, currentShelf };
};

export default useShelves;
