import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RoundCheckBox from "../../../components/Inputs/RoundCheckBox";
import { Colors } from "../../../constants/pallete";
import { ROUTE_PATHS } from "../../../constants/routes";
import { Book } from "../../../slicer/books/books.types";
import { setLastRead } from "../../../slicer/general/general.actions";
import {
  setEditMode,
  updateBooksSelected,
} from "../../../slicer/homeFilters/homeFilters.actions";
import { HomeFiltersState } from "../../../slicer/homeFilters/homeFilters.types";
import { State } from "../../../slicer/types";
import { CurrentUser } from "../../../slicer/user/user.types";

interface Props {
  product: Book;
  style?: object;
}

const Product = ({ product, style }: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const homeFilters = useSelector<State, HomeFiltersState>(
    (state) => state.homeFilters
  );
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state?.user?.currentUser
  );
  const booksRead = currentUser?.booksRead || [];
  const { editMode, shelf, booksSelected = [] } = homeFilters;

  const isBookRead = booksRead.some(
    (readBook) =>
      readBook.id === product.documentID && readBook.readPercentage === 100
  );

  return (
    <TouchableOpacity
      onLongPress={() => {
        if (shelf !== "Todos os  meus livros") dispatch(setEditMode("book"));
      }}
      onPress={() => {
        if (editMode === "book") {
          dispatch(updateBooksSelected(product.documentID));
          return;
        }
        dispatch(setLastRead(product.documentID));
        // @ts-ignore
        navigation.navigate(ROUTE_PATHS.BOOK_READER);
      }}
      style={[styles.container, style]}
    >
      {editMode === "book" && (
        <TouchableOpacity
          style={{ position: "absolute", left: 4, top: 4, zIndex: 1000 }}
        >
          <RoundCheckBox
            isChecked={booksSelected.includes(product.documentID)}
          />
        </TouchableOpacity>
      )}
      {isBookRead && (
        <View
          style={{
            position: "absolute",
            right: 3,
            bottom: 3,
            padding: 2,
            backgroundColor: Colors.tealc,
            borderRadius: 20,
            zIndex: 2,
          }}
        >
          <Ionicons
            style={{ marginLeft: 1, marginTop: 1 }}
            name={"book-outline"}
            size={12}
            color={"white"}
          />
        </View>
      )}
      <Image
        style={{
          width: "100%",
          aspectRatio: 1,
          opacity: editMode === "book" ? 0.5 : 1,
          borderRadius: 6,
        }}
        source={{ uri: product.coverPage[0].toString() }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "31%",
    alignItems: "center",
    margin: `${7 / 6}%`,
    padding: 0,
    position: "relative",
  },
});

export default Product;
