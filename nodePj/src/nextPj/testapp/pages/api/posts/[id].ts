import { NextApiRequest, NextApiResponse } from "next";
import {setCookie} from '../../../app/cookie'

export default function userHandler(req:NextApiRequest, res:NextApiResponse){
    const { query: { id }, method } = req;
    setCookie(res, "Test", true)
    res.status(200).json({id: id, method: method})
}