import React, {useState, useEffect, SetStateAction} from 'react';
import logo from './logo.svg';
import './App.css';
import { useCookies } from 'react-cookie';

function App() {
  const [data, setData] = useState<number>(5);
  const [change, setChange] = useState<boolean>(true);
  const [cookies, setCookie] = useCookies(['name'])
  const [visit, setVisit] = useCookies(['visited'])

  useEffect(() => {
    setData(data + 4);
    setCookie('name', "Creating", { path: '/'});
  },[change])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>{data}</p>
        <TestEle bool={change} data={data} change={setData} num={setChange}></TestEle>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React {cookies.name}
        </a>
        <div>
          {visit.visited}
        </div>
      </header>
    </div>
  );
}

const TestEle: React.FC<{
  data: number;
  change: React.Dispatch<SetStateAction<number>>;
  num: React.Dispatch<SetStateAction<boolean>>;
  bool?: boolean;
}> = ({data, change, num, bool}) => {
  return(
    <div>
      <p>{data}</p>
      <button className="block" onClick={() => {change(data + 5);num(false)}}>press</button>  
      <button className="bg-slate-500" onClick={() => {num(!bool)}}>changeboolean</button>  
    </div>
  )
}

export default App;
