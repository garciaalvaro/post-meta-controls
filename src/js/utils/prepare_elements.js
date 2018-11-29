import l from "./log";
import * as yup from "yup";

const { forEach, pick } = lodash;

const sidebar_whitelist = ["id", "label", "description", "active_tab"];
const tab_whitelist = ["id", "label", "description", "parent_id"];
const panel_whitelist = [
	"id",
	"label",
	"description",
	"parent_id",
	"with_container",
	"initial_open"
];
const setting_whitelist = [
	"id",
	"meta_key",
	"type",
	"label",
	"description",
	"parent_id",
	"help",
	"options"
];

const sidebar_schema = yup.object().shape({
	id: yup.string().required(),
	label: yup.string().required(),
	description: yup.string()
});
const tab_schema = yup.object().shape({
	id: yup.string().required(),
	parent_id: yup.string().required(),
	label: yup.string().required(),
	description: yup.string()
});
const panel_schema = yup.object().shape({
	id: yup.string().required(),
	parent_id: yup.string().required(),
	label: yup.string().required(),
	description: yup.string(),
	initial_open: yup.bool().required(),
	with_container: yup.bool().required()
});
const setting_schema = yup.object().shape({
	id: yup.string().required(),
	meta_key: yup.string(),
	type: yup.string().required(),
	parent_id: yup.string().required(),
	label: yup.string().required(),
	description: yup.string(),
	help: yup.string(),
	// .when("type", {
	// 	is: "checkbox",
	// 	then: yup.string().required()
	// }),
	options: yup
		.array(
			yup
				.object({
					value: yup.string().required(),
					label: yup.string().required()
				})
				.required()
		)
		.min(2)
		.when("type", {
			is: "radio",
			then: yup.array().required()
		})
});

const prepare_elements = (elements, class_type) => {
	const elements_clean = [];

	forEach(elements, element => {
		let whitelist = false;
		let schema = false;

		// Whitelist
		if (class_type === "sidebar") {
			whitelist = sidebar_whitelist;
			schema = sidebar_schema;
			element["active_tab"] = false;
		} else if (class_type === "tab") {
			whitelist = tab_whitelist;
			schema = tab_schema;
		} else if (class_type === "panel") {
			whitelist = panel_whitelist;
			schema = panel_schema;
		} else if (class_type === "setting") {
			whitelist = setting_whitelist;
			schema = setting_schema;
		}

		if (whitelist === false) {
			return;
		}

		if (schema.isValidSync(element, { strict: true })) {
			element = pick(element, whitelist);
			elements_clean.push(element);
		}
	});

	return elements_clean;
};

export default prepare_elements;
