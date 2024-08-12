import express,{ Request,Response,NextFunction, Express } from "express";
import cors from 'cors'
import blogRoutes from './routes/blogs'
import ssr from './routes/serverSideRendering'
import path from "node:path";

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use((req:Request,res:Response,next: NextFunction)=> {
    console.log(req.ip, req.url, req.method)
    next()
})

app.use("/api/blogs",blogRoutes)
app.use("/hmm",(req,res,next)=> {
    res.send('<h3>Uhhh... You were NOT supposed to be here.</h3> <img src="/img/hey.gif" alt="you like kissing boiz, dont you"/>')
    next()
})
app.use("/",ssr)

export default app