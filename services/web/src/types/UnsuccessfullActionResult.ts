import { ActionResult } from "./ActionResult";

export interface UnsuccessfullActionResult extends ActionResult<null> {
    success: false;
    message: string;
    data: null
}