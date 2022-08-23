import { configureStore } from "@reduxjs/toolkit";

const makeStore = () => {
    return configureStore({
        reducer: {}
    })
}

const store = makeStore();