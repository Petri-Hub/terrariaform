import { ForwardedRef, forwardRef } from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef(({ ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>) => {
    return <div {...props} ref={ref} />;
});
