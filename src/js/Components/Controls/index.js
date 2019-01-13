import l from "../../utils";
import Buttons from "./Buttons";
import Checkbox from "./Checkbox";
import CheckboxMultiple from "./CheckboxMultiple";
import Color from "./Color";
import CustomText from "./CustomText";
import DateRange from "./DateRange";
import DateSingle from "./DateSingle";
import Image from "./Image";
import ImageMultiple from "./ImageMultiple";
import Radio from "./Radio";
import Range from "./Range";
import RangeFloat from "./RangeFloat";
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
	DateRange,
	DateSingle,
	Image,
	ImageMultiple,
	Radio,
	Range,
	RangeFloat,
	Select,
	Text,
	Textarea
};

const controls_pro = applyFilters("pmc_add_controls", {});

if (!isEmpty(controls_pro)) {
	controls = { ...controls, ...controls_pro };
}

export default controls;
