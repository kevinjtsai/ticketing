import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
    var signin: () => string[];
}

jest.mock('../nats-wrapper');

let mongo: any;

beforeAll(async ()=> {
    process.env.JWT_KEY = 'asdf';
    
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri()

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async ()=> {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
}); 

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = () => {
    
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!); //create JWT

    const session = { jwt: token }; //build session object

    const sessionJSON = JSON.stringify(session); //convert session to JSON

    const base64 = Buffer.from(sessionJSON).toString('base64'); //encode as base64
    
    return [`express:sess=${base64}`]; //return cookie string with encoded data
}