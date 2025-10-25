import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
import { router as userRouter } from "./router/authRoute.js";
import { router as paymentRouter } from "./router/paymentRoute.js";
import { router as loanRouter } from "./router/loanRouter.js";
import { router as notificationRouter} from "./router/notificationRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 6000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

app.use(cookieParser());
app.use(express.json());

app.use('/', userRouter);
app.use('/payment', paymentRouter);
app.use('/loan', loanRouter);
app.use('/notification', notificationRouter)

app.listen(PORT, connectDB(), () => console.log(`App running on port: ${PORT}`));