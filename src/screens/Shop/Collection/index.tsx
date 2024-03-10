import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SideModalHeader from "../../../components/SideModalHeader";
import { Colors } from "../../../constants/pallete";
import { ROUTE_PATHS } from "../../../constants/routes";
import useMainColors from "../../../hooks/useMainColors";
import Collection from "../components/Collections";
import Product from "../components/MidCarousel/Product";

type Props = {
  collection: any;
};

const CollectionShop = ({ collection }: Props) => {
  const { backgroundColor, barStyle, textColor } = useMainColors();
  const [openAccordeon, setOpenAccordeon] = useState<boolean>(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: Colors.blackish }}>
      <StatusBar barStyle={barStyle as any} />
      <View style={{ height: "100%", backgroundColor }}>
        <SideModalHeader
          title="Collections"
          onBack={() => {
            // @ts-ignore
            navigation.navigate(ROUTE_PATHS.SHOP);
          }}
          icon={
            <Ionicons
              name={"library-outline"}
              size={24}
              color={Colors.tealc}
              style={{ marginLeft: 5 }}
            />
          }
        />
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
    </SafeAreaView>
  );
};

export default CollectionShop;
