import LottieView from "lottie-react-native";
import * as React from "react";
import { useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import { useQuery } from "react-query";
import { fetchDigitalBook } from "../../services/digitalBooks";
import { i18n } from "../../translations/i18n";
import Lottie from "./Lottie";
//import { IDigitalBook } from "../../types/digitalBook";

const Book1 = () => {
  // const {
  //   isLoading: loadingBook,
  //   error: errorBook,
  //   data: bookData,
  // } = useQuery<IDigitalBook, [string, string]>(
  //   [documentID, documentID],
  //   fetchDigitalBook,
  //   {
  //     staleTime: 3600 * 60,
  //     cacheTime: 3600 * 60,
  //   }
  // );
  const fontSize = 16;
  const paddingHorizontal = 20;
  const TextMine = ({
    position,
    id,
  }: {
    position: "left" | "center" | "right";
    id: number;
  }) => {
    return (
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: position,
            width: "100%",
          }}
        >
          {i18n.t(`book.${id}`)}
        </Text>
      </View>
    );
  };

  const LottieMine = () => {
    return (
      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
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
    );
  };

  return (
    <ScrollView style={{ width: "100%" }}>
      <View
        style={{
          alignItems: "flex-end",
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 50,
            fontSize,
            textAlign: "right",
            width: "50%",
          }}
        >
          {i18n.t("book.3")}
        </Text>
      </View>

      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
        <Lottie file={require("./lottie-exemplo-3.json")} />
      </View>
      {/*4*/}
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 30,
            fontSize,
            textAlign: "left",
            width: "100%",
          }}
        >
          {i18n.t("book.4")}
        </Text>
      </View>
      <View
        style={{
          marginTop: 100,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
        <Lottie file={require("./PoliteChicky.json")} />
      </View>
      {/*5*/}
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "left",
            width: "100%",
          }}
        >
          {i18n.t("book.5")}
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
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
      {/*6*/}
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "right",
            width: "100%",
          }}
        >
          {i18n.t("book.6")}
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
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
      {/*7-8*/}
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.7")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.8")}
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
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
      {/*9-10-11*/}
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "right",
            width: "100%",
          }}
        >
          {i18n.t("book.9")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.10")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "left",
            width: "100%",
          }}
        >
          {i18n.t("book.11")}
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
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
      {/*12-13*/}
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.12")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "right",
            width: "100%",
          }}
        >
          {i18n.t("book.13")}
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
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
      {/*14-15-16*/}
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "left",
            width: "100%",
          }}
        >
          {i18n.t("book.14")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.15")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "left",
            width: "100%",
          }}
        >
          {i18n.t("book.16")}
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
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
      {/*17-18-19*/}
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "right",
            width: "100%",
          }}
        >
          {i18n.t("book.17")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.18")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "left",
            width: "100%",
          }}
        >
          {i18n.t("book.19")}
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
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
      {/*20-21-22-23*/}
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "right",
            width: "100%",
          }}
        >
          {i18n.t("book.20")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.21")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.22")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "left",
            width: "100%",
          }}
        >
          {i18n.t("book.23")}
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
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
      {/*24-25*/}
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "right",
            width: "100%",
          }}
        >
          {i18n.t("book.24")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.25")}
        </Text>
      </View>

      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
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
      {/*26*/}
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.26")}
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
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
      {/*27-28-29*/}
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.27")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.28")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.29")}
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
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
      {/*30-31*/}
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "right",
            width: "100%",
          }}
        >
          {i18n.t("book.30")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "left",
            width: "100%",
          }}
        >
          {i18n.t("book.31")}
        </Text>
      </View>

      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
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
      {/*32-33-34*/}
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "right",
            width: "100%",
          }}
        >
          {i18n.t("book.32")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.33")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "left",
            width: "100%",
          }}
        >
          {i18n.t("book.34")}
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
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
      {/*35-36-37*/}
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "right",
            width: "100%",
          }}
        >
          {i18n.t("book.35")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.36")}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.37")}
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
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
      {/*38*/}
      <View
        style={{
          paddingHorizontal,
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 130,
            fontSize,
            textAlign: "center",
            width: "100%",
          }}
        >
          {i18n.t("book.38")}
        </Text>
      </View>

      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
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
      <TextMine position="center" id={39} />
      <TextMine position="right" id={40} />
      <TextMine position="center" id={41} />
      <LottieMine />
      <TextMine position="right" id={42} />
      <LottieMine />
      <TextMine position="left" id={43} />
      <TextMine position="right" id={44} />
      <LottieMine />
      <TextMine position="center" id={45} />
      <LottieMine />
      <TextMine position="center" id={46} />
      <TextMine position="right" id={47} />
      <LottieMine />
      <LottieMine />
      <TextMine position="center" id={48} />
      <LottieMine />
      <TextMine position="center" id={49} />
      <TextMine position="left" id={50} />
      <LottieMine />
      <TextMine position="right" id={51} />
      <LottieMine />
      <TextMine position="center" id={52} />
      <LottieMine />
      <TextMine position="center" id={53} />
      <TextMine position="left" id={54} />
      <LottieMine />
      <TextMine position="center" id={55} />
      <TextMine position="left" id={56} />
      <LottieMine />
      <TextMine position="right" id={57} />
      <TextMine position="center" id={58} />
      <TextMine position="center" id={59} />
      <TextMine position="center" id={60} />
      <TextMine position="center" id={61} />
      <LottieMine />
      <LottieMine />
      <TextMine position="left" id={62} />
      <LottieMine />
      <TextMine position="center" id={63} />
      <LottieMine />
      <TextMine position="center" id={64} />
      <TextMine position="left" id={65} />
      <TextMine position="right" id={66} />
      <TextMine position="center" id={67} />
      <LottieMine />
      <TextMine position="center" id={68} />
      <LottieMine />
      <TextMine position="center" id={69} />
      <LottieMine />
      <TextMine position="center" id={70} />
      <TextMine position="center" id={71} />
      <LottieMine />
      <TextMine position="center" id={72} />
      <TextMine position="center" id={73} />
      <LottieMine />
      <TextMine position="center" id={74} />
      <TextMine position="center" id={75} />
      <LottieMine />
      <TextMine position="right" id={76} />
      <TextMine position="center" id={77} />
      <TextMine position="left" id={78} />
      <TextMine position="center" id={79} />
      <LottieMine />
      <TextMine position="center" id={80} />
      <TextMine position="center" id={81} />
      <TextMine position="center" id={82} />
      <TextMine position="center" id={83} />
      <TextMine position="center" id={84} />
      <TextMine position="left" id={85} />
      <LottieMine />
      <TextMine position="center" id={86} />
      <TextMine position="center" id={87} />
      <LottieMine />
    </ScrollView>
  );
};

export default Book1;
