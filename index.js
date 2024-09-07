const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const db = require('./db/db');
const bodyparser = require('body-parser');
const fileuploader = require('express-fileupload');

app.use(fileuploader({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

port = process.env.PORT;

const allowedOrigins = ['http://localhost:3000', 'https://furniflexeccomecce.netlify.app'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Handle preflight requests
app.options('*', cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const userRoute = require('./routes/auth.route');
const productroute = require('./routes/product.route');

app.use('/api', userRoute);
app.use('/api', productroute);

app.use((req, res, next) => {
    res.status(400).json({
        message: 'Bad request || URL not found'
    });
});

const server = () => {
    db();
    app.listen(port, () => {
        console.log(`app is running at https://localhost:${port}`);
    });
};
server();

