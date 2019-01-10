import { Div } from "./Components";
import { plugin_slug } from "./info-plugin";
import DOMPurify from "dompurify";

const { RawHTML } = wp.element;
const { Dashicon } = wp.components;

const prepareIcon = (icon_svg, icon_dashicon, type) => {
	if (icon_svg === "" && icon_dashicon === "") {
		return null;
	}

	return icon_svg !== "" ? (
		<RawHTML className={`${plugin_slug}-${type}-icon`}>
			{DOMPurify.sanitize(icon_svg)}
		</RawHTML>
	) : (
		<Div className={`${plugin_slug}-${type}-icon`}>
			<Dashicon icon={icon_dashicon} />
		</Div>
	);
};

export default prepareIcon;
