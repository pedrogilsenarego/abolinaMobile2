import React, { ReactNode, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import useMainColors from "../../hooks/useMainColors";

interface IProps {
  children: ReactNode;
  onClose?: () => void;
  openModal: boolean;
}

const BottomPopup = ({ children, onClose, openModal }: IProps) => {
  const { modalColor } = useMainColors();
  const handlePressOutside = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: modalColor,
              borderTopLeftRadius: 14,
              borderTopRightRadius: 14,
              paddingHorizontal: 20,
              paddingVertical: 30,
              paddingBottom: 80,
              elevation: 7,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 10,
            }}
          >
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {},
});

export default BottomPopup;
