import logo from './logo.svg';
import './App.css';
import Test from './Test.js'
import Main from './Main.js'
import Ask from './Ask.js'
import Navbar from './Navbar.js'
import ReactDom from "react-dom"
import {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function changeGood(good){
  return good += 2;
}

function App() {
  const [good, setGood] = useState(0);
  useEffect (() => {
    setGood(good + 2);
  },[])

  return (
    <div className="App bg-slate-500">
      <Navbar inc="5" good={good} onchange={setGood}/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React <code>({good})</code>
        </a>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main num='good'></Main>}></Route>
            <Route path="/test" element={<Test></Test>}></Route>
            <Route path="/ask" element={<Ask num1='3' num2='4'></Ask>}></Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
