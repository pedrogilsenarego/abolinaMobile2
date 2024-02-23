import LottieView from "lottie-react-native";
import * as React from "react";
import { useRef } from "react";
import { ScrollView, Text, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { setBookPos } from "../../slicer/general/general.actions";
import { State } from "../../slicer/types";
import { i18n } from "../../translations/i18n";
import Header from "../Header";
import Lottie from "./Lottie";
//import { IDigitalBook } from "../../types/digitalBook";

const Book1 = () => {
  const dispatch = useDispatch();
  const bookPosition = useSelector<State, number>(
    (state) => state.general.bookPosition
  );
  const bookPosRef = useRef(0); // Use useRef instead of useState for bookPos
  const scrollViewRef = useRef<ScrollView>(null);
  const fontSize = 16;
  const paddingHorizontal = 10;
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
            fontFamily: "CalibriRegular",
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

  const handleScrollEndDrag = (event: any) => {
    const newBookPos = event.nativeEvent.contentOffset.y;
    bookPosRef.current = newBookPos;
  };

  return (
    <View style={{ width: "100%" }}>
      <Header />
      <ScrollView
        contentOffset={{ y: bookPosition, x: 0 }}
        ref={scrollViewRef}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollEnd={() => {
          dispatch(setBookPos(bookPosRef.current));
        }}
        style={{ width: "100%" }}
      >
        <View
          style={{
            alignItems: "flex-end",
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={3} position="right" />
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
          <TextMine id={4} position="left" />
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
          <TextMine id={5} position="left" />
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
          <TextMine id={6} position="right" />
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
          <TextMine id={7} position="center" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={8} position="center" />
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
          <TextMine id={9} position="right" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={10} position="center" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={11} position="left" />
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
          <TextMine id={12} position="center" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={13} position="right" />
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
          <TextMine id={14} position="left" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={15} position="center" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={16} position="left" />
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
          <TextMine id={17} position="right" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={18} position="center" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={19} position="left" />
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
          <TextMine id={20} position="right" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={21} position="center" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={22} position="center" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={23} position="left" />
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
          <TextMine id={24} position="right" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={25} position="center" />
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
          <TextMine id={26} position="center" />
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
          <TextMine id={27} position="center" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={28} position="center" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={29} position="center" />
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
          <TextMine id={30} position="right" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={31} position="left" />
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
          <TextMine id={32} position="right" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={33} position="center" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={34} position="center" />
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
          <TextMine id={35} position="right" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={36} position="center" />
        </View>
        <View
          style={{
            paddingHorizontal,
            width: "100%",
          }}
        >
          <TextMine id={37} position="center" />
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
          <TextMine id={38} position="center" />
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
    </View>
  );
};

export default Book1;
