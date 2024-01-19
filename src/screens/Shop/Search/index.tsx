import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import TextField from "../../../components/Inputs/TextField";
import SideModalHeader from "../../../components/SideModalHeader";
import { Colors } from "../../../constants/pallete";
import { ROUTE_PATHS } from "../../../constants/routes";
import useMainColors from "../../../hooks/useMainColors";
import { Book } from "../../../slicer/books/books.types";
import SearchProduct from "../components/SearchProduct";

type Props = {
  books: Book[];
};

const Search = ({ books }: Props) => {
  const { backgroundColor, barStyle } = useMainColors();
  const [searchField, setSearchField] = useState<string | null>(null);
  const navigation = useNavigation();
  const INITIAL_STATE = {
    search: "",
  };
  const searchFilteredBooks = () => {
    if (!books) return;
    if (!searchField) return books;
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchField.toLowerCase())
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.blackish }}>
      <StatusBar barStyle={barStyle as any} />
      <View style={{ height: "100%", backgroundColor }}>
        <SideModalHeader
          title="Search"
          onBack={() => {
            // @ts-ignore
            navigation.navigate(ROUTE_PATHS.SHOP);
            setSearchField(null);
          }}
          icon={
            <Ionicons
              name={"search-outline"}
              size={24}
              color={Colors.tealc}
              style={{ marginRight: 5 }}
            />
          }
        />
        <View
          style={{
            backgroundColor: Colors.darkGrey,
            paddingHorizontal: 25,
            height: 55,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Formik
              initialValues={{ ...INITIAL_STATE }}
              onSubmit={(values) => {}}
            >
              {(props) => (
                <View style={{ flexDirection: "row", width: "100%" }}>
                  <View style={{ flex: 1, rowGap: 20, alignItems: "center" }}>
                    <TextField
                      inputStyle={{ paddingVertical: 6, marginTop: -0 }}
                      name="search"
                      placeholder="Search in the shop..."
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
                    <Ionicons
                      name={"close-outline"}
                      size={32}
                      color={"white"}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
        <FlatList
          numColumns={1}
          style={{ paddingTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
          data={searchFilteredBooks()}
          renderItem={({ item }) => <SearchProduct product={item} />}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

export default Search;
