import l from "../../utils";
import Buttons from "./Buttons";
import Checkbox from "./Checkbox";
import CheckboxMultiple from "./CheckboxMultiple";
import Color from "./Color";
import CustomText from "./CustomText";
import DateTime from "./DateTime";
import ImageContainer from "./ImageContainer";
import Radio from "./Radio";
import Range from "./Range";
import Select from "./Select";
import Text from "./Text";
import Textarea from "./Textarea";

const { isEmpty } = lodash;
const { applyFilters } = wp.hooks;

let controls;

controls = {
	Buttons,
	Checkbox,
	CheckboxMultiple,
	Color,
	CustomText,
	DateTime,
	ImageContainer,
	Radio,
	Range,
	Select,
	Text,
	Textarea
};

const controls_pro = applyFilters("pmc_add_controls", {});

if (!isEmpty(controls_pro)) {
	controls = { ...controls, ...controls_pro };
}

export default controls;
