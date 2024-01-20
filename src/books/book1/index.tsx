import LottieView from "lottie-react-native";
import * as React from "react";
import { useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import { useQuery } from "react-query";
import { fetchDigitalBook } from "../../services/digitalBooks";
import { IDigitalBook } from "../../types/digitalBook";

const Book1 = () => {
  const documentID = "duasAlmas";

  const {
    isLoading: loadingBook,
    error: errorBook,
    data: bookData,
  } = useQuery<IDigitalBook, [string, string]>(
    [documentID, documentID],
    fetchDigitalBook,
    {
      staleTime: 3600 * 60,
      cacheTime: 3600 * 60,
    }
  );

  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <Text style={{ marginTop: 50, fontSize: 24 }}>{bookData?.title}</Text>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <LottieView
          source={require("./toto2.json")}
          autoPlay
          loop
          style={{
            width: "50%",

            aspectRatio: 1,
          }}
        />
        <LottieView
          source={require("./PoliteChicky.json")}
          autoPlay
          loop
          style={{
            width: "70%",
            aspectRatio: 1,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Book1;
