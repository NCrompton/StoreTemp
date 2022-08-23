import { GetServerSideProps } from "next";
import {useState, useEffect} from "react"
import Element from "../components/element"
import Select from "../components/select"

function Course({result}: {[key: string]:any}){
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    console.log(result)

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3001/course").then((res) => res.json()).then((data) => {
            setData(data['recordsets'][0][0]['code']);
            setLoading(false);
        })
    },[])
    return(
        <div className="bg-slate-700 h-screen">
            <Element ty="you"><Select /></Element>
            <div>{data}</div>
            <div>{result["a"]}</div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async() => {
    
    const result = {"a":"b", "c":"d"}
    return {props: {result}}
}


Course.getLayout = function getLayout(course: string){
    return (
        <Element>
            {course}
        </Element>
    )
}

export default Course