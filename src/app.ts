import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import todoRouter from './routes/todo'
import { default as mongoose } from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


const app = express()
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With , Content-Type ,Accept ,Authoriztion")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH ,DELETE")
    next()
})


app.use('/api/todos', todoRouter)


const DB: any = process.env.DB

const PORT = process.env.PORT || 4000

mongoose
    .connect(DB).then(() =>
        app.listen(PORT, () => {
            console.log(`App running on Port ${PORT}...`);
        })
    )
    .catch((error) => console.log(error));
