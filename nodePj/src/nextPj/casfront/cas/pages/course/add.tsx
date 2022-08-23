import { useState } from "react"
import axios from 'axios'

export default function Add(){

    const [code, setCode] = useState('');

    const submit = async() =>{
        if(confirm("please dont press this button" + code)){
            const data = await axios.get(`http://localhost:3001/course?course_id=${code}`).then((res) => res.data.recordset);
            console.log(data)
        }
    }

    return(
        <div>
            <div className="text-[30px] border-b border-dark-100 font-sans">
                Add
            </div>
            <>
                <div className="block">
                    <div className="block my-1">
                        <div className="flex mb-1">
                            Code: <input className="mx-1" onChange={(e) => setCode(e.target.value)}/>
                        </div>
                        <div className="flex mb-1">
                            Department: <input className="mx-1" onChange={(e) => setCode(e.target.value)}/>
                        </div>
                        <div className="flex mb-1">
                            Website: <input className="mx-1" onChange={(e) => setCode(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={()=>{submit()}} className="border border-dark-200 p-2 bg-slate-200 hover:bg-dark-100">Confirm</button>
                </div>
            </>
        </div>
    )
}