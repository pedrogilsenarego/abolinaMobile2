import { Book } from "../books/books.types";
import { FavoritesProduct } from "./favorites.types";

interface Props {
  prevCartItems: FavoritesProduct[];
  nextCartItems: Book[];
}

export const handleAddToCart = ({ prevCartItems, nextCartItems }: Props) => {
  const updatedCartItems = prevCartItems.slice(); // create a copy of the previous cart items array
  for (let i = 0; i < nextCartItems.length; i++) {
    const nextCartItem = nextCartItems[i];
    const existingCartItemIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem.product.documentID === nextCartItem.documentID
    );
    if (existingCartItemIndex !== -1) {
      return;
    } else {
      // item doesn't exist in cart, add it
      updatedCartItems.push({
        product: nextCartItem,
        notifications: false,
      });
    }
  }
  return updatedCartItems;
};
