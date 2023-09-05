import http from 'http';
import app from './config';
import { AppDataSource } from './data-source';

const PORT = 38000;

const server = http.createServer({}, app);

server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    //console.log('SSL enabled');
    AppDataSource.initialize()
    .then(() => {
        console.log("Banco funcionando")
    })
    .catch((error) => console.log(error))
    console.log("Servidor funcionando")
});