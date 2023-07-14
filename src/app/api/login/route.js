
import User from "@/lib/utils/models/authSchema";

import StatusCodes from 'http-status-codes'
import connectToDatabase from "@/lib/utils/connectDB/connectDb";
import {BadRequest,NotFound, UnauthenticatedError} from '../../../../lib/utils/errors/index'
import multer from "multer";
const upload=multer()
export async function POST(req){
try {
    await connectToDatabase()
    const body=await req.json()
    if (!body.number || !body.password) {
        throw new BadRequest('Please provide number and password')
      }
      const user=await User.findOne({"number":body.number})
if(!user){
    throw new UnauthenticatedError('user not found')
}
const isPasswordCorrect = await user.passCheck(body.password)
if (!isPasswordCorrect) {
  throw new UnauthenticatedError('Invalid Credentials')
}
const token=user.createJWT()
return new Response(JSON.stringify({name:user.name,token:token,id:user._id,photo:user.Photo}),{status:StatusCodes.OK})
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
