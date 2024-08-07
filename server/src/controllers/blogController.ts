import { Request,Response } from "express"
import blogModel from "../models/blogModel"
import { blogRes } from "../resTypes"

export const blogControllers = {
    getAll: async (req: Request, res: Response) => {

        try {
            const blogs: {
                _id: string,
                title: string,
                content: string,
                createdAt: Date,
                updatedAt: Date,
                _v: number
            }[] = await blogModel.find()
            res.status(200).json({
                message: "Blogs loaded",
                success: true,
                data: blogs
            } as blogRes)
        } catch (error) {
            res.status(404).json({
                message: "Something went wrong while trying to load blogs: " + error,
                success: false
            })
        }
    }
}