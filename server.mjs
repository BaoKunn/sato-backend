import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import fakeData from './fakeData/index.js';
import mongoose from 'mongoose';
import 'dotenv/config';
import { resolvers } from './resolvers/index.js';
import { typeDefs } from './schemas/index.js';

const app = express();
const httpServer = http.createServer(app);



const URI = `mongodb+srv://baodo200002:GPeoK4Ix2N7HfcBC@cluster0.jt1etbw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const PORT = process.env.PORT || 5000
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer})]
});

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

mongoose.set('strictQuery', false);
mongoose.connect(URI).then(async () => {
    console.log('Connected to MongoDB');
    await new Promise((resolve) => httpServer.listen({port: PORT}, resolve));
    console.log('Server ready at http://localhost:5000');
})

