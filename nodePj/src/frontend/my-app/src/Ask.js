import React, {useState, useEffect} from "react"

class Ask extends React.Component{
    
    render(){
        
        return(
            <CasData/>
        )
        /**return React.createElement("CasData", null, "the number is ", this.props.num1),
        React.createElement("h2", null, "gee gee gee"),
        React.createElement("button", null, parseInt(this.props.num1) * parseInt(this.props.num2));**/
    }
}

function CasData(props){
    const stringifyData = data => JSON.stringify(data, null, 3);
    const initialState = stringifyData({data: null});
    const loadingState = stringifyData({data: 'loading...'});
    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState(false);

    useEffect(
        () => {
            const fetchData = () => {
                setLoading(true);
                const uri = 'http://127.0.0.1:3001/course?course_id=3';
                fetch(uri, {method: 'GET'}).then(
                    res => res.json()).then((result) => {
                        console.log(result['recordsets'][0][0])
                        setLoading(false);
                        const {course_id, code, dept, other} = result['recordsets'][0][0]
                        /**const dataVal = stringifyData({
                            course_id,
                            code,
                            dept,
                            ...other,
                        })
                        console.log(dataVal)**/
                        setData(result['recordsets'][0][0]);
                    })
            }
            fetchData();
        },
        [change]
    )

    return(
        <div>
            <button className="border rounded-md bg-slate-600" onClick={() => setChange(!change)}>Update</button>
            <span>{loading? <pre>{loadingState}</pre> : <CasDisplay data={data}/>}</span>
        </div>
    )

}

function CasDisplay(props){
    const data = props.data
    const input = Object.entries(data).map(([k, v]) => {if(v != "") return <li>{k} = {v}</li>})
    console.log(input);
    return (
        <div><ul>{input}</ul></div>
    )
}

export default Ask