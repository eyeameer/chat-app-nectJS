const {StatusCodes}=require("http-status-codes")
import Message from "@/lib/utils/models/chatsSchema";
import connectToDatabase from "@/lib/utils/connectDB/connectDb";
import User from "@/lib/utils/models/authSchema";
import { middlewareTest } from "@/lib/utils/middleTest";
import { verify } from "jsonwebtoken";
import { BadRequest } from "@/lib/utils/errors";
import sharp from "sharp";
export async function POST(req){
try {
    const body=await req.json()
    console.log(body)
    const base64 = body.photo.replace(/^data:image\/[a-z]+;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');
    // Use sharp to modify the image
    const resizedBuffer = await sharp(buffer)
      .resize(200, 200, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 60 })
      .toBuffer();
    // Convert the modified image to a data URL
    // const base644 = `data:image/jpeg;base64,${resizedBuffer.toString('base64')}`;
    const base644 = resizedBuffer.toString('base64')
    console.log(base644)
    const photo=await User.updateOne({_id:body.id},{$set:{"Photo":base644}})
    // res.status(200).json({ photo: base64 });
    return new Response(JSON.stringify({photo:base644}),    { status: 200, headers: { 'Content-Type': 'application/json' } })
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

    // return new Response(JSON.stringify({dataa:true}))
    
}
