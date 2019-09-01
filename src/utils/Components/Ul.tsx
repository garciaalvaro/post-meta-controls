import { prepareProps } from "utils/tools/prepareProps";

export const Ul: React.ComponentType<ComponentProps> = props => {
	const { children, ...rest } = props;

	return <ul {...prepareProps(rest)}>{children}</ul>;
};
