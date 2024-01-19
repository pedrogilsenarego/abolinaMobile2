import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/pallete";
import useMainColors from "../../../hooks/useMainColors";
import {
  HomeFilters,
  HomeOrder,
} from "../../../slicer/homeFilters/homeFilters.types";
import Checkbox from "../../Inputs/CheckBox";

type Option = {
  name: string;
  id?: HomeFilters | HomeOrder | string;
};

type Props = {
  item: Option;
  onPressOption?: (id: string) => void;
  onChecked?: (id: string[], value: boolean) => void;
  state?: string | string[];
};

const ListItem = ({ item, onPressOption, onChecked, state }: Props) => {
  const [checked, setChecked] = useState(false);
  const { textColor } = useMainColors();

  useEffect(() => {
    if (state) {
      if (state?.includes(item.id || "")) setChecked(true);
      else setChecked(false);
    }
  }, [state]);

  return (
    <TouchableOpacity
      onPress={() => {
        onPressOption?.(item.id || "");
        onChecked?.([item.id || ""], !checked);
        setChecked(!checked);
      }}
      style={{
        marginTop: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 5,
      }}
    >
      {onChecked && (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Checkbox
            isChecked={checked}
            onChange={() => {
              setChecked(!checked);
              onChecked?.([item.id || ""], !checked);
            }}
          />
        </View>
      )}
      <Ionicons name={"book-outline"} size={24} color={textColor} />
      <Text
        style={{
          color: textColor,
          fontSize: 16,
          fontWeight:
            state?.includes(item.id || "") && !onChecked ? "bold" : "normal",
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ListItem;
