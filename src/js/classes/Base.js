import l, { sanitize, store_slug } from "../utils";

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

		// Remove keys that are meant to be assigned by the class.
		this.setPrivates();
		this.unsetPrivateKeys();

		// Defaults.
		this.setDefaults();
		this.mergeDefaults();

		// Run functions before validating props.
		if (!isUndefined(this.beforeSetSchema)) {
			this.beforeSetSchema();
		}

		// Schema.
		this.setSchema();
		this.castSchema();
		this.validateProps();
	}

	setPrivates() {}

	dispatch() {
		const { class_name, valid } = this.props;

		if (
			isUndefined(dispatch(store_slug)) // ||
			// (valid !== true && class_name !== "setting")
		) {
			return;
		}

		const { index, ...filtered_props } = this.props;

		if (class_name === "sidebar") {
			dispatch(store_slug).addSidebar(filtered_props);
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
		// Assign default elements if not present in array and
		// remove keys which are not present in defaults.
		// this.props_raw = \shortcode_atts( this.props_default, this.props_raw );
		this.props = assign(
			this.props_defaults,
			pick(this.props, keys(this.props_defaults))
		);
	}

	castSchema() {
		forEach(this.props, (value, key) => {
			switch (this.props_schema[key].type) {
				case "html_svg":
					this.props[key] = value;
					// this.props[key] = sanitize.id(value);
					break;

				case "id":
					this.props[key] = sanitize.id(value);
					break;

				case "text":
					this.props[key] = sanitize.text(value);
					break;

				case "integer":
					this.props[key] = sanitize.integer(value);
					break;

				case "float":
					this.props[key] = sanitize.float(value);
					break;

				case "boolean":
					this.props[key] = sanitize.boolean(value);
					break;

				case "array_integer":
					this.props[key] = sanitize.arrayInteger(value);
					break;

				case "array_id":
					this.props[key] = sanitize.arrayId(value);
					break;

				case "array_empty":
					this.props[key] = sanitize.arrayEmpty(value);
					break;

				case "object_empty":
					this.props[key] = sanitize.objectEmpty(value);
					break;

				case "array_text":
					this.props[key] = sanitize.arrayText(value);
					break;

				case "array_object_text":
					this.props[key] = sanitize.arrayObjectText(value);
					break;

				case "id_OR_array_id":
					if (isArray(this.props[key])) {
						this.props[key] = sanitize.arrayId(value);
					} else {
						this.props[key] = sanitize.id(value);
					}
					break;

				case "integer_OR_array_integer":
					if (isArray(this.props[key])) {
						this.props[key] = sanitize.arrayInteger(value);
					} else {
						this.props[key] = sanitize.integer(value);
					}
					break;

				default:
					this.props[key] = "";
					break;
			}
		});
	}

	validateProps() {
		const { props, props_schema } = this;
		const invalid_warnings = [];

		forEach(props_schema, (schema, prop_key) => {
			if (isUndefined(schema.conditions) || schema.conditions === false) {
				return;
			}

			const { conditions } = schema;
			const prop = props[prop_key];
			const type =
				props.class_name === "setting" && props.type !== ""
					? `${props.type} `
					: "";
			const warning_title = __(
				`${prop_key} (${type}${props.class_name})`
			);

			if (conditions === "not_empty") {
				if (
					(isEmpty(prop) && (isArray(prop) || isObject(prop))) ||
					(isString(prop) && prop === "")
				) {
					invalid_warnings.push({
						title: warning_title,
						message: __("This property can't be empty.")
					});
				}
			} else if (isArray(conditions)) {
				forEach(conditions, (value, message) => {
					if (false === value) {
						invalid_warnings.push({
							title: warning_title,
							message: message
						});
					}
				});
			}
		});

		this.props.invalid_warnings = invalid_warnings;
		this.props.valid = isEmpty(invalid_warnings);
	}

	isValid() {
		return this.props.valid === true;
	}

	getId() {
		return this.props.id;
	}

	getProps() {
		return this.props;
	}
}

export default Base;
