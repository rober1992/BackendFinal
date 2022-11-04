import myServer from './services/server';
import { MongoDB } from './db/mongoDB';
import { initWsServer } from './services/sockets';
import cluster from 'cluster'
import os from 'os';
import { portArgument, clusterArg } from './utils/getArgs';
import { logger } from './middlewares/logger';

const db = new MongoDB();
console.log('DB LOCAL UP');
initWsServer(myServer);

const port = portArgument || 8080;
const clusterArgument = clusterArg || false;
const numCPUs = os.cpus().length;

if (cluster.isMaster && clusterArgument) {
  logger.info(`NUMERO DE CPUS ===> ${numCPUs}`);
  logger.info(`PID MASTER ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker: any) => {
    logger.info(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  myServer.listen(port, () =>
    logger.info(`Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`)
  );
}

