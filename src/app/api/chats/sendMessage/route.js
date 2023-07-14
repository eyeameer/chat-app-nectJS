const {StatusCodes}=require("http-status-codes")
import Message from "@/lib/utils/models/chatsSchema";
import connectToDatabase from "@/lib/utils/connectDB/connectDb";

import { middlewareTest } from "@/lib/utils/middleTest";
import { verify } from "jsonwebtoken";
import {BadRequest,UnauthenticatedError} from '../../../../../lib/utils/errors/index'
export async function POST(req){
  
    try {
        const auth=req.headers.get("Authorization")
        console.log(auth)
        if(!auth || !auth.startsWith('Bearer')){
          throw new UnauthenticatedError('connection invalid')
  
      }
      const token=auth.split(' ')[1]
      console.log(process.env.JWT_SECRET)
      const payload=verify(token,process.env.JWT_SECRET)
      
        req.user={userId:payload.id,username:payload.userName}
     
        const body=await req.json()
        await connectToDatabase()
        body.createdBy=req.user.userId
        let user=await Message.find({id:req.user.userId+body.theirId})
        if(user.length===0){
           user=await Message.find({id:body.theirId+req.user.userId})
        }
        const time=new Date()
   if(user.length>0){
       const message=await Message.updateOne({id:user[0].id},{
       $push:{messages:{id:body.createdBy,message:body.messages.message,time:time.getTime()}
               }})
       return new Response(JSON.stringify(message),{status:StatusCodes.OK})
   }else{
   // const newUser=await Message.create({theirId:body.theirId,messages:[],createdBy:body.createdBy})
   const friendUser=await Message.create({id:body.createdBy+body.theirId,messages:[{id:body.createdBy, message:body.messages.message,time:time.getTime()}]})
   return new Response(JSON.stringify({main:friendUser}),{status:StatusCodes.OK})
       }
  return new Response(JSON.stringify({mssg:"failed"}),{status:StatusCodes.EXPECTATION_FAILED})
      
    } catch (error) {
      console.log(error)
        if (error instanceof BadRequest) {
            return new Response(
              JSON.stringify({ message: error.message }),
              { status: StatusCodes.BAD_REQUEST, headers: { 'Content-Type': 'application/json' } }
            );
          } else {
            return new Response(
              JSON.stringify({ message: error.message }),
              { status: StatusCodes.INTERNAL_SERVER_ERROR, headers: { 'Content-Type': 'application/json' } })
            }
    }
}