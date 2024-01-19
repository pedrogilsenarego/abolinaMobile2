import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "../../../../constants/pallete";
import { ROUTE_PATHS } from "../../../../constants/routes";
import useMainColors from "../../../../hooks/useMainColors";
import { Book } from "../../../../slicer/books/books.types";
import { addProductToCart } from "../../../../slicer/cart/cart.actions";
import { updateSuccessNotification } from "../../../../slicer/general/general.actions";

interface Props {
  product: Book;
  style?: object;
}

const SearchProduct = ({ product, style }: Props) => {
  const dispatch = useDispatch();
  const { textColor } = useMainColors();
  const navigate = useNavigation();
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() => {
          //@ts-ignore
          navigate.navigate(ROUTE_PATHS.BOOK_SHOP, { book: product });
        }}
        style={{ width: "30%" }}
      >
        <Image
          style={styles.image}
          source={{ uri: product.coverPage[0].toString() }}
        />
      </TouchableOpacity>
      <View style={{ width: "40%", paddingHorizontal: 20 }}>
        <Text style={{ color: textColor }}>{product.title}</Text>
        <Text style={{ color: Colors.grey }}>{product.collections}</Text>
      </View>
      <View style={{ width: "20%" }}>
        <Text
          style={{
            color: Colors.tealc,
            textTransform: "capitalize",
            fontStyle: "italic",
          }}
        >
          {product.newBook}
        </Text>
      </View>
      <TouchableOpacity
        onPress={
          product.newBook === "soon"
            ? () => {}
            : () => {
                dispatch(addProductToCart([product]));
                dispatch(
                  updateSuccessNotification("Livro adicionado ao carrinho")
                );
              }
        }
        style={{
          width: "10%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          style={{}}
          name={"cart-outline"}
          size={28}
          color={product.newBook === "soon" ? Colors.grey : textColor}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 26,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 20,

    borderBottomWidth: 2,
    borderBottomColor: Colors.grey,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 6,
  },
});

export default SearchProduct;
