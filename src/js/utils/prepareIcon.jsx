import { Div } from "./Components";
import addPrefix from "./addPrefix";
import DOMPurify from "dompurify";

const { RawHTML } = wp.element;
const { Dashicon } = wp.components;

const prepareIcon = (icon_svg, icon_dashicon, type) => {
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
		<Div classes={`${type}-icon`}>
			<Dashicon icon={icon_dashicon} />
		</Div>
	);
};

export default prepareIcon;
