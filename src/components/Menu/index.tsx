import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/pallete";
import { useNavigation } from "@react-navigation/native";

import React from "react";



const Menu = (props: any) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tealc,
    height: 50,
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 4,
  },

});

export default Menu;
