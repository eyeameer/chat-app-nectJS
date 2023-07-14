
import {verify} from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import {BadRequest, UnauthenticatedError} from './errors/index'

export async function middlewareTest(req){
    try {
    const auth=req.headers.get('Authorization')
    console.log(auth.length)
    if(!auth || !auth.startsWith('Bearer')){
        throw new UnauthenticatedError('connection invalid')
    }

    const token=auth.split(' ')[1]
    console.log(token.length)
    console.log(process.env.JWT_SECRET)
    const testtt=verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTU0NzYzYTc4Yzg2Yzg3ODJlMGMxNSIsInVzZXJOYW1lIjoiQW1lZXIiLCJpYXQiOjE2ODQ3ODMzMjIsImV4cCI6MTY4NzM3NTMyMn0.WR571gNsTatFOTgRJk13bHw-ZDclURG9SWQKg-iz3FI","Yq3t6w9z$C&F)H@McQfTjWnZr4u7x!A%")
    console.log(testtt)
    const payload=verify(token,process.env.JWT_SECRET)
    console.log({payload:payload})
 req.user={userId:payload.id,username:payload.userName}
return NextResponse.next()
} catch (error) {
    console.log(error)
    throw new UnauthenticatedError('Authentication failed')
}



}
