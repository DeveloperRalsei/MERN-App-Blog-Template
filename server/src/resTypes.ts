export type blogRes = {
    message: {
        type: 'standart'
        msg: string
    } | {
        type: 'error'
        err: unknown | string
    }
    success: boolean
    data?: Array<{
        title: string,
        content: string
    }> | {
        title: string,
        content: string
    } | any
}