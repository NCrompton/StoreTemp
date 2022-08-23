import { configureStore, createSlice, EnhancedStore } from '@reduxjs/toolkit'
import { counterSlice, arraySlice, wordListSlice, testReducer } from './hook'

const makeStore = () => {
    return configureStore({
        reducer: {counter: counterSlice.reducer, list: arraySlice.reducer, wordlist: wordListSlice.reducer, test: testReducer}
    })
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store