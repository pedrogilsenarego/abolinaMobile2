import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import useMainColors from "../../hooks/useMainColors";
import {
  HomeFilters,
  HomeOrder,
} from "../../slicer/homeFilters/homeFilters.types";
import Checkbox from "../Inputs/CheckBox";
import ListItem from "./ListItem";

type Option = {
  name: string;
  id?: HomeFilters | HomeOrder | string;
};

type Props = {
  title: string;
  startOpen?: boolean;
  icon?: React.ReactNode;
  options?: Option[];
  onPressOption?: (id: string | any) => void;
  state?: string | string[];
  onChecked?: (titles: string[], value: boolean) => void;
};

const DrawerAccordeon = ({
  title,
  icon,
  startOpen,
  options,
  onPressOption,
  state,
  onChecked,
}: Props) => {
  const [openAccordeon, setOpenAccordeon] = useState<boolean>(
    startOpen ? true : false
  );
  const [checked, setChecked] = useState(false);
  const { textColor } = useMainColors();

  useEffect(() => {
    if (state && options) {
      const allIdsExist = options.every(
        (option) => option.id && state.includes(option.id)
      );
      setChecked(allIdsExist);
    }
  }, [state, options]);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setOpenAccordeon(!openAccordeon)}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", columnGap: 5 }}>
          {onChecked && (
            <Checkbox
              isChecked={checked}
              onChange={() => {
                onChecked(
                  options?.map((option) => option.id || "") || [],
                  !checked
                );
                setChecked(!checked);
              }}
            />
          )}
          <View style={{ display: "flex", flexDirection: "row", columnGap: 5 }}>
            {icon && icon}
            <Text style={{ fontSize: 20, color: textColor }}>{title}</Text>
          </View>
        </View>
        <View style={{ marginTop: -10 }}>
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
        </View>
      </TouchableOpacity>
      {openAccordeon && (
        <FlatList
          style={{ marginLeft: 20 }}
          data={options}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <ListItem
              onPressOption={onPressOption}
              item={item}
              state={state}
              onChecked={onChecked}
            />
          )}
        />
      )}
    </View>
  );
};

export default DrawerAccordeon;
