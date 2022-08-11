import React, { Profiler, useState, useEffect, useReducer, useRef } from "react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core"
import {faCoffee, faPanorama} from '@fortawesome/free-solid-svg-icons'
//import $ from 'jquery';

library.add(faCoffee, faPanorama)

class Navbar extends React.Component{
    render(){
        return (
            <div className="float-left h-full" id="nav">
                <Profiler id="navbar">
                <span className=""><a href="/main"><FontAwesomeIcon icon={faPanorama} size="xl" border/></a></span>
                <FontAwesomeIcon icon="coffee"/>
                <button className="btn-nav" onClick={this.incrementCount}>{this.state.count}{this.state.ram}</button>
                <button className="btn-nav" onClick={e => this.handleClick(e)}>Hi</button>
                <button className="btn-nav">Hi</button>
                <button className="btn-nav">{this.state.date.toLocaleTimeString()}</button>
                <p className="text-rd">Witaj</p>
                <ListItem num={this.state.number} onhandle={this.handleClick}></ListItem>
                <div className="absolute bottom-0 my-2">
                    <button className="btn-nav" onClick={this.loggin}>Click now</button>
                    <p className="overflow-hidden block text-xs">Auf Wiedersehen</p>
                    <p className="overflow-hidden block text-xs">do widzenie</p>
                    <p className="overflow-hidden block text-xs">{this.state.comment}</p>
                    <Picture good={this.props.good} onchange={this.props.onchange}/>
                </div>
                </Profiler>
            </div>
        )
    }

    constructor(props){
        super(props);
        this.state = {
            count: 0,
            ram: 3,
            cpu: 6,
            case: 1,
            date: new Date(),
            comment: "Gute Nacht",
            number: [1, 2, 3, 5],
            map: {1:1, 2:2, 3:3, 4:4},
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        var tmp = this.state.number;
        tmp[e] += 1;
        this.setState(pstate => ({
            number: tmp
        }))
        console.log(e);
    }

    tick(){
        this.setState({
            date: new Date()
        });
        if(8 < this.state.date.getHours() < 18){
            this.setState({comment: "Guten Tag"});
        }else{
            this.setState({comment: "Gute Nacht"});
        }
    }

    loggin = () =>{
        console.log(this.state.date.getUTCHours());
    }

    incrementCount = () => {
        const inc = Math.sin(10);
        this.setState((state, props) =>(
            {count: state.count + parseInt(props.inc)})
        );
        /**this.setState(
            {count: this.state.count + parseInt(this.props.inc)}
        )**/
    }

    componentDidMount(){
        //this.testButton();
        this.timerId = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    /**testButton(){
        $("#nav").children("button").click(function(){
            $("#nav p").css('color', "red");
            console.log("clicked");
        })
    }**/
}

function Picture(props){
    const [ron, setRon] = useState(0);
    const initialState = {width: 0}
    const initializeState = () => ({width: 0})
    const reducer = (state, action) => {
        switch (action) {
            case 'a':
                return {width: state.width + 1}
            case 'b':
                return {width: state.width - 1}
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState, initializeState);
    const [good, setGood] = [props.good, props.onchange]
    const btn1 = useRef(null);

    useEffect(() => {
        setRon(p => p + 3)
        return () => {
            document.title = `no Ron number`
        }
    },[])
    useEffect(() => {
        document.title =  `Ron number is ${btn1.current.value}`
    })

    return (
        <div>
            <FontAwesomeIcon icon="coffee"></FontAwesomeIcon>
            <button ref={btn1} onClick={() => {
                setRon(ron + 1);
                dispatch('a');
                setGood(good + 2);
            }}>{ron}</button>
            <div className={"bg-red-500 h-3 w-" + state.width}>{good}</div>
        </div>
    )
}

function ListItem(props){
    const number = props.num;
    const itemList = number.map((n, index) => {
        return <li className="block cursor-pointer" id={index} key={index} onClick={e => props.onhandle(e.target.id)}>{n}</li>
    });
    return (
        <ul>{itemList}</ul>
    )
}

export default Navbar