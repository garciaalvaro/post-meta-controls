import React from "react";
import { prepareProps } from "@/utils/tools/prepareProps";

export const Img: React.ComponentType<ComponentProps> = props => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { children, ...rest } = props;

	return <img {...prepareProps(rest)} />;
};
