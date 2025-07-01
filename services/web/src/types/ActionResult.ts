export interface ActionResult<T = null>{
    success: boolean
    message: string
    data: T
}

