import express, { Request, Response, NextFunction, Express } from "express";
import cors from 'cors';
import blogRoutes from './routes/blogs';
import ssr from './routes/serverSideRendering';
import path from "node:path";
import multer from 'multer';
import { easyRes } from "./utils";

const app: Express = express();

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, '/images');
    },
    filename(req, file, callback) {
        callback(null, Date.now() + "_" + path.extname(file.originalname));
    },
});

const blogStorage = multer({
    storage: storage
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.ip, req.url, req.method);
    next();
});

app.use("/api/blogs", blogStorage.single('blogImage'), blogRoutes);
app.use("/hmm", (req, res, next) => {
    res.send('<h3>Uhhh... You were NOT supposed to be here.</h3> <img src="/images/hey.gif" alt="you like kissing boiz, dont you"/>');
    next();
});
app.use("/", ssr);
app.use("*", (req, res) => easyRes(req, res, 404, {
    message: {
        type: "error",
        err: "Wrong usage"
    },
    success: false,
    data: []
}));

export default app;