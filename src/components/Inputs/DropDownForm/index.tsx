import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useField } from "formik";
import { Colors } from "../../../constants/pallete";
import useMainColors from "../../../hooks/useMainColors";
import BottomPopup from "../../BottomPopup";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelect?: (option: Option) => void;
  label?: string;
  icon?: React.ReactNode;
  name: string;
}

const DropdownForm: React.FC<DropdownProps> = ({
  options,
  onSelect,
  label,
  icon,
  name,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [field, meta, helper] = useField(name ?? "");
  const { textColor, backgroundColor } = useMainColors();
  const handleToggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleSelectOption = (option: Option) => {
    if (onSelect) onSelect(option);
    handleToggleModal();
    helper.setValue(option.value);
  };

  const selectedAOption = options.find(
    (option) => option.value === meta.value
  ) || { value: "PT", label: "Portugal" };

  return (
    <View>
      {label && (
        <View style={{ width: "100%", marginBottom: 5 }}>
          <Text
            style={{
              fontSize: 18,
              color: "white",
              textAlign: "left",
            }}
          >
            {label}
          </Text>
        </View>
      )}
      <TouchableOpacity onPress={handleToggleModal}>
        {icon ? (
          icon
        ) : (
          <View
            style={{
              backgroundColor: Colors.white,
              flexDirection: "row",
              justifyContent: "space-between",
              borderRadius: 10,
              borderWidth: 2,
              borderColor: Colors.darkGrey,
              paddingVertical: 8,
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ color: Colors.darkGrey, fontSize: 18 }}>
              {selectedAOption.label}
            </Text>
            <Ionicons
              name={"chevron-down-outline"}
              size={24}
              color={Colors.darkGrey}
            />
          </View>
        )}
      </TouchableOpacity>

      <BottomPopup openModal={isVisible} onClose={() => setIsVisible(false)}>
        <FlatList
          data={options}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectOption(item)}>
              <View
                style={{
                  padding: 10,

                  borderBottomWidth: 1,
                  borderBottomColor: textColor,
                }}
                pointerEvents="box-none"
              >
                <Text
                  style={{
                    color: textColor,
                    fontSize: 16,
                    fontWeight: item.value === meta.value ? "800" : "500",
                  }}
                >
                  {item.label}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </BottomPopup>
    </View>
  );
};

export default DropdownForm;
