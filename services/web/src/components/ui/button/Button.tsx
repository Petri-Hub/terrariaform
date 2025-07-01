import { ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef(({ children, ...props }: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return <button {...props} ref={ref}>{children}</button>;
});