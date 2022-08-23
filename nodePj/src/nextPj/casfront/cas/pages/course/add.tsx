import { useState } from "react"
import axios from 'axios'

export default function Add(){

    const [code, setCode] = useState('');

    const submit = async() =>{
        if(confirm("please dont press this button" + code)){
            const data = axios.get(`http://localhost:3001/course?course_id=${code}`).then((res) => res.data.recordset);
            //const response = await fetch(`http://localhost:3001/course?course_id=${code}`, {method:'GET'})
            //const data = await response.json()
            console.log(data)
        }
    }

    return(
        <div>
            <div className="text-[30px] border-b border-dark-100 font-sans">
                Add
            </div>
            <form>
                <div className="block">
                    <div className="flex my-1">
                        Code: <input className="mx-1" onChange={(e) => setCode(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <button onSubmit={()=>{submit()}}>Confirm</button>
                </div>
            </form>
        </div>
    )
}