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

		const {
			valid,
			icon_dashicon,
			icon_svg,
			class_name,
			...filtered_props
		} = this.props;

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
		this.props = assign(
			this.props_defaults,
			pick(this.props, keys(this.props_defaults))
		);
	}

	castSchema() {
		forEach(this.props, (value, key) => {
			switch (this.props_schema[key].type) {
				case "html":
					this.props[key] = sanitize.html(value);
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

				case "object_text":
					this.props[key] = sanitize.objectText(value);
					break;

				case "array_text":
					this.props[key] = sanitize.arrayText(value);
					break;

				case "array_object_text":
					this.props[key] = sanitize.arrayObjectText(value);
					break;

				case "array_object_string":
					this.props[key] = sanitize.arrayObjectString(value);
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
				forEach(conditions, (value, message) => {
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
		const title = __(`${prop_key} (${type + class_name})`);

		this.props.warnings = warnings.concat({
			title,
			message
		});
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
