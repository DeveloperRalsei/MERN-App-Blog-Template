import { Response, Request, Router } from "express"
import blogModel from "../models/blogModel"
import { blogControllers } from "../controllers/blogController"
const router = Router()

router.get("/", blogControllers.getAll)

router.get("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id

    try {
        const blog: Array<{
            _id: string,
            title: string,
            content: string,
            createdAt: Date,
            updatedAt: Date,
            _v: number
        }> = await blogModel.find({
            _id: id
        })

        if(blog.length === 0){
            res.status(404).json({
                message: "Couldn't found any blog",
                success: false,
                data:[]
            })  
            return
        }

        res.status(200).json({
            mesasge: "found blog",
            success: true,
            data: blog
        })
    } catch (error) {
        res.status(404).json({
            message: "Something went wrong: "+error,
            success: false,
            data:[]
        })
    }

})

router.post("/", async (req: Request, res: Response) => {
    const { title, content } = req.body

    if (!req.body) {
        res.status(500).json({
            message: "All variables should be filled: " + req.body,
            success: false
        })
        return
    }

    try {
        const data = await blogModel.create({ title, content })

        res.status(201).json({
            message: "New blog created",
            succes: true,
            data: data
        })

    } catch (error) {
        res.status(404).json({
            message: "Couldn't create new Blog: " + error,
            success: false
        })
    }
})

export default router