import serverInit from './app.js';
// import dbConnection from './config/connection.js';

const app = serverInit();
const port = process.env.PORT || 8080;

// dbConnection.once('open', () =>{
    app.listen(port, ()=> {
        console.log(`listening on port ${port}`)
        // console.log('DB listening on ', dbConnection._connectionString)
    });
// });

// app.listen(port, ()=> console.log(`listening on port ${port}`));