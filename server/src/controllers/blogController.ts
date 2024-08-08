import { Request, Response } from "express"
import blogModel from "../models/blogModel"
import { blogRes } from "../resTypes"
import { easyRes } from "../utils"
import { ObjectId } from "mongoose"

export const blogControllers = {
    getAllGET: async (req: Request, res: Response) => {

        try {
            const blogs: Array<{
                _id: ObjectId,
                title: string,
                content: string,
                createdAt: Date,
                updatedAt: Date
            }> = await blogModel.find()

            let resInfo: blogRes = {
                message: blogs.length === 0 ? "Couldn't find blogs" : "Blogs loaded",
                success: true,
                data: blogs
            }

            easyRes(req, res, 200, resInfo)
        } catch (error) {

            let resInfo: blogRes = {
                message: "Something went wrong while trying to load blogs: " + error,
                success: false
            }

            easyRes(req, res, 404, resInfo)
        }
    },
    getByIdGET: async (req: Request, res: Response) => {
        const id: string = req.params.id

        try {
            const blog: Array<{
                _id: ObjectId,
                title: string,
                content: string,
                createdAt: Date,
                updatedAt: Date
            }> = await blogModel.find({
                _id: id
            })

            if (blog.length === 0) {
                res.status(404).json({
                    message: "Couldn't found any blog",
                    success: false,
                    data: []
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
                message: "Something went wrong: " + error,
                success: false,
                data: []
            })
        }

    },
    newBlogPOST: async (req: Request, res: Response) => {
        const { title, content } = req.body

        if (!req.body) {
            res.status(500).json({
                message: "All variables should be filled: " + req.body,
                success: false,
                data: []
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
    },
    updateBlogPATCH: async (req: Request, res: Response) => {
        const { id, title, content }: {
            id: ObjectId,
            title: string,
            content: string
        } = req.body

        function defaultRes(i: string) {
            return {
                message: "This path required: " + i,
                success: false,
                data: []
            } as blogRes
        }

        if (!id) return easyRes(req, res, 500, defaultRes("id"))
        if (!title) return easyRes(req, res, 500, defaultRes("title"))
        if (!content) return easyRes(req, res, 500, defaultRes("content"))

        try {
            const blog = await blogModel.findByIdAndUpdate(
                id,
                { $set: { title: title, content: content } },
                { new: true, runValidators: true }
            )

            if (!blog) {
                let resInfo: blogRes = {
                    message: "Couldn't find any blog",
                    success: false,
                    data: []
                }
                easyRes(req, res, 404, resInfo)
                return
            }

            let resInfo: blogRes = {
                message: "Blog Updated",
                success: true,
                data: blog
            }
            easyRes(req, res, 200, resInfo)

        } catch (error) {
            let resInfo: blogRes = {
                message: "" + error,
                success: false,
                data: []
            }
            easyRes(req, res, 404, resInfo)
        }
    },
    deleteBlogDELETE: async (req: Request, res: Response) => {
        const { id } = req.body

        try {
            const blog = await blogModel.findById(id)

            if (!blog) {
                const resInfo: blogRes = {
                    message: "Couldn't find any blog to delete",
                    success: false,
                    data: []
                }

                easyRes(req, res, 404, resInfo)
                return
            }

            const deleteResult = await blogModel.deleteOne({ _id: id })

            if (deleteResult) {
                const resInfo: blogRes = {
                    message: "Blog deleted successfully",
                    success: true
                }

                easyRes(req, res, 200, resInfo)
            } else {
                const resInfo: blogRes = {
                    message: "No blog was deleted",
                    success: false,
                    data: []
                }

                easyRes(req, res, 404, resInfo)
            }
        } catch (error) {
            console.error(error)
            const resInfo: blogRes = {
                message: "" + error,
                success: false,
                data: []
            }

            easyRes(req, res, 500, resInfo)
        }
    }


}