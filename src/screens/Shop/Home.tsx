import { useEffect, useRef, useState } from "react";

import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import TopestBar from "../../components/TopBar";
import { firestore } from "../../config/firebaseConfig";
import { Colors } from "../../constants/pallete";
import { ROUTE_PATHS } from "../../constants/routes";
import useMainColors from "../../hooks/useMainColors";
import { Book } from "../../slicer/books/books.types";
import { setShopMode } from "../../slicer/homeFilters/homeFilters.actions";
import { ShopMode } from "../../slicer/homeFilters/homeFilters.types";
import { State } from "../../slicer/types";
import { i18n } from "../../translations/i18n";
import Banner from "./components/Banner";
//import Collection from "./components/Collections";
import MidCarousel from "./components/MidCarousel";
//import PageCollection from "./components/PageCollection";
import SearchProduct from "./components/SearchProduct";
import TopBar from "./components/TopBar";

const Shop = () => {
  const [books, setBooks] = useState<Book[]>();
  const [collections, setCollections] = useState<any>();
  const [searchField, setSearchField] = useState<string | null>(null);

  const shopMode = useSelector<State, ShopMode>(
    (state) => state.homeFilters.shopMode
  );

  const navigation = useNavigation();
  const didMountRef = useRef(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { backgroundColor, textColor, barStyle } = useMainColors();

  useEffect(() => {
    console.log("fetching books");

    firestore.collection("books").onSnapshot((query) => {
      const list: any[] = [];
      query.forEach((doc) => {
        list.push({ documentID: doc.id, ...doc.data() });
      });
      setBooks(list);
    });
  }, []);

  useEffect(() => {
    console.log("fetching collections");
    firestore.collection("collections").onSnapshot((query) => {
      const list: any[] = [];
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setCollections(list);
    });
  }, []);

  const addBooksToCollections = () => {
    if (books && collections && !didMountRef.current) {
      const collectionsWithBooks = collections.map((collection: any) => {
        if (!collection.books) {
          const matchingBooks = books.filter(
            (book) => book.collections === collection.title
          );
          return { ...collection, books: matchingBooks };
        }
        return collection;
      });
      setCollections(collectionsWithBooks);
      didMountRef.current = true;
    }
  };

  useEffect(() => {
    addBooksToCollections();
  }, [books, collections, isFocused]);

  useEffect(() => {
    didMountRef.current = false;
    if (!isFocused) {
      dispatch(setShopMode("default"));
      didMountRef.current = false;
    }
  }, [isFocused]);

  const renderMainPage = () => {
    return (
      <ScrollView style={{ marginBottom: 60 }}>
        <Banner books={books} />
        <MidCarousel
          type="news"
          title="Novidades"
          data={books?.filter((book) => book.newBook === "new") || []}
        />
        <MidCarousel
          type="collections"
          title="Coleções"
          data={collections || []}
          onTitleClick={() =>
            //@ts-ignore
            navigation.navigate(ROUTE_PATHS.SHOP_COLLECTIONS, {
              collections: collections,
            })
          }
        />
        <View style={{ height: 200 }} />
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.blackish }}>
      <View style={{ height: "100%", backgroundColor }}>
        <StatusBar barStyle={barStyle as any} />
        <TopestBar title={i18n.t("modules.shop.topestBar")} />
        <View>
          <TopBar
            books={books || []}
            collections={collections}
            setSearchField={setSearchField}
            shopMode={shopMode}
          />
          {renderMainPage()}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Shop;
