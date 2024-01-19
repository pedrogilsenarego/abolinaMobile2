import React, { useEffect, useRef, useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { Book } from "../../slicer/books/books.types";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Colors } from "../../constants/pallete";
import { ROUTE_PATHS } from "../../constants/routes";
import useMainColors from "../../hooks/useMainColors";
import {
  setEditMode,
  setShelf,
} from "../../slicer/homeFilters/homeFilters.actions";
import Pagination from "./Pagination";
import SlideItem from "./SlideItem";
import useSlider from "./useSlider";

type Props = {
  filteredBooks: Book[];
  currentIndex: number;
  setCurrentIndex: (currentIndex: number) => void;
};

const Slider = ({ filteredBooks, currentIndex, setCurrentIndex }: Props) => {
  const { shelfs, shelf, editMode, allBooksShelf } = useSlider({
    filteredBooks,
  });
  const { textColor, backgroundColor } = useMainColors();
  const dispatch = useDispatch();
  const { width } = Dimensions.get("screen");
  const flatListRef = useRef<FlatList>(null);
  const newShelfs = [allBooksShelf, ...shelfs];
  const navigation = useNavigation();
  const [currentIndexPagination, setCurrentIndexPagination] = useState(0);

  const handleOnScroll = (event: any) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(xOffset / width);

    // Only update the currentIndex in the state, without triggering automatic scrolling
    setCurrentIndexPagination(index);
  };

  useEffect(() => {
    const index = newShelfs.findIndex((shelfA) => shelfA.title === shelf);

    if (index >= 0 && currentIndex !== index) {
      // Only update the currentIndex in the state, without triggering automatic scrolling
      setCurrentIndex(index);
      setCurrentIndexPagination(index);
      // Scroll to the new index after a short delay to avoid conflicts with handleOnScroll
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
      }, 100);
    }
  }, [shelf, shelfs, currentIndex]);

  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity
        onPress={() => {
          // @ts-ignore
          navigation.navigate(ROUTE_PATHS.SHELVES_CONFIG);
        }}
        style={{
          position: "absolute",
          right: 20,
          top: 12,
          backgroundColor,
          zIndex: 5,
          opacity: shelf !== "Todos os  meus livros" ? 1 : 0,
        }}
      >
        <Ionicons name="create-outline" size={25} color={textColor} />
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        onScrollToIndexFailed={(info) => {
          console.warn(`Scroll to index failed: ${info.index}`);
        }}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        data={newShelfs}
        onScroll={handleOnScroll}
        scrollEnabled={editMode === "default"}
        renderItem={({ item }) => (
          <SlideItem itemx={item} filteredBooks={filteredBooks} />
        )}
      />
      <Pagination data={newShelfs} currentIndex={currentIndexPagination} />
    </View>
  );
};

export default Slider;
