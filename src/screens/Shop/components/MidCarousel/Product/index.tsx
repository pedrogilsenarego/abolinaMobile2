import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleProp, Text, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../../../constants/pallete";
import { ROUTE_PATHS } from "../../../../../constants/routes";
import useMainColors from "../../../../../hooks/useMainColors";
import { Book } from "../../../../../slicer/books/books.types";
type Props = {
  data: Book;
  style?: StyleProp<ViewStyle>;
};
const Product = ({ data, style }: Props) => {
  const navigation = useNavigation();
  const { textColor } = useMainColors();

  const discount = data?.discount || null;
  const newBook = data?.newBook || null;

  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate(ROUTE_PATHS.BOOK_SHOP, { book: data })}
      style={{
        width: 120,
        height: 184,
        borderWidth: 2,
        borderColor: Colors.grey,
        borderRadius: 4,
        position: "relative",
        ...(style as object),
      }}
    >
      {newBook && (
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            backgroundColor: Colors.tealc,
            top: 20,
            left: -4,
            paddingHorizontal: 10,
            paddingVertical: 4,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          <Text style={{ color: "white", fontSize: 10 }}>{newBook}</Text>
        </View>
      )}
      {discount && (
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            backgroundColor: Colors.tealc,
            top: 90,
            right: -6,
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 10 }}>{discount}%</Text>
        </View>
      )}
      <Image
        source={{ uri: data.coverPage[0] }}
        style={{
          width: "100%",
          aspectRatio: 1,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          padding: 4,
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ color: textColor }}
        >
          {data.title}
        </Text>
        <Text style={{ color: Colors.tealc, fontSize: 16 }}>€{data.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Product;
