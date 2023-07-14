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
    // res.status(200).json({ photo: base64 });
    return new Response(JSON.stringify({img:base644}),    { status: 200, headers: { 'Content-Type': 'application/json' } })
} catch (error) {
    console.log(error)
}

    // return new Response(JSON.stringify({dataa:true}))
    
}
