

// export async function getServerSideProps(context) {
//   const client = await clientPromise;
//   const db = client.db();
//   const users = await db.collection("test").find({}).toArray();
//   console.log(users)
//   return {
//     props: { users: JSON.parse(JSON.stringify(users)) },
//   };
// }
import Appp from '../../lib/utils/UI/Appp'
import axios from 'axios'
// import TestForm from '@/lib/utils/UI/testForm'
export default async function Home() {

  const res = fetch('https://chatapp-com.onrender.com', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }})


return(
<Appp>

</Appp>



)
    
  }

    