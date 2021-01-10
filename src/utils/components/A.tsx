import { prepareProps } from "utils/tools/prepareProps";

export const A: React.ComponentType<ComponentProps> = props => {
	const { children, ...rest } = props;

	return <a {...prepareProps(rest)}>{children}</a>;
};
