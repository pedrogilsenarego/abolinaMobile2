import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SideModalHeader from "../../../components/SideModalHeader";
import { Colors } from "../../../constants/pallete";
import { ROUTE_PATHS } from "../../../constants/routes";
import { publishableKeyTest } from "../../../constants/stripe";
import useMainColors from "../../../hooks/useMainColors";
import { i18n } from "../../../translations/i18n";
import InvoiceDetails from "./Components/InvooiceDetails";

const Checkout = () => {
  const { backgroundColor, textColor } = useMainColors();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: Colors.blackish, flex: 1 }}>
      <View style={{ height: "100%", backgroundColor }}>
        <SideModalHeader
          title={i18n.t("modules.checkout.title")}
          onBack={
            // @ts-ignore
            () => navigation.navigate(ROUTE_PATHS.CART)
          }
          icon={
            <Ionicons
              name={"card-outline"}
              size={24}
              color={Colors.tealc}
              style={{ marginLeft: 5 }}
            />
          }
        />
        <ScrollView>
          <View
            style={{
              paddingVertical: 20,
              paddingHorizontal: 30,
              paddingBottom: 60,
            }}
          >
            <InvoiceDetails />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;
