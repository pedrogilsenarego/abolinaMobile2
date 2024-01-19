import {
  Feather,
  FontAwesome5,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import BottomPopup from "../../../components/BottomPopup";
import Button from "../../../components/Button";
import DrawerAccordeon from "../../../components/DrawerAccordeon";
import { Colors } from "../../../constants/pallete";
import useMainColors from "../../../hooks/useMainColors";
import {
  HomeFilters,
  HomeOrder,
} from "../../../slicer/homeFilters/homeFilters.types";
import { State } from "../../../slicer/types";
import useFilter from "./useFilter";

const Filter = () => {
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const { handleAddFilter, homeFilters, handleSetOrder, handleClearFilters } =
    useFilter();
  const darkMode = useSelector<State, boolean>(
    (state) => state.general.darkMode
  );
  const { textColor } = useMainColors();

  const filtersContent = () => {
    return (
      <View
        style={{
          display: "flex",
          alignItems: "center",
          rowGap: 30,
        }}
      >
        <View style={{ width: "90%", display: "flex", rowGap: 10 }}>
          <DrawerAccordeon
            title="Organização"
            options={[{ name: "Por coleção" }, { name: "Livros individuais" }]}
            icon={
              <Ionicons
                name="md-color-filter-outline"
                size={20}
                color={textColor}
              />
            }
          />
          <DrawerAccordeon
            onPressOption={(value: HomeOrder) => handleSetOrder(value)}
            state={homeFilters?.order}
            title="Ordem"
            options={[
              { name: "Crescente", id: "asc" },
              { name: "Decrescente", id: "desc" },
            ]}
            icon={<Ionicons name="options-sharp" size={20} color={textColor} />}
          />
          <DrawerAccordeon
            onPressOption={(value: HomeFilters) => handleAddFilter(value)}
            state={homeFilters?.filter}
            options={[
              { name: "Lido", id: "read" },
              { name: "Não lido", id: "not-read" },
              { name: "Sem coleção", id: "not-in-collection" },
            ]}
            title="Filtro"
            icon={<Feather name="filter" size={20} color={textColor} />}
          />
        </View>
        <View style={{ width: "90%" }}>
          <Button
            label="Clear Filters"
            fullwidth
            inverseColors={darkMode ? true : false}
            onClick={handleClearFilters}
          ></Button>
        </View>
      </View>
    );
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => setOpenFilters(true)}
        style={{
          paddingVertical: 7,
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
      >
        <SimpleLineIcons name={"options-vertical"} size={20} color="white" />
      </TouchableOpacity>
      <BottomPopup
        openModal={openFilters}
        onClose={() => setOpenFilters(false)}
      >
        {filtersContent()}
      </BottomPopup>
    </View>
  );
};

export default Filter;
