import User from "@/lib/utils/models/authSchema";

import StatusCodes from 'http-status-codes'
import connectToDatabase from "@/lib/utils/connectDB/connectDb";
import {BadRequest,NotFound, UnauthenticatedError} from '../../../../../lib/utils/errors/index'
import multer from "multer";
const upload=multer()
export async function GET(req,{params}){
        try {
            await connectToDatabase()
            const myId=params.myId
            console.log(myId)
            const friends=await User.findOne({_id:myId})
            return new Response(JSON.stringify({friends:friends.Friends}),{status:StatusCodes.OK})
        }
        catch (error) {
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
