import { prepareProps } from "utils/tools/prepareProps";

export const P: React.ComponentType<ComponentProps> = props => {
	const { children, ...rest } = props;

	return <p {...prepareProps(rest)}>{children}</p>;
};
