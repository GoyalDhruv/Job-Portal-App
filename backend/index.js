import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDb from './utils/db.js';
dotenv.config({})

const app = express();

// app.get('/home', (req, res) => {
//     return res.status(200).json({
//         message: 'Welcome',
//         success: true
//     })
// })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    connectDb()
    console.log(`Server running at port ${PORT}`);

})