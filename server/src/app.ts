import express,{ Request,Response,NextFunction, Express } from "express";
import blogRoutes from './routes/blogs'

const app: Express = express()

app.use(express.json())
app.use((req:Request,res:Response,next: NextFunction)=> {
    console.log(req.ip, req.url, req.method)
    next()
})

app.use("/api/blogs",blogRoutes)

export default app