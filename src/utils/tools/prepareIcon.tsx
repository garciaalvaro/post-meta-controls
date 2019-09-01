import DOMPurify from "dompurify";
import { RawHTML } from "@wordpress/element";
import { Dashicon } from "@wordpress/components";

import { Div } from "utils/Components";
import { addPrefix } from "utils/tools/addPrefix";

export const prepareIcon = (
	icon_svg: string,
	icon_dashicon: string,
	type: "tab" | "panel"
) => {
	if (icon_svg === "" && icon_dashicon === "") {
		return null;
	}

	if (icon_svg !== "") {
		return (
			<RawHTML className={addPrefix(`${type}-icon`)}>
				{DOMPurify.sanitize(icon_svg)}
			</RawHTML>
		);
	}

	return (
		<Div className={`${type}-icon`}>
			<Dashicon
				// @ts-ignore
				icon={icon_dashicon}
			/>
		</Div>
	);
};
