import { ForwardedRef, forwardRef } from "react";

type TextProps = React.HTMLAttributes<HTMLParagraphElement>;

export const Text = forwardRef(({ children, ...props }: TextProps, ref: ForwardedRef<HTMLParagraphElement>) => {
    return <p {...props} ref={ref}>{children}</p>;
});