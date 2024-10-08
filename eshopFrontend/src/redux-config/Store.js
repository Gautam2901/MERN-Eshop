import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./CategorySlice";
import UserSlice from "./UserSlice";
import CartItemSlice from "./CartSlice";

const store = configureStore({
    reducer: {
        Categories: CategorySlice,
        User: UserSlice,
        CartItem: CartItemSlice
    }
})
export default store;