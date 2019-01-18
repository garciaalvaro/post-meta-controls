import l from "../../../utils";
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

let settings;

settings = {
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

const settings_pro = applyFilters("pmcAddSettingComponents", {}, settings);

if (!isEmpty(settings_pro)) {
	settings = { ...settings, ...settings_pro };
}

export default settings;
