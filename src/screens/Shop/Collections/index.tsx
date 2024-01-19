import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SideModalHeader from "../../../components/SideModalHeader";
import { Colors } from "../../../constants/pallete";
import { ROUTE_PATHS } from "../../../constants/routes";
import useMainColors from "../../../hooks/useMainColors";
import Collection from "../components/Collections";

type Props = {
  collections: any;
};

const Collections = ({ collections }: Props) => {
  const { backgroundColor, barStyle, textColor } = useMainColors();

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: Colors.blackish }}>
      <StatusBar barStyle={barStyle as any} />
      <View style={{ height: "100%", backgroundColor }}>
        <SideModalHeader
          title="Collections"
          onBack={() => {
            // @ts-ignore
            navigation.navigate(ROUTE_PATHS.SHOP);
          }}
          icon={
            <Ionicons
              name={"library-outline"}
              size={24}
              color={Colors.tealc}
              style={{ marginLeft: 5 }}
            />
          }
        />

        <FlatList
          style={{ marginTop: 10 }}
          data={collections}
          renderItem={({ item }) => (
            <View>
              <Collection data={item} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Collections;
