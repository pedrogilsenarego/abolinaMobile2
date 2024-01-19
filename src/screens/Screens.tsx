import * as React from "react";
import BookC from "../../src/screens/BookC";

import BookReader from "./BookReader";
import Favorites from "./Favorites";
import HomeC from "./Home/Home";
import NewShelves from "./Home/components/NewShelves";

import Shelves from "./Home/components/Shelves";
import MainMenu from "./MainMenu";
import Settings from "./MainMenu/Settings";
import Offer from "./Offer";

import BookShop from "./Shop/Book";
import Cart from "./Shop/Cart";
import Checkout from "./Shop/Checkout";
import CollectionShop from "./Shop/Collection";
import Collections from "./Shop/Collections";
import ShopC from "./Shop/Home";
import Menu from "./Shop/Menu";
import Search from "./Shop/Search";

export const HomeScreen = () => {
  return <HomeC />;
};

export const FavoritesScreen = () => {
  return <Favorites />;
};

export const OfferScreen = () => {
  return <Offer />;
};

export const ShopScreen = () => {
  return <ShopC />;
};

export const MainMenuScreen = () => {
  return <MainMenu />;
};

export const BookScreen = ({ route }: any) => {
  const { book } = route.params;
  return <BookC book={book} />;
};

export const BookReaderScreen = () => {
  return <BookReader />;
};
export const ShelvesScreenConfig = ({ route }: any) => {
  const { preLoadedBooks } = route?.params || { preLoadedBooks: [] };
  return <NewShelves preLoadedBooks={preLoadedBooks} />;
};

export const ShelvesScreen = () => {
  return <Shelves />;
};

export const CartScreen = () => {
  return <Cart />;
};

export const CheckoutScreen = () => {
  return <Checkout />;
};

export const SettingsScreen = () => {
  return <Settings />;
};

export const ShopMenuScreen = ({ route }: any) => {
  const { collections } = route?.params || { collections: [] };
  return <Menu collections={collections} />;
};

export const ShopBookScreen = ({ route }: any) => {
  const { book } = route?.params || { book: {} };
  return <BookShop book={book} />;
};

export const ShopSearchScreen = ({ route }: any) => {
  const { books } = route?.params || { books: [] };
  return <Search books={books} />;
};

export const ShopCollectionsScreen = ({ route }: any) => {
  const { collections } = route?.params || { collections: [] };

  return <Collections collections={collections} />;
};

export const ShopCollectionScreen = ({ route }: any) => {
  const { collection } = route?.params || { collection: [] };

  return <CollectionShop collection={collection} />;
};
