const http = require('http');
const fs = require('fs');

const ConnectToDatabase = require('./infraestructure/database/mongodb');
const createServer = require('./infraestructure/server/server');

const startApp = async () => {
    
    let connectToDatabase = new ConnectToDatabase();
    await connectToDatabase.connectOpen();

    const app = createServer();

    const httpServer = http.createServer(app);

    httpServer.listen({ port: process.env.EXPRESS_PORT, host: process.env.EXPRESS_HOST }, () => {
        console.log(`http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`);
    });
};

startApp();


