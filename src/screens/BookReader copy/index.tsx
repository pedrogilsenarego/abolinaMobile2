import * as React from "react";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { storage } from "../../config/firebaseConfig";

const BookReader = () => {
  const [componentData, setComponentData] = useState<{
    indexData: string;
    lottieData: any[];
  } | null>(null);

  useEffect(() => {
    const storageRef = storage.refFromURL(
      "gs://abolina-a5745.appspot.com/digitalBook/book1"
    );

    // Fetch the index file
    const indexFileRef = storageRef.child("index.tsx");
    indexFileRef
      .getDownloadURL()
      .then((indexUrl) => {
        fetch(indexUrl)
          .then((response) => response.text())
          .then((indexData) => {
            // Set the retrieved index data
            setComponentData({ indexData, lottieData: [] });
          })
          .catch((error) => {
            console.error("Error fetching index file:", error);
          });
      })
      .catch((error) => {
        console.error("Error retrieving index file download URL:", error);
      });

    // Fetch all Lottie files in the folder
    const lottieFilesRef = storageRef.child("lottie");

    lottieFilesRef
      .listAll()
      .then((res) => {
        const lottieDataPromises = res.items.map((item) =>
          item
            .getDownloadURL()
            .then((lottieUrl) =>
              fetch(lottieUrl).then((response) => response.json())
            )
        );

        Promise.all(lottieDataPromises)
          .then((lottieData) => {
            // Set the retrieved Lottie data
            setComponentData((prevComponentData) => {
              if (prevComponentData) {
                return { ...prevComponentData, lottieData };
              }
              return null;
            });
          })
          .catch((error) => {
            console.error("Error fetching Lottie files:", error);
          });
      })
      .catch((error) => {
        console.error("Error retrieving Lottie files:", error);
      });
  }, []);

  if (!componentData) {
    // Component data is not yet available, you can show a loading indicator here
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 60,
        }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 60,
      }}
    >
      <WebView
        originWhitelist={["*"]}
        injectedJavaScript={componentData.indexData}
        javaScriptEnabled={true}
        style={{ flex: 1, width: "100%" }}
      />
    </SafeAreaView>
  );
};

export default BookReader;
