export type blogRes = {
    message: string
    success: boolean
    data?: Array<{
        title: string,
        content: string
    }> | {
        title: string,
        content: string
    }
}