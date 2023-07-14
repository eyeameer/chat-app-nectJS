import asyncWrapper from "@/lib/utils/middleware/async";
import User from "@/lib/utils/models/authSchema";
import fs from 'fs'
import sharp from 'sharp'
import path from 'path'
import StatusCodes from 'http-status-codes'
import connectToDatabase from "@/lib/utils/connectDB/connectDb";
import {BadRequest,NotFound, UnauthenticatedError} from '../../../../lib/utils/errors/index'
import sanitizeHTML from "sanitize-html";
import multer from "multer";
const upload=multer()
export async function  POST(req){
    try {

        await connectToDatabase();
        
        const body=await req.json()
        console.log(body)
        console.log("connectedToDb");
        if (!body.number || !body.password || !body.name) {
          throw new BadRequest('Please provide name, number and password');
        }
        const user = await User.create({ ...body });
        const token = user.createJWT();
        return new Response(
          JSON.stringify({ name: user.name, token: token, id: user._id, photo: user.Photo }),
          { status: StatusCodes.OK, headers: { 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        if (error instanceof BadRequest) {
          return new Response(
            JSON.stringify({ message: error.message }),
            { status: StatusCodes.BAD_REQUEST, headers: { 'Content-Type': 'application/json' } }
          );
        } else {
          return new Response(
            JSON.stringify({ message: error.message }),
            { status: StatusCodes.INTERNAL_SERVER_ERROR, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }
    }