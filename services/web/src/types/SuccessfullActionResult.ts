import { ActionResult } from "./ActionResult";

export interface SuccessfullActionResult<T = null> extends ActionResult<T> {
    success: true;
    message: string;
    data: T;
}