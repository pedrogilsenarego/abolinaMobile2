import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import DrawerAccordeon from "../../../components/DrawerAccordeon";
import TextField from "../../../components/Inputs/TextField";
import SideModalHeader from "../../../components/SideModalHeader";
import { Colors } from "../../../constants/pallete";
import { ROUTE_PATHS } from "../../../constants/routes";
import useMainColors from "../../../hooks/useMainColors";
import { addShelf } from "../../../services/shelfs";
import { State } from "../../../slicer/types";
import { addNewShelf } from "../../../slicer/user/user.actions";
import { CurrentUser } from "../../../slicer/user/user.types";
import useNewShelves from "./useNewShelves";
import { FORM_VALIDATION } from "./validationNewShelves";

interface FORM {
  shelfTitle: string;
}

interface Props {
  preLoadedBooks: string[];
}

const NewShelves = ({ preLoadedBooks }: Props) => {
  const [searchField, setSearchField] = useState<string | null>(null);
  const currentShelf = useSelector<State, string>(
    (state) => state.homeFilters.shelf
  );
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state.user.currentUser
  );

  const initialListBooks =
    currentShelf !== "Todos os meus livros"
      ? currentUser.shelfs.find((shelf) => shelf.title === currentShelf)
          ?.books || []
      : [];

  const { organizedBooks } = useNewShelves();

  const [listBooks, setListBooks] = useState<string[]>(
    preLoadedBooks.length > 0 ? preLoadedBooks : initialListBooks
  );

  const [resultAddShelf, setResultAddShelf] = useState<string | null>("");

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { backgroundColor, textColor } = useMainColors();
  const INITIAL_STATE_SEARCH = {
    search: "",
  };
  const INITIAL_STATE: FORM = {
    shelfTitle: currentShelf !== "Todos os  meus livros" ? currentShelf : "",
  };
  const handleListBooks = (value: string[], signal: boolean) => {
    if (signal) {
      setListBooks((prevListBooks) =>
        Array.from(new Set([...prevListBooks, ...value]))
      );
    } else {
      setListBooks((prevListBooks) =>
        prevListBooks.filter((item) => !value.includes(item))
      );
    }
  };

  const handleSubmit = async (title: string) => {
    try {
      const result = await addShelf(
        title,
        currentUser.id,
        currentUser.shelfs || [],
        listBooks,
        currentShelf === "Todos os  meus livros"
      );
      setResultAddShelf(result);
      dispatch(addNewShelf({ title, books: listBooks }));
      navigation.goBack();
    } catch (error: any) {
      setResultAddShelf(error as string);
    }
  };

  const searchFilteredBooks = () => {
    if (!organizedBooks) return [];
    if (!searchField) return organizedBooks;

    // Filter collections based on the title of books
    const filteredCollections = organizedBooks
      .map((collection) => ({
        ...collection,
        books: collection.books.filter((book) =>
          book.title.toLowerCase().includes(searchField.toLowerCase())
        ),
      }))
      .filter((collection) => collection.books.length > 0);

    return filteredCollections;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.blackish }}>
      <View style={{ backgroundColor, height: "100%" }}>
        <SideModalHeader
          title="Prateleiras"
          onBack={() => {
            // @ts-ignore
            navigation.navigate(ROUTE_PATHS.MAIN_HOME);
            setSearchField(null);
          }}
          icon={
            <Ionicons name={"library-outline"} size={24} color={Colors.tealc} />
          }
        />
        <Formik
          initialValues={{ ...INITIAL_STATE_SEARCH }}
          onSubmit={(values) => {}}
        >
          {(props) => (
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                marginTop: 15,
                paddingHorizontal: 20,
              }}
            >
              <View style={{ flex: 1, rowGap: 20, alignItems: "center" }}>
                <TextField
                  inputStyle={{ paddingVertical: 6, marginTop: -0 }}
                  name="search"
                  placeholder="Search in the books owned..."
                  onChange={(values: any) => setSearchField(values)}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  props.resetForm();
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
            </View>
          )}
        </Formik>
        <Formik
          initialValues={{ ...INITIAL_STATE }}
          onSubmit={(values) => handleSubmit(values.shelfTitle)}
          validationSchema={FORM_VALIDATION}
        >
          <View
            style={{
              marginTop: 20,
              marginLeft: 35,
              marginRight: 35,
              display: "flex",
              flexDirection: "column",

              rowGap: 10,
              flex: 1,
            }}
          >
            <View>
              <TextField
                variant="default"
                name="shelfTitle"
                placeholder={"Nome da nova prateleira"}
              />

              <View
                style={{
                  marginTop: 30,
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 20,
                }}
              >
                {searchFilteredBooks().map((collection) => {
                  const options = collection.books.map((book) => ({
                    name: book.title,
                    id: book.id,
                  }));

                  return (
                    <DrawerAccordeon
                      icon={
                        <Ionicons
                          name={"layers-outline"}
                          size={24}
                          color={textColor}
                        />
                      }
                      startOpen={
                        currentShelf !== "Todos os  meus livros" ? true : false
                      }
                      state={listBooks}
                      title={collection.name}
                      options={options}
                      onChecked={(value, signal) =>
                        handleListBooks(value, signal)
                      }
                    />
                  );
                })}
              </View>
            </View>
            <View
              style={{ width: "100%", alignItems: "center", marginTop: 30 }}
            >
              <Button
                fullwidth
                label={
                  currentShelf !== "Todos os  meus livros" &&
                  preLoadedBooks?.length <= 0
                    ? "Actualizar Prateleira"
                    : "Gravar nova prateleira"
                }
                formik
              />
            </View>
            <Text>{resultAddShelf}</Text>
          </View>
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default NewShelves;
