import { useRouter } from 'next/router';
import { useState } from 'react';
import { Course } from '../../interface/Course'
import { IconMinus } from '@tabler/icons'
import { redirect } from 'next/dist/server/api-utils';

export default function CourseID({post, details}: {[key:string]:Array<any>}){
    const router = useRouter();
    const courseid = post[0].course_id
    if(router.isFallback){
        return <div>Loading...</div>
    }
    const removeEntry = async () => {
        if(confirm("please dont press this button" + courseid)){
            const response = await fetch(`http://localhost:3001/course?course_id=${courseid}`, {method:'GET'})
            const data = await response.json()
            console.log(data)
            
        }
    }
    return(
        <div className="">
            <div className="flex">
                <div className="block border rounded-md hover:border-dark-200 cursor-pointer" onClick={()=>removeEntry()}>
                        <IconMinus />
                </div>
            </div>
            {post.map((v:Course) => <ShowDetail course={v} detail={details}/>)}
        </div>
    )
}

export async function getStaticProps(context: {[key:string]:any}){
    const { params } = context;
    console.log(params);
    const response = await fetch(`http://localhost:3001/course?course_id=${params.id}`, {method: 'GET'})
    const data = await response.json().then((d) => d.recordset);
    const detailresponse = await fetch(`http://localhost:3001/coursedetail?course_id=${params.id}`, {method: 'GET'})
    const detaildata = await detailresponse.json().then((d) => d.recordset);
    console.log(detaildata)
    console.log('done')
    return(
        {
            props:{post: data, details: detaildata}
        }
    )
}

export async function getStaticPaths(){
/*     const response = await fetch(`http://localhost:3001/course/all`, {method: 'Get'})
    const data = await response.json(); */ 
    const available: Array<string> = ['1', '2', '3']
    return({
        paths: available.map((n) => {return{params: {id : n}}}),
        fallback: false}
    )
}

function ShowDetail({course, detail}: {[key:string]:any}){
    const [active, setActive] = useState(false);
    
    return(
        <div className="flex-wrap">
            <div className="">
                ID : {course.course_id}
            </div>
            <div className="flex">
                Code : 
                <div className="cursor-pointer" onClick={() => setActive(true)}>{active? <div><input placeholder={course.code}/><button onClick={() => {}} className="border block">Submit</button></div>: course.code}</div>
            </div>
            <div className="">
                Department : {course.dept}
            </div>
            <div className="">
                Website : <a href={course.website}>{course.website}</a>
            </div>
            <div className="">
                {detail.map((d:any) => <div>{d.name}</div>)}
            </div>
        </div>
    )
}