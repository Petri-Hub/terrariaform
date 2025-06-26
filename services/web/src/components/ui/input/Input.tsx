import { ForwardedRef, forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(({ ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return <input {...props} ref={ref} />;
});