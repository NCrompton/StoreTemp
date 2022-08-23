import Link from "next/link";
import { IconMinus } from '@tabler/icons'

export default function ShowAll({data, className, key, href}: {[key:string]:any}){
    const {course_id, code} = data
    const classN = className + " flex group";
    const link = href || "/";
    const removeEntry = async () => {
        if(confirm("please dont press this button" + link)){
            const response = await fetch(`http://localhost:3001/course?course_id=${course_id}`, {method:'GET'})
            const data = await response.json()
            console.log(data)
        }
    }

    return (
        <div className={classN} key={key}>
            <a href={link} className="block w-[93%]">
                <div className="flex">
                    <div className="px-5" style={{width: '20%'}}>{course_id}</div>
                    <div className="" style={{width: '60%'}}>{code}</div>
                </div>
            </a>
            <div className="border rounded-lg hidden group-hover:block border-dark-300 hover:border-dark-500 ml-auto mr-3">                
                <IconMinus size={23} className="" onClick={()=>{removeEntry()}} />
            </div>
        </div>
    )
}