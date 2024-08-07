import { config } from 'dotenv'; config()
import server from './app'
import mongoose from 'mongoose';

const port = process.env.PORT || 8080
server.listen(port, () => {
    console.log(`api started at ${port} | http://localhost:${port}`)
})

const connectionString: string = process.env.MONG_URI as string
mongoose.connect(connectionString)
    .then(() => {
        console.log("Databse connected")
    })
    .catch(err => console.error(err.message))