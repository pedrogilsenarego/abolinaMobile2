import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/pallete";
import Filter from "./Filter";

import { useNavigation } from "@react-navigation/native";

import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import DrawerPopup from "../../../components/DrawerPopup";
import TextField from "../../../components/Inputs/TextField";
import { ROUTE_PATHS } from "../../../constants/routes";
import { addShelf } from "../../../services/shelfs";
import {
  updateAddBooksRead,
  updateRemoveBooksRead,
} from "../../../services/user";
import {
  cleanUpdatedBooks,
  setEditMode,
  setShelf,
} from "../../../slicer/homeFilters/homeFilters.actions";
import { State } from "../../../slicer/types";
import { addNewShelf, setBooksRead } from "../../../slicer/user/user.actions";
import { CurrentUser } from "../../../slicer/user/user.types";
import ShelvesNew from "./ShelvesNew";

type Props = {
  setSearchField: (searchField: string | null) => void;
};

const TopBar = ({ setSearchField }: Props) => {
  const navigation = useNavigation();
  const barRef = useRef(null);
  const dispatch = useDispatch();
  const horizontalPadding = 15;
  const editMode = useSelector<State, "default" | "book" | "shelf" | "search">(
    (state) => state.homeFilters.editMode || "default"
  );

  const currentUser = useSelector<State, CurrentUser>(
    (state) => state.user.currentUser
  );
  const currentShelf = useSelector<State, string>(
    (state) => state.homeFilters.shelf
  );
  const booksSelected = useSelector<State, string[]>(
    (state) => state.homeFilters.booksSelected
  );

  const handleDeleteBooks = async () => {
    try {
      const selectedShelf = currentUser.shelfs.find(
        (shelf) => shelf.title === currentShelf
      );

      if (selectedShelf) {
        const filteredBooks = selectedShelf.books.filter(
          (book) => !booksSelected.includes(book)
        );

        // Update the shelf with the filtered books

        const result = await addShelf(
          currentShelf,
          currentUser.id,
          currentUser.shelfs || [],
          filteredBooks,
          currentShelf === "Todos os  meus livros"
        );

        dispatch(addNewShelf({ title: currentShelf, books: filteredBooks }));
        dispatch(setEditMode("default"));
        dispatch(cleanUpdatedBooks());
      }
    } catch (error: any) {}
  };

  const booksRead = currentUser?.booksRead || [];

  const handleSetReadBooks = async () => {
    const areAllBooksSelectedRead = booksSelected.every((selectedBook) =>
      booksRead.some((readBook) => readBook.id === selectedBook)
    );
    try {
      if (areAllBooksSelectedRead) {
        const updatedBooksRead = await updateRemoveBooksRead(
          currentUser.id,
          booksSelected
        );
        dispatch(setBooksRead(updatedBooksRead));
      } else {
        const updatedBooksRead = await updateAddBooksRead(
          currentUser.id,
          booksSelected
        );
        dispatch(setBooksRead(updatedBooksRead));
        dispatch(cleanUpdatedBooks());
      }
    } catch (error) {
      console.error("Failed to update books", error);
    } finally {
      dispatch(setEditMode("default"));
    }
  };

  const [openSide, setOpenSide] = useState<boolean>(false);

  const Default = () => {
    return (
      <View
        ref={barRef}
        style={{
          backgroundColor: Colors.tealc,
          paddingHorizontal: horizontalPadding,
          height: 55,
          display: "flex",
          flexDirection: "row",

          justifyContent: "space-between",
        }}
      >
        {/* <TouchableOpacity
          onPress={
            // @ts-ignore
            () => navigation.navigate(ROUTE_PATHS.SHELVES)
          }
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name={"library-outline"}
            size={24}
            color={"white"}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={
            // @ts-ignore
            () => setOpenSide(true)
          }
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name={"library-outline"}
            size={24}
            color={"white"}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
          }}
        >
          <TouchableOpacity onPress={() => dispatch(setEditMode("search"))}>
            <Ionicons name={"search"} size={24} color={"white"} />
          </TouchableOpacity>
          <Filter />
          <DrawerPopup
            openModal={openSide}
            onClose={() => setOpenSide(false)}
            barRef={barRef}
          >
            <ShelvesNew setOpenSide={setOpenSide} />
          </DrawerPopup>
        </View>
      </View>
    );
  };
  const Book = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.darkGrey,
          paddingHorizontal: horizontalPadding,
          height: 55,
          display: "flex",
          flexDirection: "row",

          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            dispatch(setEditMode("default"));
            dispatch(cleanUpdatedBooks());
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name={"close-outline"} size={32} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeleteBooks}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name={"trash-outline"} size={24} color={"white"} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSetReadBooks}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name={"book-outline"} size={24} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(setShelf("Todos os  meus livros"));
            // @ts-ignore
            navigation.navigate(ROUTE_PATHS.SHELVES_CONFIG, {
              preLoadedBooks: [...booksSelected],
            });
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 5,
          }}
        >
          <Ionicons name={"add-circle-outline"} size={24} color={"white"} />
        </TouchableOpacity>
      </View>
    );
  };
  const Shelf = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.tealc,
          paddingHorizontal: horizontalPadding,
          paddingVertical: 20,
          display: "flex",
          flexDirection: "row",

          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => dispatch(setEditMode("default"))}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name={"close-outline"} size={32} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name={"trash-outline"} size={24} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name={"image-outline"} size={24} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name={"moon-outline"} size={24} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(setShelf("Todos os  meus livros"));
            // @ts-ignore
            navigation.navigate(ROUTE_PATHS.SHELVES_CONFIG);
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name={"add-circle-outline"} size={24} color={"white"} />
        </TouchableOpacity>
      </View>
    );
  };

  const Search = () => {
    const INITIAL_STATE = {
      search: "",
    };
    return (
      <View
        style={{
          backgroundColor: Colors.tealc,
          paddingHorizontal: horizontalPadding,
          height: 55,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              dispatch(setEditMode("default"));
              setSearchField(null);
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name={"close-outline"} size={32} color={"white"} />
          </TouchableOpacity>
          <Formik
            initialValues={{ ...INITIAL_STATE }}
            onSubmit={(values) => {}}
          >
            {(props) => (
              <View style={{ flex: 1, marginRight: 6 }}>
                <TextField
                  inputStyle={{ paddingVertical: 6, marginTop: 0 }}
                  name="search"
                  placeholder="Search in the shelf..."
                  onChange={(values: any) => setSearchField(values)}
                />
              </View>
            )}
          </Formik>
        </View>
      </View>
    );
  };

  if (editMode === "default") return Default();
  if (editMode === "book") return Book();
  if (editMode === "shelf") return Shelf();
  if (editMode === "search") return Search();
};

export default TopBar;
