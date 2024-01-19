import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "../../constants/pallete";
import useNavBottom from "../../hooks/useNavBottom";

import { i18n } from "../../translations/i18n";

import Slider from "../../components/Slider";

import TopestBar from "../../components/TopBar";
import useMainColors from "../../hooks/useMainColors";
import TopBar from "./components/TopBar";
import useHome from "./useHome";

const Home = () => {
  const { backgroundColor, textColor, barStyle } = useMainColors();
  useNavBottom({ show: true });
  const {
    listBooksOwned,
    filteredBooks,
    setSearchField,
    currentIndex,
    setCurrentIndex,
  } = useHome();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.blackish,
      }}
    >
      <StatusBar barStyle={barStyle as any} />
      <View style={{ height: "100%", backgroundColor }}>
        <TopestBar title="A MINHA BIBLIOTECA" />
        <TopBar setSearchField={setSearchField} />

        <View>
          {listBooksOwned.length === 0 ? (
            <Text
              style={{
                marginLeft: 40,
                marginRight: 40,
                textAlign: "center",
                fontSize: 20,
                color: textColor,
                marginTop: 150,
              }}
            >
              {i18n.t("modules.home.noBooks")}
            </Text>
          ) : (
            <View style={{ marginTop: 15 }}>
              <Slider
                filteredBooks={filteredBooks()}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
