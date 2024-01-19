import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "../../../constants/pallete";
import { ROUTE_PATHS } from "../../../constants/routes";
import useMainColors from "../../../hooks/useMainColors";
import { Book } from "../../../slicer/books/books.types";
import { addProductToCart } from "../../../slicer/cart/cart.actions";
import { deleteProductFavorites } from "../../../slicer/favorites/favorites.actions";
import { FavoritesProduct } from "../../../slicer/favorites/favorites.types";
import {
  updateFailNotification,
  updateSuccessNotification,
} from "../../../slicer/general/general.actions";

interface Props {
  product: FavoritesProduct;
  style?: object;
  editMode: boolean;
}

const Product = ({ product, style, editMode }: Props) => {
  const navigation = useNavigation();
  const { backgroundColor, textColor } = useMainColors();
  const dispatch = useDispatch();
  return (
    <View style={[styles.container, style]}>
      {editMode && (
        <TouchableOpacity
          onPress={() =>
            dispatch(deleteProductFavorites(product.product.documentID))
          }
          style={{
            width: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            style={{}}
            name={"close-outline"}
            size={32}
            color={textColor}
          />
        </TouchableOpacity>
      )}
      <Image
        style={styles.image}
        source={{ uri: product.product.coverPage[0].toString() }}
      />
      <View style={{ width: "40%", paddingHorizontal: 20 }}>
        <Text style={{ color: textColor }}>{product.product.title}</Text>
        <Text style={{ color: Colors.grey }}>
          {product.product.collections}
        </Text>
      </View>
      <View style={{ width: "20%" }}>
        <Text
          style={{
            color: Colors.tealc,
            textTransform: "capitalize",
            fontStyle: "italic",
          }}
        >
          {product.product.newBook}
        </Text>
      </View>
      {!editMode && (
        <TouchableOpacity
          onPress={
            product.product.newBook === "soon"
              ? () => {
                  dispatch(updateFailNotification("Livro não disponível"));
                }
              : () => {
                  dispatch(addProductToCart([product.product]));
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
            name={
              product.product.newBook === "available"
                ? "cart-outline"
                : "notifications-outline"
            }
            size={28}
            color={textColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 20,

    borderBottomWidth: 2,
    borderBottomColor: Colors.grey,
  },
  image: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 6,
  },
});

export default Product;
