import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ForwardedRef, forwardRef } from "react";

type LinkProps = NextLinkProps & React.HTMLAttributes<HTMLAnchorElement>;

export const Link = forwardRef(({ children, ...props }: LinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    return <NextLink {...props} ref={ref}>{children}</NextLink>;
});
