import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "../../../constants/pallete";
import useMainColors from "../../../hooks/useMainColors";
import BottomPopup from "../../BottomPopup";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (option: Option) => void;
  selectedValue: Option;
  icon?: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  selectedValue,
  icon,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const { textColor, backgroundColor } = useMainColors();
  const handleToggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleSelectOption = (option: Option) => {
    onSelect(option);
    handleToggleModal();
  };

  return (
    <View>
      <TouchableOpacity onPress={handleToggleModal}>
        {icon ? (
          icon
        ) : (
          <View
            style={{
              backgroundColor: Colors.tealc,
              borderRadius: 10,

              paddingVertical: 10,
              paddingHorizontal: 35,
            }}
          >
            <Text style={{ color: Colors.white, fontSize: 18 }}>
              {selectedValue.label}
            </Text>
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
                    fontWeight:
                      item.value === selectedValue.value.toLowerCase()
                        ? "800"
                        : "500",
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

export default Dropdown;
