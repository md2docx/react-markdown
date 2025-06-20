import { HTMLProps, ReactNode } from "react";
import styles from "./md.module.scss";

export interface MdProps extends HTMLProps<HTMLDivElement> {
	children?: ReactNode;
}

/**
 * 
 *
 * @example
 * ```tsx
 * <Md />
 * ```
 * 
 * @source - Source code
 */
export const Md = ({ children, ...props }: MdProps) => {
  const className = [props.className, styles["md"]].filter(Boolean).join(" ");
	return (
		<div {...props} className={className} data-testid="md">
			{children}
		</div>
	);
}
