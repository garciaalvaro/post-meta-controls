import {
	isUndefined,
	isArray,
	isObject,
	forOwn,
	isEmpty,
	keys,
	defaults,
	pick,
	reduce,
	flow
} from "lodash";
import { __, sprintf } from "@wordpress/i18n";
import { dispatch } from "@wordpress/data";

import { castSchema } from "utils/tools";
import { store_slug } from "utils/data";
import { Props as SettingProps } from "./Setting";
import { Props as PanelProps } from "./Panel";
import { Props as TabProps } from "./Tab";
import { Props as SidebarProps } from "./Sidebar";

type BaseReceivedProps = SettingProps | PanelProps | TabProps | SidebarProps;

export class Base<T extends BaseReceivedProps> {
	props: T["props"];
	props_privates: T["props_privates"];
	props_defaults: T["props_defaults"];
	props_schema: T["props_schema"];
	is_valid = false;

	constructor({
		props_raw,
		props_privates = [],
		props_defaults,
		props_schema
	}: Omit<T, "props">) {
		this.props_privates = props_privates;
		this.props_defaults = props_defaults;
		this.props_schema = props_schema;

		this.props = flow([
			// Remove keys that are meant to be assigned by the class.
			this.unsetPrivateKeys,

			// Defaults.
			this.mergeDefaults,

			// Run functions before casting the schema.
			this.beforeSetSchema,

			// Schema.
			this.castSchema,

			// Run functions after casting the schema.
			this.afterCastSchema
		])(props_raw);

		this.validateProps();

		this.is_valid = isEmpty(this.props.warnings);
	}

	// At this point the received props have the final keys and default values
	// but they have not been casted
	beforeSetSchema = (props_raw: T["props"]) => props_raw;

	afterCastSchema = (props_raw: T["props"]) => props_raw;

	dispatch = () => {
		if (isUndefined(dispatch(store_slug))) {
			return;
		}

		const { class_name, ...filtered_props } = this.props;

		if (class_name === "sidebar") {
			const {
				icon_dashicon,
				icon_svg,
				...sidebar_filtered_props
				// TODO: TS: filtered_props is not recognized as being from SidebarProperties
			} = filtered_props as Pick<
				SidebarProps["props"],
				Exclude<keyof SidebarProps["props"], "class_name">
			>;

			dispatch(store_slug).addSidebar(sidebar_filtered_props);
		} else if (class_name === "tab") {
			dispatch(store_slug).addTab(filtered_props);
		} else if (class_name === "panel") {
			dispatch(store_slug).addPanel(filtered_props);
		} else if (class_name === "setting") {
			dispatch(store_slug).addSetting(filtered_props);
		}
	};

	unsetPrivateKeys = (props_raw: T["props_raw"]) =>
		reduce<T["props_raw"], Partial<T["props_raw"]>>(
			props_raw,
			(acc, prop_value, prop_key) => {
				// @ts-ignore TODO: TS
				if (!this.props_privates.includes(prop_key)) {
					// @ts-ignore TODO: TS
					acc[prop_key] = prop_value;
				}

				return acc;
			},
			{}
		);

	// Assign default props if not present in array and
	// remove keys which are not present in defaults.
	mergeDefaults = (props_raw: T["props_raw"]) =>
		defaults(pick(props_raw, keys(this.props_defaults)), this.props_defaults);

	castSchema = (props_raw: T["props_raw"]) =>
		castSchema(props_raw, this.props_schema);

	validateProps = () => {
		const { props, props_schema: schemas, validateCondition } = this;

		forOwn<T["props_schema"]>(schemas, (schema, key) => {
			// @ts-ignore TODO: TS
			const { conditions } = schema;

			if (!conditions) {
				return;
			}

			// @ts-ignore TODO: TS
			validateCondition(conditions, props[key], key);
		});
	};

	validateCondition = (condition: SchemaCondition, value: any, key: string) => {
		const { addWarning, validateCondition } = this;

		if (condition === "not_empty") {
			if (
				value === "" ||
				(isEmpty(value) && (isArray(value) || isObject(value)))
			) {
				addWarning(key, __("This property can't be empty."));
			}

			return;
		}

		if (isArray(condition)) {
			condition.forEach(condition => validateCondition(condition, value, key));

			return;
		}

		if (isObject(condition) && condition.value === false) {
			addWarning(key, condition.message);

			return;
		}
	};

	addWarning = (prop_key: string, message: string) => {
		const { warnings, class_name } = this.props;
		const type =
			class_name === "setting"
				? `${(this.props as SettingProps["props"]).type} `
				: "";
		/* translators: %s: property, %s: setting type, %s: element type. */
		const title = sprintf(
			__(`'%s' property in %s%s`),
			prop_key,
			type,
			class_name
		);

		this.props.warnings = warnings.concat({
			title,
			message
		});
	};

	getId = () => this.props.id;

	getProps = () => this.props;
}
