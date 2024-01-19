import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "../../constants/pallete";
import { ROUTE_PATHS } from "../../constants/routes";
import useMainColors from "../../hooks/useMainColors";
import { FavoritesProduct } from "../../slicer/favorites/favorites.types";
import { State } from "../../slicer/types";
import { i18n } from "../../translations/i18n";
import Product from "./components/Product";

const Favorites = () => {
  const favorites = useSelector<State, FavoritesProduct[]>(
    (state) => state.favorites.favoritesItems
  );
  const { backgroundColor, textColor, barStyle } = useMainColors();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<
    "ascTitle" | "descTitle" | "ascState" | "descState"
  >("ascTitle");

  const navigation = useNavigation();

  const filteredFavorites = () => {
    let initialFavoriteBooks = [...favorites];

    if (sortOption === "ascTitle") {
      initialFavoriteBooks.sort((a, b) =>
        a.product.title.localeCompare(b.product.title, undefined, {
          sensitivity: "base",
        })
      );
    } else if (sortOption === "descTitle") {
      initialFavoriteBooks.sort((a, b) =>
        b.product.title.localeCompare(a.product.title, undefined, {
          sensitivity: "base",
        })
      );
    } else if (sortOption === "ascState") {
      initialFavoriteBooks.sort((a, b) => {
        const order = ["new", "available", "soon", undefined];
        return (
          order.indexOf(a.product.newBook) - order.indexOf(b.product.newBook)
        );
      });
    } else if (sortOption === "descState") {
      initialFavoriteBooks.sort((a, b) => {
        const order = [undefined, "soon", "available", "new"];
        return (
          order.indexOf(a.product.newBook) - order.indexOf(b.product.newBook)
        );
      });
    }
    // } else if (sortOption === "descState") {
    //   initialFavoriteBooks.sort((a, b) => /* Sorting logic based on descState */);
    // }

    return initialFavoriteBooks;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.blackish,
      }}
    >
      <StatusBar barStyle={barStyle as any} />
      <View style={{ height: "100%", backgroundColor }}>
        <View
          style={{
            marginTop: 30,
            paddingHorizontal: 30,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Ionicons name={"star-outline"} size={24} color={Colors.tealc} />
            <Text
              style={{ color: Colors.tealc, fontSize: 20, fontWeight: "700" }}
            >
              {i18n.t("modules.favorites.title")}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setEditMode(!editMode)}>
            <Ionicons
              style={{}}
              name={"create-outline"}
              size={28}
              color={textColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              //@ts-ignore
              () => navigation.navigate(ROUTE_PATHS.CART)
            }
          >
            <Ionicons
              style={{}}
              name={"cart-outline"}
              size={28}
              color={textColor}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: 30,
            marginTop: 30,
            flexDirection: "row",
            borderBottomWidth: 2,
            borderBottomColor: textColor,
          }}
        >
          <View style={{ width: "30%" }}>
            <Text style={{ color: textColor }}>Ordem</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              setSortOption((value) =>
                value !== "ascTitle" ? "ascTitle" : "descTitle"
              )
            }
            style={{
              width: "40%",
              paddingHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: textColor }}>Título</Text>
            {sortOption === "descTitle" ? (
              <Ionicons
                style={{}}
                name={"arrow-down-outline"}
                size={18}
                color={textColor}
              />
            ) : (
              <Ionicons
                style={{}}
                name={"arrow-up-outline"}
                size={18}
                color={textColor}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setSortOption((value) =>
                value !== "ascState" ? "ascState" : "descState"
              )
            }
            style={{
              width: "30%",

              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: textColor }}>Estado</Text>
            {sortOption === "descState" ? (
              <Ionicons
                style={{}}
                name={"arrow-down-outline"}
                size={18}
                color={textColor}
              />
            ) : (
              <Ionicons
                style={{}}
                name={"arrow-up-outline"}
                size={18}
                color={textColor}
              />
            )}
          </TouchableOpacity>
        </View>
        {favorites.length === 0 ? (
          <Text
            style={{
              marginLeft: 40,
              marginRight: 40,
              textAlign: "center",
              fontSize: 20,
              color: textColor,
              marginTop: 150,
            }}
          >
            {i18n.t("modules.favorites.noBooks")}
          </Text>
        ) : (
          <View style={{ paddingBottom: 106 }}>
            <FlatList
              numColumns={1}
              style={{ paddingTop: 10 }}
              keyExtractor={(item, index) => index.toString()}
              data={filteredFavorites()}
              renderItem={({ item }) => (
                <Product editMode={editMode} product={item} />
              )}
            ></FlatList>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Favorites;
