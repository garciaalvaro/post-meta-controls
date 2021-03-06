import React from "react";
import DOMPurify from "dompurify";
import { RawHTML } from "@wordpress/element";
import { Dashicon } from "@wordpress/components";

import { Div } from "@/utils/components";
import { addPrefix } from "@/utils/tools/addPrefix";

export const prepareIcon = (
	icon_svg: string,
	icon_dashicon: string,
	type: "tab" | "panel"
): React.ReactNode => {
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
			<Dashicon icon={icon_dashicon as Dashicon.Icon} />
		</Div>
	);
};
