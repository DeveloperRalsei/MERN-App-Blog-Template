import { Router } from "express"
import { blogControllers } from "../controllers/blogController"
const router = Router()

router.get("/", blogControllers.getAllGET)

router.get("/:id", blogControllers.getByIdGET)

router.post("/", blogControllers.newBlogPOST)

router.patch("/", blogControllers.updateBlogPATCH)

router.delete("/", blogControllers.deleteBlogDELETE)

router.delete("/confirm",blogControllers.deleteAllDELETE)

export default router