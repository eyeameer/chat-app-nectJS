'use client'
import axios from "axios";
// import sharp from "sharp";
export default function TestForm(){
    async function handleFileChange(e){
        e.preventDefault();
//         const formData={}
// console.log(e.target.childNodes[0].files[0])
// // formData.append('photo',e.target.childNodes[0].files[0])
// // formData.append('id',1)
// formData.photo=e.target.childNodes[0].files[0]
// formData.id=2

// const res=axios.post('http://localhost:3000/api/testt',formData)
e.preventDefault();
const file = e.target.childNodes[0].files[0];
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = async () => {
  const base64 = reader.result;
  // Send the base64 encoded photo to the API endpoint for processing
  const res = await axios.post('http://localhost:3000/api/testt', { photo: base64,id:2 }, {headers: {
       'Content-Type': 'application/json',
      }})
      console.log(res.data)
  // Use the processed photo returned by the API endpoint
//   console.log(res.data.photo);
};}
return(
    <div>
    <form onSubmit={handleFileChange}>
    <input name='file' className="flex rounded-full bg-slate-500 flex-col" type="file"  />
    <button>
        submit
    </button>
    </form>
    </div>
)
}