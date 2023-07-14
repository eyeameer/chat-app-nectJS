// //The mongodb.js file from the example
// import { MongoClient } from 'mongodb'

// const uri = process.env.MONGODB_URI
// const options = {}

// let client
// let clientPromise

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your Mongo URI to .env.local')
// }
// console.log(global._mongoClientPromise)
// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     console.log('first conn ran')
//     console.log('Creating a new connection');
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   // In production mode, it's best to not use a global variable.
//   console.log('Using existing connection');
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
const options = {        
    useNewUrlParser: true,
    
    useUnifiedTopology: true,
};

let dbPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

 function connectToDatabase() {
  if (!dbPromise) {
    console.log('Creating a new connection');
    dbPromise = mongoose.connect(uri, options);
  } else {
    console.log('Using existing connection');
  }
  return  dbPromise;
}

export default connectToDatabase;