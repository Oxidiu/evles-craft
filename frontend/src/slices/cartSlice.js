import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal'};

// Functie de ajutor pentru a rotunji numerele si a adauga 2 zecimale


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id)
            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            const removeId = action.payload;
            state.cartItems = state.cartItems.filter((x) => x._id !== removeId);
            return updateCart(state)
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        changeAmount: (state, action) => {
            const amountData = action.payload;
            const { id, newAmount } = amountData;
            let foundIndex = state.cartItems.findIndex((x) => x._id == id);
            if (newAmount === 0) {
                state.cartItems = state.cartItems.filter((x) => x._id != id)
            } else {
                state.cartItems[foundIndex].amount = newAmount;
            }
            return updateCart(state);
        }

    },
});
export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions;

export default cartSlice.reducer
