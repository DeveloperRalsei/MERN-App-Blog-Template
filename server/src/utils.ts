import { Request, Response } from "express";
import { blogRes } from './resTypes'

export const easyRes = (
    req: Request,
    res: Response,
    statusCode: number,
    information: {
        message: string,
        success: boolean,
        data?: any
    }
): Response => {
    const response:Response = res.status(statusCode).json({
        message: information.message,
        success: information.success,
        data: information.data
    } as blogRes)

    return response
}