import { isArray, isUndefined, reduce, isEqual } from "lodash";
import apiFetch from "@wordpress/api-fetch";
import domReady from "@wordpress/dom-ready";
import { sprintf, __ } from "@wordpress/i18n";
import { addQueryArgs } from "@wordpress/url";
import { select, dispatch, useSelect } from "@wordpress/data";

import { store_slug } from "utils/data";
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

type Setting =
	| Buttons
	| Checkbox
	| CheckboxMultiple
	| Color
	| CustomText
	| DateRange
	| DateSingle
	| Image
	| ImageMultiple
	| Radio
	| Range
	| RangeFloat
	| Select
	| Text
	| Textarea;

type Items = {
	sidebars?: SidebarProps[];
	tabs?: TabProps[];
	panels?: PanelProps[];
	settings?: SettingProps[];
};

/* translators: %s: property name. */
const already_exists_message = __(
	"The value '%s' has already been assigned to an element."
);

domReady(() => {
	const { id: post_id, type: post_type } = select(
		"core/editor"
	).getCurrentPost();

	apiFetch<Items>({
		path: addQueryArgs("/post-meta-controls/v1/items", {
			post_id,
			post_type
		})
	}).then(items => {
		if (!items) {
			return;
		}

		const { sidebars, tabs, panels, settings } = items;

		if (
			!isArray(sidebars) ||
			!isArray(tabs) ||
			!isArray(panels) ||
			!isArray(settings)
		) {
			return;
		}

		const ids: string[] = [];
		const checkId = (instance: Sidebar | Tab | Panel | Setting) => {
			const id = instance.getId();

			if (ids.includes(id)) {
				const message = sprintf(already_exists_message, id);

				instance.addWarning("id", message);

				if ("setIdAlreadyExists" in instance) {
					instance.setIdAlreadyExists();
				}

				return;
			}

			ids.push(id);
		};

		// Prevent settings from having the same data_key.
		const data_keys: string[] = [];
		const checkDataKey = (setting: Setting) => {
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

		sidebars.forEach((props_raw: SidebarPropsRaw) => {
			const sidebar = new Sidebar(props_raw);

			if (!sidebar.is_valid) {
				return;
			}

			checkId(sidebar);

			sidebar.dispatch();
			sidebar.registerPlugin();
		});

		tabs.forEach((props_raw: TabPropsRaw) => {
			const tab = new Tab(props_raw);

			if (!tab.is_valid) {
				return;
			}

			checkId(tab);

			tab.dispatch();
		});

		panels.forEach((props_raw: PanelPropsRaw) => {
			const panel = new Panel(props_raw);

			if (!panel.is_valid) {
				return;
			}

			checkId(panel);

			panel.dispatch();
		});

		settings.forEach((props_raw: SettingPropsRaw) => {
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

		// Before, if a meta key did not exist it would not appear in the meta
		// attribute of the post. The meta key was only saved when the user
		// changed it through a control, and the plugin triggered editPost.
		// Since Gutenberg 6.6.0 (maybe previous) and WordPress 5.3,
		// the editor will return empty values for meta keys that do not exist.
		// For this reason we are forced to save the setting default_value
		// in the first post save. Otherwise, the first post save would set
		// empty values to those non existent meta keys.
		// See https://github.com/WordPress/gutenberg/issues/17864

		// Only continue if WordPress version is 5.3 or higher.
		// TODO: find a more reliable way.
		if (!useSelect) {
			return;
		}

		const meta = select("core/editor").getEditedPostAttribute("meta") as
			| Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
			| undefined;
		const settings_prepared = select(store_slug).getSettingsAll() as
			| State["settings"]
			| undefined;

		if (!meta || !settings_prepared) {
			return;
		}

		const meta_with_defaults = reduce(
			meta,
			(acc, value, key) => {
				const setting = settings_prepared.find(
					({ data_key_with_prefix }) => data_key_with_prefix === key
				);

				if (
					!setting ||
					setting.meta_key_exists ||
					// @ts-ignore TODO: default_value does not exist in custom_text setting.
					isUndefined(setting.default_value)
				) {
					return { ...acc, [key]: value };
				}

				// @ts-ignore TODO: default_value does not exist in custom_text setting.
				return { ...acc, [key]: setting.default_value };
			},
			{}
		);

		if (!isEqual(meta, meta_with_defaults)) {
			dispatch("core/editor").editPost({
				meta: meta_with_defaults
			});
		}
	});
});
