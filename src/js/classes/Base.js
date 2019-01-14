import l, { castSchema, store_slug } from "../utils";

const {
	isUndefined,
	isArray,
	isObject,
	isEmpty,
	isString,
	keys,
	assign,
	pick,
	forEach
} = lodash;
const { __ } = wp.i18n;
const { dispatch } = wp.data;

class Base {
	props;
	props_privates;
	props_defaults;
	props_schema;

	constructor(props) {
		this.props = props;
		this.addWarning = this.addWarning.bind(this);

		// Remove keys that are meant to be assigned by the class.
		this.setPrivates();
		this.unsetPrivateKeys();

		// Defaults.
		this.setDefaults();
		this.mergeDefaults();

		// Run functions before casting the schema.
		if (!isUndefined(this.beforeSetSchema)) {
			this.beforeSetSchema();
		}

		// Schema.
		this.setSchema();
		this.castSchema();

		// Run functions after casting the schema.
		if (!isUndefined(this.afterCastSchema)) {
			this.afterCastSchema();
		}

		this.validateProps();
	}

	setPrivates() {}

	dispatch() {
		if (isUndefined(dispatch(store_slug))) {
			return;
		}

		const { class_name, ...filtered_props } = this.props;

		if (class_name === "sidebar") {
			const {
				icon_dashicon,
				icon_svg,
				...sidebar_filtered_props
			} = filtered_props;

			dispatch(store_slug).addSidebar(sidebar_filtered_props);
		} else if (class_name === "tab") {
			dispatch(store_slug).addTab(filtered_props);
		} else if (class_name === "panel") {
			dispatch(store_slug).addPanel(filtered_props);
		} else if (class_name === "setting") {
			dispatch(store_slug).addSetting(filtered_props);
		}
	}

	unsetPrivateKeys() {
		if (isEmpty(this.props_privates)) {
			return;
		}

		forEach(this.props_privates, prop => {
			if (!isUndefined(this.props[prop])) {
				const { [prop]: omit_prop, ...rest } = this.props;

				this.props = rest;
			}
		});
	}

	mergeDefaults() {
		// Assign default props if not present in array and
		// remove keys which are not present in defaults.
		this.props = assign(
			this.props_defaults,
			pick(this.props, keys(this.props_defaults))
		);
	}

	castSchema() {
		this.props = castSchema(this.props, this.props_schema);
	}

	validateProps() {
		const { props, props_schema, addWarning } = this;

		forEach(props_schema, (schema, prop_key) => {
			if (isUndefined(schema.conditions) || schema.conditions === false) {
				return;
			}

			const { conditions } = schema;
			const prop = props[prop_key];

			if (conditions === "not_empty") {
				if (
					(isEmpty(prop) && (isArray(prop) || isObject(prop))) ||
					(isString(prop) && prop === "")
				) {
					const message = __("This property can't be empty.");
					addWarning(prop_key, message);
				}
			} else if (isArray(conditions)) {
				forEach(conditions, ({ value, message }) => {
					if (false === value) {
						addWarning(prop_key, message);
					}
				});
			}
		});

		this.props.valid = isEmpty(this.props.warnings);
	}

	addWarning(prop_key, message) {
		const { class_name, warnings } = this.props;
		const type =
			class_name === "setting" && this.props.type !== ""
				? `${this.props.type} `
				: "";
		const title = __(`${prop_key} property in ${type} ${class_name}`);

		this.props.warnings = warnings.concat({
			title,
			message
		});
	}

	getId() {
		return this.props.id;
	}

	getProps() {
		return this.props;
	}
}

export default Base;
