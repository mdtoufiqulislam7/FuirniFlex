const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const db = require('./db/db')
const bodyparser = require('body-parser')

const fileuploader = require('express-fileupload')
app.use(fileuploader({
    useTempFiles:true,
    tempFileDir: '/tmp/'
}))

port = process.env.PORT

// app.use(express.json())

// app.use(cors())
// app.use(cors({
//   origin: 'http://localhost:3000', // Your frontend URL
//   credentials: true,
// }));
const allowedOrigins = ['http://localhost:3000', ''];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true, // If you need to allow cookies or authorization headers
}));
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())





//// make api
const userRoute=  require('./routes/auth.route')
const productroute = require('./routes/product.route')

app.use('/api',userRoute)
app.use('/api',productroute)

app.use((req,res,next)=>{
    res.status(400).json({
        message:'bad request|| url not founded'
    })
})

const server = ()=>{
    db()
    app.listen(port,()=>{
        console.log(`app is running at https://localhost:${port}`)
    })
}
server()