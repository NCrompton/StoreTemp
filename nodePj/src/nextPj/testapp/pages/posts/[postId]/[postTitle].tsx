import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useRouter } from 'next/router'

export default function PostTitle({post}: {[key: string]: any}){
    const router = useRouter();
    if(router.isFallback){
        return <div>Loading...</div>
    }

    console.log(post)
    return(
        <div>
            {post.postId}
            {post.postTitle}
        </div>
    )
} 

export async function getStaticProps(context: {[key:string]:any}){
    const { params } = context;
    //console.log(context);
    if(params.postTitle === "ok"){
        return {notFound: true}
    }
    return(
        {
            props:{post: params}
        }
    )
}

export async function getStaticPaths(){
    return({
        paths:[],
        fallback: true}
    )
}