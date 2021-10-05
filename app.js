import express from 'express';
import routes from './routes/index.js';

export default function () {
    const app = express();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(express.static("public"));
    
    app.use('/', routes);
    
    return app;
};