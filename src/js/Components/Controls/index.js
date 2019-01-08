import l from "../../utils";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import Select from "./Select";
import Range from "./Range";
import Text from "./Text";
import Textarea from "./Textarea";
import Color from "./Color";
import ImageContainer from "./ImageContainer";
import CustomText from "./CustomText";
import DateTime from "./DateTime";
import Buttons from "./Buttons";
import MultiCheckbox from "./MultiCheckbox";

const { isEmpty } = lodash;
const { applyFilters } = wp.hooks;

let controls;

controls = {
	Checkbox,
	Radio,
	Select,
	Range,
	Text,
	Textarea,
	Color,
	ImageContainer,
	CustomText,
	DateTime,
	Buttons,
	MultiCheckbox
};

const controls_pro = applyFilters("pmc_add_controls", {});

if (!isEmpty(controls_pro)) {
	const { CustomHTML } = controls_pro;

	controls = { ...controls, CustomHTML };
}

export default controls;
