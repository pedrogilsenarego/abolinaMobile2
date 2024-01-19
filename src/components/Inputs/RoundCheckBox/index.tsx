import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/pallete";

type Props = {
  onChange?: (value: boolean) => void;
  isChecked?: boolean;
};

const RoundCheckBox = ({ onChange, isChecked = false }: Props) => {
  const handleToggle = () => {
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <TouchableOpacity onPress={handleToggle} style={styles.container}>
      <View
        style={{
          borderWidth: 2,
          borderColor: "white",
          padding: 1,
          borderRadius: 11,
          zIndex: 10,
        }}
      >
        <View
          style={{
            height: 12,
            width: 12,
            backgroundColor: isChecked ? "white" : "transparent",
            borderRadius: 6,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default RoundCheckBox;
