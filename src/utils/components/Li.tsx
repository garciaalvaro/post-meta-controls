import { prepareProps } from "utils/tools/prepareProps";

export const Li: React.ComponentType<ComponentProps> = props => {
	const { children, ...rest } = props;

	return <li {...prepareProps(rest)}>{children}</li>;
};
