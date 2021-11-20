import { CartActionTypes } from "./cart.types";

export const toggleCartHidden = (user) => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEM,
});

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEMS,
  payload: item,
});
