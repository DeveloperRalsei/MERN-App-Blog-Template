import { Request, Response } from "express";
import blogModel from "../models/blogModel";
import { blogRes } from "../resTypes";
import { easyRes } from "../utils";
import { ObjectId } from "mongoose";
import { Blog } from "../modelTypes";

export const blogControllers = {
    getAllGET: async (req: Request, res: Response) => {

        try {
            const blogs: Array<Blog> = await blogModel.find();

            let resInfo: blogRes = {
                message: blogs.length === 0 ? {
                    type: 'error',
                    err: "Couldn't find blogs"
                } : {
                    type: 'standart',
                    msg: "Blogs loaded"
                },
                success: true,
                data: blogs
            };

            easyRes(req, res, 200, resInfo);
        } catch (error) {

            let resInfo: blogRes = {
                message: {
                    type: 'error',
                    err: "No blog was deleted"
                },
                success: false
            };

            easyRes(req, res, 404, resInfo);
        }
    },
    getByIdGET: async (req: Request, res: Response) => {
        const id: string = req.params.id;

        try {
            const blog: Array<Blog> = await blogModel.find({
                _id: id
            });

            if (blog.length === 0) {
                res.status(404).json({
                    message: "Couldn't found any blog",
                    success: false,
                    data: []
                });
                return;
            }

            res.status(200).json({
                mesasge: "found blog",
                success: true,
                data: blog
            });
        } catch (error) {
            res.status(404).json({
                message: "Something went wrong: " + error,
                success: false,
                data: []
            });
        }

    },
    newBlogPOST: async (req: Request, res: Response) => {
        const { title, content, author, tags }: {
            title: string,
            content: string,
            author: string,
            tags: string[];
        } = req.body;

        const image = req.file;


        if (!title || !author || !content) {
            res.status(400).json({
                message: "Title, author and content required: " + JSON.stringify(req.body),
                success: false,
                data: []
            });
            return;
        }

        try {
            const imagePath = image ? `/images/${image?.filename}` : undefined

            const data = await blogModel.create({ title, content, image: imagePath, author, tags });

            let resInfo: blogRes = {
                message: {
                    type: "standart",
                    msg: "New Blog Created"
                },
                success: true,
                data: data
            };

            easyRes(req, res, 201, resInfo);

        } catch (error) {
            res.status(404).json({
                message: "Couldn't create new Blog: " + error,
                success: false
            });
        }
    },
    updateBlogPATCH: async (req: Request, res: Response) => {
        const { id, title, content, author, tags }: {
            id: ObjectId | string,
            title: string,
            content: string;
            author?: string,
            tags?: string[];
        } = req.body;

        function defaultRes(i: string) {
            return {
                message: {
                    type: 'error',
                    err: "This path required: " + i
                },
                success: false,
                data: []
            } as blogRes;
        }

        if (!id) return easyRes(req, res, 500, defaultRes("id"));
        if (!title) return easyRes(req, res, 500, defaultRes("title"));
        if (!content) return easyRes(req, res, 500, defaultRes("content"));

        try {
            const blog = await blogModel.findByIdAndUpdate(
                id,
                { $set: { title, content, author, tags } },
                { new: true, runValidators: true }
            );

            if (!blog) {
                let resInfo: blogRes = {
                    message: {
                        type: "error",
                        err: "Couldn't find any blog",
                    },
                    success: false,
                    data: []
                };
                easyRes(req, res, 404, resInfo);
                return;
            }

            let resInfo: blogRes = {
                message: {
                    type: "standart",
                    msg: "Blog Updated"
                },
                success: true,
                data: blog
            };
            easyRes(req, res, 200, resInfo);

        } catch (error) {
            let resInfo: blogRes = {
                message: {
                    type: "error",
                    err: error as string
                },
                success: false,
                data: []
            };
            easyRes(req, res, 404, resInfo);
        }
    },
    deleteBlogDELETE: async (req: Request, res: Response) => {
        const { id } = req.body;

        try {
            const blog = await blogModel.findById(id);

            if (!blog) {
                const resInfo: blogRes = {
                    message: {
                        type: 'error',
                        err: "Couldn't find any blog to delete"
                    },
                    success: false,
                    data: []
                };

                easyRes(req, res, 404, resInfo);
                return;
            }

            const deleteResult = await blogModel.deleteOne({ _id: id });

            if (deleteResult) {
                const resInfo: blogRes = {
                    message: {
                        type: 'standart',
                        msg: "Blog deleted successfully"
                    },
                    success: true
                };

                easyRes(req, res, 200, resInfo);
            } else {
                const resInfo: blogRes = {
                    message: {
                        type: 'error',
                        err: "Blog couldn't delete"
                    },
                    success: false,
                    data: []
                };

                easyRes(req, res, 404, resInfo);
            }
        } catch (error) {
            console.error(error);
            const resInfo: blogRes = {
                message: {
                    type: 'error',
                    err: error as string
                },
                success: false,
                data: []
            };

            easyRes(req, res, 500, resInfo);
        }
    },

    deleteAllDELETE : async (req: Request,res: Response) => {
        try {
            await blogModel.deleteMany()

            let resInfo: blogRes = {
                message: {
                    type: "standart",
                    msg: "WARNING! All blogs deleted!!"
                },
                success: true,
                data: []
            }

            easyRes(req,res,200,resInfo)
        } catch (error) {
            let resInfo: blogRes = {
                message: {
                    type: "error",
                    err: error as string
                },
                success: false,
                data: []
            }

            easyRes(req,res,500,resInfo)
        }
    }


};