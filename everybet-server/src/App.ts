import * as http from 'http';

import { ServerLog } from './Logs/ServerLog';
import HttpServer from './Routes/HttpServer';
import * as Config from '../config.json';

const port = normalizePort(process.env.PORT || Config.server.listeningPort);
HttpServer.set('port', port);

const server = http.createServer(HttpServer);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

const serverLog = new ServerLog();

function normalizePort(val: number | string): number|string|boolean {
    const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else return false;
}
  
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen')
        throw error;
    const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch(error.code) {
        case 'EACCES':
            serverLog.error(`${bind} requires elevated privileges.`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            serverLog.error(`${bind} is already in use.`);
            process.exit(1);
            break;
        default:
            serverLog.error(`${error.code}`);
            throw error;
    }
}
  
function onListening(): void {
    const addr = server.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    serverLog.info(`Listening on ${bind}`);
}