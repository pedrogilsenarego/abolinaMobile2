import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../../constants/pallete";
import useMainColors from "../../../../hooks/useMainColors";
import Product from "../MidCarousel/Product";

type Props = {
  collection: any;
};

const PageCollection = ({ collection }: Props) => {
  const [openAccordeon, setOpenAccordeon] = useState<boolean>(false);
  const { textColor } = useMainColors();

  return (
    <View style={{ marginBottom: 60, height: "100%" }}>
      <View
        style={{
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderColor: Colors.tealc,
          paddingVertical: 5,
          paddingHorizontal: 20,

          marginTop: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 20, color: textColor }}>
            {collection.title}
          </Text>
          <TouchableOpacity onPress={() => setOpenAccordeon(!openAccordeon)}>
            {!openAccordeon ? (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={30}
                color={textColor}
              />
            ) : (
              <MaterialIcons
                name="keyboard-arrow-up"
                size={30}
                color={textColor}
              />
            )}
          </TouchableOpacity>
        </View>
        {openAccordeon && (
          <Text style={{ color: textColor }}>{collection.resume}</Text>
        )}
      </View>
      <FlatList
        style={{ marginHorizontal: 20, marginTop: 20, width: "100%" }}
        numColumns={3}
        keyExtractor={(it, index) => index.toString()}
        data={collection.books || []}
        renderItem={({ item }) => (
          <Product
            data={item}
            style={{
              //width: "31%",
              marginVertical: 8,
              marginHorizontal: `${7 / 6}%`,
              padding: 0,
            }}
          />
        )}
      />
    </View>
  );
};

export default PageCollection;
