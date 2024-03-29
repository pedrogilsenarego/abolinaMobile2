import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import SideModalHeader from "../../../components/SideModalHeader";
import { firestore } from "../../../config/firebaseConfig";
import { Colors } from "../../../constants/pallete";
import { ROUTE_PATHS } from "../../../constants/routes";
import useMainColors from "../../../hooks/useMainColors";
import { Book } from "../../../slicer/books/books.types";
import { addProductToCart } from "../../../slicer/cart/cart.actions";
import { addProductToFavorites } from "../../../slicer/favorites/favorites.actions";
import { FavoritesProduct } from "../../../slicer/favorites/favorites.types";
import {
  updateFailNotification,
  updateSuccessNotification,
} from "../../../slicer/general/general.actions";
import { State } from "../../../slicer/types";

type Props = {
  book: Book;
};

const BookShop = ({ book }: Props) => {
  const dispatch = useDispatch();
  const { backgroundColor, textColor } = useMainColors();
  const [collections, setCollections] = useState<any>();
  const [mode, setMode] = useState<"story" | "collection">("story");

  const favorites = useSelector<State, FavoritesProduct[]>(
    (state) => state.favorites.favoritesItems
  );
  const isBookInFavorites = favorites.some(
    (favorite) => favorite.product.documentID === book.documentID
  );
  const navigate = useNavigation();

  useEffect(() => {
    console.log(`fetching collection ${book.collections}`);

    if (!book.collections) return;

    firestore
      .collection("collections")
      .where("title", "==", book.collections)
      .onSnapshot((query) => {
        const list: any[] = [];
        query.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setCollections(list);
      });
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: Colors.blackish, flex: 1 }}>
      <View style={{ backgroundColor }}>
        <SideModalHeader
          title="Book"
          //@ts-ignore
          onBack={() => navigate.navigate(ROUTE_PATHS.SHOP)}
          icon={
            <Ionicons name={"book-outline"} size={23} color={Colors.tealc} />
          }
        />
        <ScrollView>
          <View
            style={{
              height: "100%",
              paddingBottom: 100,
              marginHorizontal: 30,
            }}
          >
            <Text style={{ color: textColor, marginTop: 30, fontSize: 20 }}>
              {book.title}
            </Text>
            <Text style={{ color: Colors.grey, fontSize: 16 }}>
              {book.collections}
            </Text>
            <View
              style={{ marginTop: 20, display: "flex", flexDirection: "row" }}
            >
              <View style={{ position: "relative", width: "60%" }}>
                <Image
                  style={{ width: "100%", aspectRatio: 1, borderRadius: 6 }}
                  source={{ uri: book.coverPage[0] }}
                />
                {book?.newBook && (
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: Colors.tealc,

                      top: 30,
                      left: -10,
                      paddingHorizontal: 10,
                      borderRadius: 4,
                      paddingVertical: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: Colors.white, fontSize: 14 }}>
                      {book.newBook}
                    </Text>
                  </View>
                )}
                {book?.discount && (
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: Colors.tealc,
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      bottom: -8,
                      right: -8,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: Colors.white, fontSize: 18 }}>
                      {book?.discount}%
                    </Text>
                  </View>
                )}
              </View>
              <View
                style={{
                  width: "40%",
                  paddingHorizontal: 10,
                  justifyContent: "space-between",
                  paddingBottom: 20,
                }}
              >
                <View>
                  <Text
                    style={{
                      color: textColor,
                      textDecorationLine: book.discount
                        ? "line-through"
                        : "none",
                    }}
                  >
                    €{book.price}
                  </Text>
                  {book.discount && (
                    <Text style={{ fontSize: 18, color: Colors.tealc }}>
                      €{(book.price * (1 - book.discount / 100)).toFixed(2)}
                    </Text>
                  )}
                </View>
                <View style={{ rowGap: 14 }}>
                  <TouchableOpacity
                    onPress={
                      book.newBook === "soon"
                        ? () => {
                            dispatch(
                              updateFailNotification("Livro não disponível")
                            );
                          }
                        : () => {
                            dispatch(addProductToCart([book]));
                            dispatch(
                              updateSuccessNotification(
                                "Livro adicionado ao carrinho"
                              )
                            );
                          }
                    }
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        borderColor: Colors.tealc,
                        borderWidth: 2,
                        borderRadius: 6,
                        alignItems: "center",
                        justifyContent: "center",
                        columnGap: 10,
                        paddingVertical: 5,
                      }}
                    >
                      <Ionicons
                        name={"cart-outline"}
                        size={20}
                        color={
                          book.newBook === "soon" ? Colors.grey : Colors.tealc
                        }
                      />
                      <Text
                        style={{
                          color:
                            book.newBook === "soon"
                              ? Colors.grey
                              : Colors.tealc,
                        }}
                      >
                        Comprar
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={
                      isBookInFavorites
                        ? () => {
                            dispatch(
                              updateFailNotification(
                                "Livro já se encontra nos favoritos"
                              )
                            );
                          }
                        : () => {
                            dispatch(addProductToFavorites([book]));
                            dispatch(
                              updateSuccessNotification(
                                "Livro adicionado aos favoritos"
                              )
                            );
                          }
                    }
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        borderColor: textColor,
                        borderWidth: 2,
                        borderRadius: 6,
                        alignItems: "center",
                        justifyContent: "center",
                        columnGap: 10,
                        paddingVertical: 5,
                      }}
                    >
                      <Ionicons
                        name={"star-outline"}
                        size={20}
                        color={
                          book.newBook === "soon" ? Colors.grey : textColor
                        }
                      />
                      <Text
                        style={{
                          color:
                            book.newBook === "soon" ? Colors.grey : textColor,
                        }}
                      >
                        Favorito
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 6,
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: Colors.grey }}>E EM PAPEL?</Text>
                  <Ionicons
                    name={"information-circle-outline"}
                    size={20}
                    color={book.newBook === "soon" ? Colors.grey : Colors.grey}
                  />
                </View>
              </View>
            </View>

            <View style={{ paddingVertical: 20, rowGap: 2 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "800",
                  color: textColor,
                  textAlign: "justify",
                }}
              >
                Texto:{book.author}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "800",
                  color: textColor,
                  textAlign: "justify",
                }}
              >
                Ilustrador:{book.designer}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "800",
                  color: textColor,
                  textAlign: "justify",
                }}
              >
                Tradutor:{book.translator}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "800",
                  color: textColor,
                  textAlign: "justify",
                }}
              >
                Idioma:{book.language}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "800",
                color: textColor,
                textAlign: "justify",
              }}
            >
              Características:{book.caracteristics}
            </Text>
            <View
              style={{ flexDirection: "row", columnGap: 20, marginTop: 20 }}
            >
              <TouchableOpacity
                onPress={() => setMode("story")}
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor:
                    mode === "story" ? Colors.tealc : "transparent",
                }}
              >
                <Text
                  style={{
                    color: mode === "story" ? Colors.tealc : textColor,
                    fontSize: 20,
                  }}
                >
                  A HISTÒRIA
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  book?.collections ? setMode("collection") : null
                }
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor:
                    mode === "collection" ? Colors.tealc : "transparent",
                }}
              >
                <Text
                  style={{
                    color: mode === "collection" ? Colors.tealc : textColor,
                    fontSize: 20,
                  }}
                >
                  {book?.collections ? "A COLEÇÂO" : ""}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ minHeight: 400 }}>
              <Text style={{ color: textColor, marginTop: 10 }}>
                {mode === "story" ? book.resume : collections[0].resume}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BookShop;
