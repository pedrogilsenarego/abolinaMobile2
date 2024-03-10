import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "../../../constants/pallete";
import { ROUTE_PATHS } from "../../../constants/routes";
import useMainColors from "../../../hooks/useMainColors";
import { setShelf } from "../../../slicer/homeFilters/homeFilters.actions";
import useShelves from "./useShelves";

const ShelvesNew = ({ setOpenSide }: any) => {
  const dispatch = useDispatch();
  const { shelves, currentShelf } = useShelves();
  const { backgroundColor, textColor } = useMainColors();
  const Shelf = ({ title }: { title: string }) => {
    return (
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          dispatch(setShelf(title));
          //@ts-ignore
          navigation.navigate(ROUTE_PATHS.HOME);
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: 5,
            alignItems: "center",
          }}
        >
          <Ionicons name={"library-outline"} size={24} color={textColor} />
          <Text
            style={{
              color: textColor,
              fontSize: 20,
              fontWeight: currentShelf === title ? "bold" : undefined,
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.blackish }}>
      <View
        style={{
          paddingHorizontal: 30,
          paddingTop: 50,
          flex: 1,
          backgroundColor,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name={"library-outline"} size={24} color={Colors.tealc} />
            <Text
              style={{ color: Colors.tealc, fontSize: 20, fontWeight: "700" }}
            >
              PRATELEIRAS
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              dispatch(setShelf("Todos os  meus livros"));
              setOpenSide(false);

              // @ts-ignore
              navigation.navigate(ROUTE_PATHS.SHELVES_CONFIG);
            }}
          >
            <Ionicons
              name={"add-circle-outline"}
              size={24}
              color={Colors.tealc}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: Colors.tealc,
            marginTop: 10,
            marginBottom: 20,
          }}
        />
        <Shelf title="Todos os  meus livros" />
        {shelves.map((shelf) => {
          return <Shelf key={shelf.title} title={shelf.title} />;
        })}
      </View>
    </SafeAreaView>
  );
};

export default ShelvesNew;
