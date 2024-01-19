import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import DrawerPopup from "../../../components/DrawerPopup";
import TextField from "../../../components/Inputs/TextField";
import { Colors } from "../../../constants/pallete";
import { ROUTE_PATHS } from "../../../constants/routes";
import { Book } from "../../../slicer/books/books.types";
import { setShopMode } from "../../../slicer/homeFilters/homeFilters.actions";
import { ShopMode } from "../../../slicer/homeFilters/homeFilters.types";
import Menu from "../Menu";

type Props = {
  collections: any;
  setSearchField: (value: any) => void;
  shopMode: ShopMode;
  books: Book[];
};

const TopBar = ({ collections, setSearchField, shopMode, books }: Props) => {
  const horizontalPadding = 15;
  const navigation = useNavigation();
  const topRef = useRef(null);
  const dispatch = useDispatch();
  const [sideDrawer, setSideDrawer] = useState(false);

  const Default = () => {
    return (
      <View
        ref={topRef}
        style={{
          backgroundColor: Colors.tealc,
          paddingHorizontal: horizontalPadding,
          height: 55,
          display: "flex",
          flexDirection: "row",

          justifyContent: "space-between",
        }}
      >
        {/* <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            navigation.navigate(ROUTE_PATHS.SHOP_MENU, { collections });
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name={"list-outline"}
            size={24}
            color={"white"}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            setSideDrawer(true);
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name={"list-outline"}
            size={24}
            color={"white"}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
        <DrawerPopup
          barRef={topRef}
          openModal={sideDrawer}
          onClose={() => setSideDrawer(false)}
        >
          <Menu collections={collections} setSideMenu={setSideDrawer} />
        </DrawerPopup>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              //@ts-ignore
              navigation.navigate(ROUTE_PATHS.SHOP_SEARCH, { books });
              //dispatch(setShopMode("search"))
            }}
          >
            <Ionicons name={"search"} size={24} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 5 }}
            onPress={
              // @ts-ignore
              () => navigation.navigate(ROUTE_PATHS.CART)
            }
          >
            <Ionicons name={"cart-outline"} size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Search = () => {
    const INITIAL_STATE = {
      search: "",
    };
    return (
      <View
        style={{
          backgroundColor: Colors.tealc,
          paddingHorizontal: horizontalPadding,
          height: 55,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              dispatch(setShopMode("default"));
              setSearchField(null);
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name={"close-outline"} size={32} color={"white"} />
          </TouchableOpacity>
          <Formik
            initialValues={{ ...INITIAL_STATE }}
            onSubmit={(values) => {}}
          >
            {(props) => (
              <View style={{ flex: 1, rowGap: 20, alignItems: "center" }}>
                <TextField
                  inputStyle={{ paddingVertical: 6, marginTop: -0 }}
                  name="search"
                  placeholder="Search in the shop..."
                  onChange={(values: any) => setSearchField(values)}
                />
              </View>
            )}
          </Formik>
        </View>
      </View>
    );
  };

  return shopMode === "search" ? Search() : Default();
};

export default TopBar;
