import User from '../models/authSchema'
const Jwt=require('jsonwebtoken')
import asyncWrapper from './async'
import {BadRequest, UnauthenticatedError} from '../errors/index'

const authorization=async(req,res)=>{
    const auth=req.headers.authorization
    if(!auth || !auth.startsWith('Bearer')){
        throw new UnauthenticatedError('connection invalid')

    }
try {
    const token=auth.split(' ')[1]
    const payload=Jwt.verify(token,process.env.JWT_SECRET)
req.user={userId:payload.id,username:payload.userName}
next()
} catch (error) {
    throw new UnauthenticatedError('Authentication failed')
}



}
export default authorization