import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../constants/pallete";
import { ROUTE_PATHS } from "../../../constants/routes";
import useMainColors from "../../../hooks/useMainColors";
import Product from "../../../screens/Home/components/Product";
import { Book } from "../../../slicer/books/books.types";

type Props = {
  itemx: { title: string; books: string[] };
  filteredBooks: Book[];
};

const SlideItem = ({ itemx, filteredBooks }: Props) => {
  const { width, height } = Dimensions.get("screen");
  const { textColor, backgroundColor } = useMainColors();
  const booksShelf = filteredBooks.filter((book) =>
    itemx.books.includes(book.documentID)
  );
  const navigation = useNavigation();

  const EndButton = () => {
    return (
      <TouchableOpacity
        // @ts-ignore
        onPress={() => navigation.navigate(ROUTE_PATHS.SHELVES_CONFIG)}
        style={{
          borderColor: Colors.grey,
          borderWidth: 2,
          display: "flex",
          width: "31%",
          aspectRatio: 1,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 6,
          margin: `${7 / 6}%`,
          padding: 0,
        }}
      >
        <Ionicons name={"add-circle-outline"} size={36} color={Colors.grey} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ marginTop: 15, width, height, paddingHorizontal: 20 }}>
      <Text
        style={{
          marginLeft: 5,
          textDecorationLine: "underline",
          fontSize: 20,
          marginBottom: 15,
          color: textColor,
        }}
      >
        {itemx.title}
      </Text>

      <FlatList
        numColumns={3}
        keyExtractor={(it, index) => index.toString()}
        data={[...booksShelf, "add"] || []}
        renderItem={({ item }) => {
          if (item === "add") {
            if (itemx.title === "Todos os  meus livros") return <></>;
            return <EndButton />;
          }
          return <Product product={item as Book} />;
        }}
      />
    </View>
  );
};

export default SlideItem;
