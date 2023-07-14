// const {StatusCodes}=require("http-status-codes")
// import Message from "@/lib/utils/models/chatsSchema";
// import connectToDatabase from "@/lib/utils/connectDB/connectDb";
// const mongoose = require('mongoose');
// import { middlewareTest } from "@/lib/utils/middleTest";
// import { verify } from "jsonwebtoken";
// import { NextResponse } from 'next/server';
// import {BadRequest,UnauthenticatedError} from '../../../../../../lib/utils/errors/index'
// /**
//  * @param {import('next').NextApiRequest} req
//  * @param {import('next').NextApiResponse} res
//  */
// export async function GET(req,{params}){
//   try {
//     const auth = req.headers.get('Authorization');
//     if (!auth || !auth.startsWith('Bearer')) {
//       throw new UnauthenticatedError('connection invalid');
//     }
//     const token = auth.split(' ')[1];
//     const payload = verify(token, process.env.JWT_SECRET);
//     req.user = { userId: payload.id, username: payload.userName };
//     await connectToDatabase();
//     const paramId = params.id;
//     let id = req.user.userId + paramId;
//     console.log(id)
//     let messgArray = await Message.findOne({ id: id });
//     if (messgArray === null) {
//       id = paramId + req.user.userId;
//       console.log(id)
//       messgArray = await Message.findOne({ id: id });
//       console.log(messgArray)
//     }
//     const stream = new ReadableStream({
//       start(controller) {
//         if (messgArray === null) {
//           controller.enqueue(`data: ${JSON.stringify([{id:'unknown',message:'send your first message😊'}])}\n\n`);
//         } else {
//           controller.enqueue(`data: ${JSON.stringify(messgArray.messages)}\n\n`);
//         }
//         if (messgArray !== null) {
//           const pipeline = [
//             {
//               $match: {
//                 'fullDocument.id': id,
//                 operationType: 'update',
//               },
//             },
//           ];
//           const db = mongoose.connection;
//           const changeStream = db.collection('messages').watch(pipeline, {
//             fullDocument: 'updateLookup',
//           });
//           const sendChange = async (change) => {
//             const message = await Message.findOne({ id: id });
//             controller.enqueue(`data: ${JSON.stringify(message.messages)}\n\n`);
//           };
//           changeStream.on('change', sendChange);
//           // req.on('close', () => {
//           //   changeStream.removeListener('change', sendChange);
//           //   clearInterval(intervalId);
//           // });
//         }
//         const intervalId = setInterval(() => {
//           controller.enqueue(': heartbeat\n\n');
//         }, 15000);
//       },
//     });
//     return new NextResponse(stream, {
//       headers: {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         'Connection': 'keep-alive',
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     if (error instanceof BadRequest) {
//       return new Response(
//         JSON.stringify({ message: error.message }),
//         { status: StatusCodes.BAD_REQUEST, headers: { 'Content-Type': 'application/json' } }
//       );
//     } else {
//       return new Response(
//         JSON.stringify({ message: error.message }),
//         { status: StatusCodes.INTERNAL_SERVER_ERROR, headers: { 'Content-Type': 'application/json' } }
//       );
//     }
//   }
//   }
const {StatusCodes}=require("http-status-codes")
import Message from "@/lib/utils/models/chatsSchema";
import connectToDatabase from "@/lib/utils/connectDB/connectDb";
const mongoose = require('mongoose');
import { middlewareTest } from "@/lib/utils/middleTest";
import { verify } from "jsonwebtoken";
import { NextResponse } from 'next/server';
import {BadRequest,UnauthenticatedError} from '../../../../../../lib/utils/errors/index'
export async function GET(req,{params}){
    
      try {
            const auth = req.headers.get('Authorization');
            if (!auth || !auth.startsWith('Bearer')) {
              throw new UnauthenticatedError('connection invalid');
            }
            const token = auth.split(' ')[1];
            const payload = verify(token, process.env.JWT_SECRET);
            req.user = { userId: payload.id, username: payload.userName };
            await connectToDatabase();
            const paramId = params.id;
            let id = req.user.userId + paramId;
            console.log(id)
            let messgArray = await Message.findOne({ id: id });
            if (messgArray === null) {
              id = paramId + req.user.userId;
              console.log(id)
              messgArray = await Message.findOne({ id: id });
              console.log(messgArray)
            }
            return new Response(messgArray)

    } catch (error) {
      console.log(error)
    }
} 