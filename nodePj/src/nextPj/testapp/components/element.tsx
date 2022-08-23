import react, { useState } from 'react'

export default function Element({preview, children}: {[key: string]: any}){
    console.log(preview)
    const [data, getData] = useState(5);

    return(
        <div className="flex py-5 bg-slate-400 justify-center w-screen">
            <div className="block round-md bg-slate-300">Good Mornging {data}</div>
            <div>{children}</div>
        </div>
    )
}