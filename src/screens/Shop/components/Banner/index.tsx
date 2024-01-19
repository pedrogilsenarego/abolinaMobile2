import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
} from "react-native";
import { firestore } from "../../../../config/firebaseConfig";
import { Colors } from "../../../../constants/pallete";
import Pagination from "./Pagination";

const Banner = () => {
  const [images, setImages] = useState<any[]>([]);
  const [paginationIndex, setPaginationIndex] = useState<number>(0);
  const [loadingCarrousell, setLoadingCarroussell] = useState<boolean>(false);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    const fetchCarrouselContent = async () => {
      setLoadingCarroussell(true);
      try {
        const carrouselDoc = await firestore
          .collection("general")
          .doc("carrousell")
          .get();

        if (carrouselDoc.exists) {
          // Check if the document exists
          const carrouselData = carrouselDoc.data();
          const carrouselContent = carrouselData?.content || [];

          // Assuming "content" is an array of objects
          setImages(carrouselContent);
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.error("Error fetching carrousel content:", error);
      }
      setLoadingCarroussell(false);
    };

    fetchCarrouselContent();
  }, []);
  //@ts-ignore
  const handleViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    setPaginationIndex(viewableItems[0].index);
  });

  return (
    <View>
      <View style={{ width: "100%", height: 250 }}>
        {loadingCarrousell ? (
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={Colors.tealc} />
          </View>
        ) : (
          <FlatList
            onScrollToIndexFailed={(info) => {
              console.warn(`Scroll to index failed: ${info.index}`);
            }}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={handleViewableItemsChanged.current}
            data={images || []}
            renderItem={({ item }) => (
              <View style={{ width: width, height: 250 }}>
                <Image
                  source={{ uri: item.image }}
                  style={{ flex: 1, width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </View>
            )}
          />
        )}
      </View>
      {!loadingCarrousell ? (
        <View
          style={{
            height: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pagination data={images} currentIndex={paginationIndex} />
        </View>
      ) : (
        <View style={{ height: 60 }} />
      )}
    </View>
  );
};

export default Banner;
