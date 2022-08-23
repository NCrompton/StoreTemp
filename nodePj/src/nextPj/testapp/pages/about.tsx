import type { GetStaticPaths, NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Element from '../components/element'
import Image from 'next/image'
import tokyoImage from '../public/tokyo.jpg' 
/* function About({Component, pageProps}: AppProps){
    return <div>About</div>
} */

const AboutPage = (post: {[key: string]: any}) => {
    const router = useRouter();
    if(router.isFallback){
        return <div>Loading...</div>
    }
    console.log(post['post'][0])
    var npost: Array<any> = []
    for(let n = 0; n < 5; n++){
        for(let k in post['post'][n]){
            npost.push(<p>{k} = {post['post'][n][k]}</p>);
        }
    }
    return (
<div>
    <div className="border bg-slate-500">About</div>
    <button className="bg-blue-200" >press</button>
    <Image src={tokyoImage} alt="This is an image"></Image>
    <div>{npost}</div>
</div>
)
}

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
}

 export const getStaticProps: GetStaticProps = async ({params}) => {
    const res = await fetch(`http://127.0.0.1:3001/course`)
    const posts = await res.json()
    const tup: Array<{[key: string]: any}> = posts['recordsets'][0]

    return {
        props: {post: tup}
    }

}

AboutPage.getLayout = function getLayout(about: string){
    return(
        <Element>
            {about}
        </Element>
    )
}

/*export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch("http://127.0.0.1:3001/course")
    const posts = await res.json();
    const tup: Array<{[key: string]: any}> = posts['recordsets'][0]

    const paths = tup.map((post: {[key: string]: any}) => ({
        params: {num: post['course_id']}
    }))
    console.log(paths);
    return {paths, fallback: false}
}
 */
export default AboutPage