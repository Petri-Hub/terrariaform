import { ForwardedRef, forwardRef } from "react";

type TagProps = React.HTMLAttributes<HTMLSpanElement>;

export const Tag = forwardRef(({ children, className, ...props }: TagProps, ref: ForwardedRef<HTMLSpanElement>) => {
    return <span {...props} ref={ref}>{children}</span>;
});