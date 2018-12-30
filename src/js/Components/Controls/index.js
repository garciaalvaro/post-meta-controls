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
	Buttons
};

const controls_pro = applyFilters("ps_add_control", {});

if (!isEmpty(controls_pro)) {
	const { CustomHTML } = controls_pro;

	controls = { ...controls, CustomHTML };
}

export default controls;
