import { ForwardedRef, forwardRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef(({ children, ...props }: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return <button {...props} ref={ref}>{children}</button>;
});