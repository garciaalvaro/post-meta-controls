import l from "utils";
import Panel from "./Panel";
import Setting from "./Setting";
import Sidebar from "./Sidebar";
import Tab from "./Tab";
// Settings:
import Buttons from "./settings/Buttons";
import Checkbox from "./settings/Checkbox";
import CheckboxMultiple from "./settings/CheckboxMultiple";
import Color from "./settings/Color";
import CustomText from "./settings/CustomText";
import DateRange from "./settings/DateRange";
import DateSingle from "./settings/DateSingle";
import Image from "./settings/Image";
import ImageMultiple from "./settings/ImageMultiple";
import Radio from "./settings/Radio";
import Range from "./settings/Range";
import RangeFloat from "./settings/RangeFloat";
import Select from "./settings/Select";
import Text from "./settings/Text";
import Textarea from "./settings/Textarea";

const { isEmpty } = lodash;
const { applyFilters } = wp.hooks;

let classes;

classes = {
	Panel,
	Sidebar,
	Tab,
	// Settings:
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

const classes_pro = applyFilters("pmcAddClasses", {}, Setting);

if (!isEmpty(classes_pro)) {
	classes = { ...classes, ...classes_pro };
}

export default classes;
