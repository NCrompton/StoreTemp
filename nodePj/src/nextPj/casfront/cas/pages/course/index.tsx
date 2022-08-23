import { Alert } from 'flowbite-react'
import { useRouter } from 'next/router';
import ShowAll from '../../components/showall'
import type { Course } from '../../interface/Course'
import { IconPlus } from '@tabler/icons'
import Link from 'next/link';

export default function Course({data}: {[key:string]:Array<Course>}){
    
    console.log(data);
   
    const dataset: Array<Course> = data; 
    const router = useRouter();
    if(router.isFallback){
        return <div>Loading...</div>
    }

    return(
        <div className="">
            <div className="flex border-b border-dark-100 text-[30px] font-sans">
                Course Selection
                <div className="border rounded-md ml-auto hover:border-dark-200 m-3 cursor-pointer"><Link href="/course/add"><IconPlus /></Link></div>
            </div>
            {data.map((d, index) => <ShowAll data={d} className="hover:bg-dark-100 cursor-pointer" key={index} href={'/course/' + d.course_id}/>)}
           <ListView show={false} />
        </div>
    )
}

export async function getServerSideProps(){
    const response = await fetch('http://localhost:3001/course', {method: 'GET', mode:'cors'});
    const jsondoc = await response.json();
    const data: Array<Course> = await jsondoc.recordset;
    console.log(data)

    return(
        {props: {data}}
    )
}

function ListView({entry, show}: {[key:string]:any}){
    const display = show? "": "hidden"
    return (
        <form className={display}>
            <div className="">
                ID
            </div>
            <div className="">
                Course Code
            </div>
            <div className="">
                Department
            </div>
            <div className="">
                Website
            </div>
        </form>
    )
}