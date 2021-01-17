import { PropsWithChildren } from "react";
import { addPrefix } from "@/utils/tools/addPrefix";

export const prepareProps = (
	props: ComponentProps
): PropsWithChildren<Record<string, unknown>> => {
	const { id, className, ...rest } = props;

	return {
		id: addPrefix(id) || undefined,
		className: addPrefix(className) || undefined,
		...rest,
	};
};
