import l from "../utils";
import Panel from "./Panel";
import Buttons from "./Setting-Buttons";
import Checkbox from "./Setting-Checkbox";
import Color from "./Setting-Color";
import CustomText from "./Setting-CustomText";
import DateTime from "./Setting-DateTime";
import Image from "./Setting-Image";
import Radio from "./Setting-Radio";
import Range from "./Setting-Range";
import Select from "./Setting-Select";
import Text from "./Setting-Text";
import Textarea from "./Setting-Textarea";
import Sidebar from "./Sidebar";
import Tab from "./Tab";

const { isEmpty } = lodash;
const { applyFilters } = wp.hooks;

let classes;

classes = {
	Panel,
	Buttons,
	Checkbox,
	Color,
	CustomText,
	DateTime,
	Image,
	Radio,
	Range,
	Select,
	Text,
	Textarea,
	Sidebar,
	Tab
};

const classes_pro = applyFilters("ps_add_classes", {});

if (!isEmpty(classes_pro)) {
	const { CustomHTML } = classes_pro;

	classes = { ...classes, CustomHTML };
}

export default classes;
