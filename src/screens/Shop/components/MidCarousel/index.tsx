import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../../constants/pallete";
import useMainColors from "../../../../hooks/useMainColors";
import { Book } from "../../../../slicer/books/books.types";
import Product from "./Product";
import ProductC from "./ProductC";

type Props = {
  type: string;
  title: string;
  data: Book[] | any[];
  onTitleClick?: () => void;
};

const MidCarousel = ({ title, data, onTitleClick, type }: Props) => {
  const navigate = useNavigation();
  const { textColor } = useMainColors();
  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        onPress={onTitleClick ? onTitleClick : () => {}}
        style={{
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderColor: Colors.tealc,
          paddingVertical: 5,
          paddingLeft: 20,
          flexDirection: "row",
          columnGap: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, color: textColor }}>{title}</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={20} color={textColor} />
        </TouchableOpacity>
      </TouchableOpacity>
      <FlatList
        style={{ marginLeft: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data || []}
        renderItem={({ item }) => (
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 15,
            }}
          >
            {type === "news" ? (
              <Product data={item} />
            ) : (
              <ProductC data={item} />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default MidCarousel;
