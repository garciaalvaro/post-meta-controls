import { prepareProps } from "utils/tools/prepareProps";

export const Ol: React.ComponentType<ComponentProps> = props => {
	const { children, ...rest } = props;

	return <ol {...prepareProps(rest)}>{children}</ol>;
};
