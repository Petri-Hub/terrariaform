import { ForwardedRef, forwardRef } from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef(({ ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return <textarea {...props} ref={ref} />;
});
