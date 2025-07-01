import { ForwardedRef, forwardRef } from "react";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = forwardRef(({ ...props }: LabelProps, ref: ForwardedRef<HTMLLabelElement>) => {
    return <label {...props} ref={ref} />;
});
