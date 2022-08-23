import { counterSlice, arraySlice, wordListSlice, incrementAsync} from '../app/hook'
import type {Word} from '../app/hook'
import { Provider, shallowEqual, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { createStore } from 'redux';
import store, {AppState, AppDispatch} from '../app/store'
import { FormEvent, FormEventHandler, HTMLAttributes, useEffect, useState } from 'react';
import style from '../styles/Pool.module.css'
import useSWR, { SWRConfig } from 'swr';
import styled from 'styled-components'

export default function Pool(){
    const useAppSelecetor: TypedUseSelectorHook<AppState> = useSelector;
    const useAppDispatch = () => useDispatch<AppDispatch>();
    const dispatch = useAppDispatch();
    
    const selectCount = (state: AppState) => state.counter.value
    const selectList = (state: AppState) => state.list.value
    const selectQuestion = (state: AppState) => state.wordlist.value
    const selectTest = (state: AppState) => state.test
    const {increment, incrementAmount} = counterSlice.actions 
    const {incrementList} = arraySlice.actions
    const {addQuestion} = wordListSlice.actions
    const count = useAppSelecetor(selectCount)
    const list = useAppSelecetor(selectList)
    const question = useAppSelecetor(selectQuestion).questionl
    const test = useSelector(selectTest, shallowEqual);

    const [questions, setQuestions] = useState("");
    const [answer, setAnswer] = useState("");
    const fetcher = async(url: any) => await fetch(url).then(r => r.json())
    const { data, error } = useSWR('/api/hello', fetcher)

    const handleSubmit = (e: FormEvent) => {
        const newQ: Word = {
            question: questions,
            answer: answer
        }
        dispatch(addQuestion(newQ));
        e.preventDefault
        console.log(questions)
        return false
    }
    return(
        <div className="block bg-slate-300 w-screen h-full">
            <div className="flex justify-center">
                <button className="bg-slate-400 rounded-md h-10 w-24 mx-2" onClick={(e) => {dispatch(addQuestion({question: "What is that", answer: "Nothing"})); console.log(e.target)}}>Add To List</button>
                <button className="block w-20 h-10 rounded-md border bg-slate-400 justify-center" 
                    onClick={() => {dispatch(increment()); dispatch(incrementList())}}>{count} / {list}</button>
            </div> 
            <div className="block justify-center my-5">
                <div className="block border rounded-md border-slate-500">
                    {question.map((w: Word, index)=> 
                        <div className="hover:bg-slate-200 last:rounded-b-md first:rounded-t-md" 
                            key={index}
                            data-user="go"
                            onClick={(e)=>{console.log(e.target)}}>
                            {w.question}: {w.answer}
                        </div>
                    )}
                    <Test test="run" io="walk" sing="song" />
                </div>
                <div className="block">
                    <button className="w-24 h-8 bg-blue-200" onClick={() => {return dispatch({type: 'NEW', data: "go"})}}>{test}</button>
                    <button className="w-24 h-8 bg-red-200" onClick={() => {return dispatch(incrementAsync(3))}}>{count}</button>
                    <input className="bg-slate-300 rounded-b-md hover:bg-slate-200" value={count} onChange={(e) => incrementAmount({amount: e.target.value})}></input>
                    <div className="block border">
                        <form onSubmit={handleSubmit} className="">
                            <div className="">
                                <input name="question" type="text" className="bg-slate-200 rounded-md hover:bg-slate-100 mx-2" onChange={(e) => setQuestions(e.target.value)} />
                                <input className="bg-slate-200 rounded-md hover:bg-slate-100 mx-2" onChange={(e) => setAnswer(e.target.value)} />       
                            </div>
                        </form>
                        <div className="flex p-2">
                            <button className="border rounded-md bg-slate-200 hover:bg-slate-100 px-2" onClick={handleSubmit}>Submit</button>
                        </div>
                        <div>
                            <div>Current Question set value :</div>
                            <div>{questions}: {answer}</div>
                        </div>
                    </div>
                </div>
                <div className={style.trex}>
                    {test}
                </div>
                <div className={style.trex}>
                    {typeof data !== 'undefined'? data.name: "Waiting"}
                </div>
                <Infinite iter={50}>

                </Infinite>
            </div>
        </div>
    )
}

Pool.getLayout = function getLayout(pool: string){
    return(
        <Provider store={store}>
            {pool}
        </Provider>
    )
}

function Test({test}: {[key:string]:any}){
    console.log(test)
    return (
        <div>

        </div>
    )
}

function Infinite({ iter }: {[key:string]: any}){
    //var list: Array<JSX.Element> = [];
    //var opened = iter > 10?10: iter;
    const [opened, setOpen] = useState(iter > 10?10: iter);
    const [list, setList] = useState(new Array<JSX.Element>)
    var current = 0;
    const render = () => {
        setList(Array.from(Array(opened).keys()).map((n:number) => <div className="py-4 border flex-wrap">This is number {n}</div>))
    }
    const expend = () => {
        current = opened;
        setOpen(opened + 10 < iter? opened + 10: iter);
        console.log(opened)
    }
    useEffect(() => {
        render();
        console.log(list);
    }, [opened])
    const height: string = (58 * opened).toString() + "px";
/*     const ListView = styled.div`
        &:hover{
            height:${height}px;
        }
    `; */
    return (
    <div className="flex-wrap transition duration-700 hover:h-full">
        <div className="flex-wrap overflow-hidden h-[60px] transition-[height] duration-500" style={{height: height}}>
            {list}
        </div>
        <div className="flex justify-center transition ">
            {opened}
            <button className="border rounded-md border-slate-600 px-5" onClick={() => expend()}>Expand</button>
        </div>
    </div>
    )
}
