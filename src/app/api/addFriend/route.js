
import User from "@/lib/utils/models/authSchema";
import StatusCodes from 'http-status-codes'
import connectToDatabase from "@/lib/utils/connectDB/connectDb";
import {BadRequest,NotFound, UnauthenticatedError} from '../../../../lib/utils/errors/index'
import multer from "multer";
const upload=multer()
export async function POST(req){
        try {
            await connectToDatabase()
            const tempUser2=await User.findOne({_id:req.body.theirId})
            const user=await User.findOneAndUpdate({_id:req.body.myId},{$push:{Friends:{myName:req.body.myName,friendName:req.body.theirName,myId:req.body.myId,theirId:req.body.theirId,photo:tempUser2.Photo}}})
            const user2=await User.findOneAndUpdate({_id:req.body.theirId},{$push:{Friends:{myName:req.body.theirName,friendName:req.body.myName,myId:req.body.theirId,theirId:req.body.myId,photo:user.Photo}}})
        
            req.body.photo=user2.Photo
            return new Response(JSON.stringify(req.body),{status:StatusCodes.OK})
        } catch (error) {
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