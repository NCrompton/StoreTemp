import { NextApiRequest, NextApiResponse } from "next";

type Post = {
    id: number
}
const posts: Post[] = [{id: 1}, {id: 2}, {id: 3}]

export default function handler(req: NextApiRequest, res: NextApiResponse){
    res.status(200).json(posts)
}