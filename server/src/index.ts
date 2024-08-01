import express, { Response, Request, NextFunction } from 'express'
import blogRoutes from './routes/blogs'
import { config } from 'dotenv'
import mongoose from 'mongoose'
config()

const app = express()
app.use(express.json())
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.ip, req.path, req.method)
    next()
})

app.use("/api/blogs", blogRoutes)

mongoose.connect(process.env.MONG_URI as string)
    .then(() => {
        console.log("MongoDB Connected")
        const port = process.env.PORT || 8080
        app.listen(port, () => {
            console.log(`Server running at ${port} | http://localhost:${port}`)
        })
    }).catch(err => {
        console.log("" + err)
    })

