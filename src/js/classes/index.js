import l from "../utils";
import Panel from "./Panel";
import Sidebar from "./Sidebar";
import Tab from "./Tab";
// Settings:
import Buttons from "./settings/Setting-Buttons";
import Checkbox from "./settings/Setting-Checkbox";
import CheckboxMultiple from "./settings/Setting-CheckboxMultiple";
import Color from "./settings/Setting-Color";
import CustomText from "./settings/Setting-CustomText";
import DateRange from "./settings/Setting-DateRange";
import Image from "./settings/Setting-Image";
import ImageMultiple from "./settings/Setting-ImageMultiple";
import Radio from "./settings/Setting-Radio";
import Range from "./settings/Setting-Range";
import RangeFloat from "./settings/Setting-RangeFloat";
import Select from "./settings/Setting-Select";
import Text from "./settings/Setting-Text";
import Textarea from "./settings/Setting-Textarea";

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
	Image,
	ImageMultiple,
	Radio,
	Range,
	RangeFloat,
	Select,
	Text,
	Textarea
};

const classes_pro = applyFilters("pmc_add_classes", {});

if (!isEmpty(classes_pro)) {
	classes = { ...classes, ...classes_pro };
}

export default classes;
