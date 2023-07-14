
import User from "@/lib/utils/models/authSchema";
import StatusCodes from 'http-status-codes'
import {BadRequest,NotFound, UnauthenticatedError} from '../../../../../lib/utils/errors/index'
import connectToDatabase from "@/lib/utils/connectDB/connectDb";
export async function GET(req,{params}){
        try {
            await connectToDatabase()
            const number=params.id
            const user=await User.findOne({number})
            if(!user){
                throw new NotFound('user not found')
            }
            user.password=''
            return new Response(JSON.stringify(({name:user.name,id:user._id,number:user.number,Photo:user.Photo})),{status:StatusCodes.OK})
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