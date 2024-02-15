import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  setHomeFilter,
  setHomeOrder,
} from "../../../slicer/homeFilters/homeFilters.actions";
import {
  HomeFilters,
  HomeFiltersState,
  HomeOrder,
} from "../../../slicer/homeFilters/homeFilters.types";
import { State } from "../../../slicer/types";

const useFilter = () => {
  const dispatch = useDispatch();
  const homeFilters = useSelector<State, HomeFiltersState>(
    (state) => state.homeFilters
  );

  const handleSetOrder = (id: HomeOrder) => {
    dispatch(setHomeOrder(id));
  };
  const handleAddFilter = (id: HomeFilters) => {
    if (id === "todos") {
      if (homeFilters.filter.includes("todos")) {
        dispatch(setHomeFilter("todos"));
        if (homeFilters.filter.includes("read"))
          dispatch(setHomeFilter("read"));
        if (homeFilters.filter.includes("not-read"))
          dispatch(setHomeFilter("not-read"));
        if (homeFilters.filter.includes("not-in-collection"))
          dispatch(setHomeFilter("not-in-collection"));
      } else {
        dispatch(setHomeFilter("todos"));
        if (!homeFilters.filter.includes("read"))
          dispatch(setHomeFilter("read"));
        if (!homeFilters.filter.includes("not-read"))
          dispatch(setHomeFilter("not-read"));
        if (!homeFilters.filter.includes("not-in-collection"))
          dispatch(setHomeFilter("not-in-collection"));
      }
    } else dispatch(setHomeFilter(id));
  };
  const handleClearFilters = () => dispatch(clearFilters());

  return { handleAddFilter, homeFilters, handleSetOrder, handleClearFilters };
};

export default useFilter;
