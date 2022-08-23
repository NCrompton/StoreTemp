import { Action, AnyAction, createAsyncThunk, createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { stat } from 'fs'

export type CounterState = {
    value: number,
    status: 'idle' | 'loading' | 'failed'
}
const initialState: CounterState = {
    value: 0,
    status: 'idle'
}

export const testReducer: Reducer<Array<any>, AnyAction> = (state: Array<any> = [5], action: {[key:string]:any}) => {
    console.log(action.type)
    switch (action.type){
        case 'NEW':
            //state.push(action.data);
            return state.concat(action.data);
    }
    return state;
}
type FetchCount = {
    data: number
}

async function fetchCount(amount: number): Promise<FetchCount> {
    return new Promise<FetchCount>((resolve) => {
        setTimeout(() => {resolve({data: amount})}, 1000)});
}

export const incrementAsync = createAsyncThunk(
    "counter/fetchCount",
    async(amount:number) => {
        const res = await fetchCount(amount);
        return res.data
    }
)

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        incrementAmount: (state, action: PayloadAction<{[key:string]:any}>) => {
            const {amount} = action.payload;
            state.value += amount;
        },
    },
    extraReducers: (builder) =>{
        builder.addCase(incrementAsync.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(incrementAsync.fulfilled, (state, action) => {
            state.status = 'idle'
            state.value += action.payload
        })
    }
})

export const arraySlice = createSlice({
    name: "list",
    initialState: {value: [5], status:'idle'},
    reducers: {
        incrementList: (state) => {
            state.value.push(5);
            console.log(state.value)
        }
    }
})

export type Word = {
    question: string,
    answer: string,
}
export type WordList = {
    questionl: Array<Word>
}
const questions: WordList = {
    questionl: new Array({question: "What is your name", answer: "Lyric"})
}
export const wordListSlice = createSlice({
    name: "wordlist",
    initialState: {value: questions},
    reducers: {
        addQuestion: (state, action: PayloadAction<Word>) => {
            state.value.questionl.push(action.payload)
        }
    }
})