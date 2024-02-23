import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import SideModalHeader from "../../../components/SideModalHeader";
import { Colors } from "../../../constants/pallete";
import { ROUTE_PATHS } from "../../../constants/routes";
import useMainColors from "../../../hooks/useMainColors";
import {
  setPageCollection,
  setShelf,
  setShopMode,
} from "../../../slicer/homeFilters/homeFilters.actions";

type Props = { collections: any; setSideMenu?: (value: boolean) => void };

const Menu = ({ collections, setSideMenu }: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { backgroundColor, textColor } = useMainColors();
  const Shelf = ({
    title,
    onClick,
  }: {
    title: string;
    onClick?: () => void;
  }) => {
    return (
      <TouchableOpacity style={{ marginTop: 20 }} onPress={onClick}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: 5,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: textColor,
              fontSize: 20,
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.blackish }}>
      <View style={{ height: "100%", backgroundColor }}>
        <SideModalHeader
          title="Menu"
          onBack={() => {
            //@ts-ignore
            navigation.navigate(ROUTE_PATHS.SHOP);
            if (setSideMenu) setSideMenu(false);
          }}
          icon={
            <Ionicons name={"menu-outline"} size={23} color={"transparent"} />
          }
        />
        <View style={{ paddingHorizontal: 20 }}>
          <Shelf
            title="Entrada"
            onClick={() => {
              dispatch(setShopMode("default"));
              if (setSideMenu) setSideMenu(false);
              // @ts-ignore
              navigation.navigate(ROUTE_PATHS.SHOP);
            }}
          />
          <Shelf
            title="Novidades"
            onClick={() => {
              dispatch(setShopMode("default"));
              if (setSideMenu) setSideMenu(false);
              // @ts-ignore
              navigation.navigate(ROUTE_PATHS.SHOP);
            }}
          />
          <Shelf
            title="Todas as Coleções"
            onClick={() => {
              if (setSideMenu) setSideMenu(false);
              // @ts-ignore
              navigation.navigate(ROUTE_PATHS.SHOP_COLLECTIONS, {
                collections,
              });
            }}
          />
          <View style={{ marginLeft: 20 }}>
            {collections.map((collection: any) => {
              return (
                <Shelf
                  key={collection.title}
                  title={collection.title}
                  onClick={() => {
                    if (setSideMenu) setSideMenu(false);
                    // @ts-ignore
                    navigation.navigate(ROUTE_PATHS.SHOP_COLLECTION, {
                      collection,
                    });
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
