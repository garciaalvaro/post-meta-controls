import { isArray, isUndefined } from "lodash";
import { sprintf, __ } from "@wordpress/i18n";

import {
	Sidebar,
	Tab,
	Panel,
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
} from "../classes";

interface pmc_items {
	sidebars?: any[];
	tabs?: any[];
	panels?: any[];
	settings?: any[];
}

/* translators: %s: property name. */
const already_exists_message = __(
	"The value '%s' has already been assigned to an element."
);

const { pmc_items } = window as any;

const registerSidebars = () => {
	if (!pmc_items) {
		return;
	}

	const { sidebars, tabs, panels, settings } = pmc_items;

	if (
		!isArray(sidebars) ||
		!isArray(tabs) ||
		!isArray(panels) ||
		!isArray(settings)
	) {
		return;
	}

	const ids: string[] = [];
	const checkId = (instance: any, is_sidebar = false) => {
		const id = instance.getId();

		if (ids.includes(id)) {
			const message = sprintf(already_exists_message, id);

			instance.addWarning("id", message);

			if (is_sidebar) {
				instance.setIdAlreadyExists();
			}

			return;
		}

		ids.push(id);
	};

	// Prevent settings from having the same data_key.
	const data_keys: string[] = [];
	const checkDataKey = (setting: any) => {
		if (setting.getDataType() === "none") {
			return;
		}

		const data_key = setting.getDataKey();

		if (data_keys.includes(data_key)) {
			const message = sprintf(already_exists_message, data_key);

			setting.addWarning("data_key", message);
		} else {
			data_keys.push(data_key);
		}
	};

	sidebars.forEach((props_raw: any) => {
		const sidebar = new Sidebar(props_raw);

		if (!sidebar.is_valid) {
			return;
		}

		checkId(sidebar, true);

		sidebar.dispatch();
		sidebar.registerPlugin();
	});

	tabs.forEach((props_raw: any) => {
		const tab = new Tab(props_raw);

		if (!tab.is_valid) {
			return;
		}

		checkId(tab);

		tab.dispatch();
	});

	panels.forEach((props_raw: any) => {
		const panel = new Panel(props_raw);

		if (!panel.is_valid) {
			return;
		}

		checkId(panel);

		panel.dispatch();
	});

	settings.forEach((props_raw: any) => {
		const { type } = props_raw;

		if (isUndefined(type)) {
			return;
		}

		let setting = null;

		switch (type) {
			case "buttons":
				setting = new Buttons(props_raw);
				break;

			case "checkbox":
				setting = new Checkbox(props_raw);
				break;

			case "checkbox_multiple":
				setting = new CheckboxMultiple(props_raw);
				break;

			case "color":
				setting = new Color(props_raw);
				break;

			case "custom_text":
				setting = new CustomText(props_raw);
				break;

			case "date_range":
				setting = new DateRange(props_raw);
				break;

			case "date_single":
				setting = new DateSingle(props_raw);
				break;

			case "image":
				setting = new Image(props_raw);
				break;

			case "image_multiple":
				setting = new ImageMultiple(props_raw);
				break;

			case "radio":
				setting = new Radio(props_raw);
				break;

			case "range":
				setting = new Range(props_raw);
				break;

			case "range_float":
				setting = new RangeFloat(props_raw);
				break;

			case "select":
				setting = new Select(props_raw);
				break;

			case "text":
				setting = new Text(props_raw);
				break;

			case "textarea":
				setting = new Textarea(props_raw);
				break;
		}

		if (!setting || !setting.is_valid) {
			return;
		}

		checkId(setting);

		checkDataKey(setting);

		setting.dispatch();
	});
};

registerSidebars();
