import express from 'express';
// Import express-session
import session from 'express-session';
import routes from './routes/index.js';

export default function () {
    const app = express();

    // Set up sessions
    const sess = {
        secret: 'Super secret secret',
        resave: false,
        saveUninitialized: false,
    };
      
    app.use(session(sess));

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(express.static("public"));
    
    app.use('/', routes);
    
    return app;
};