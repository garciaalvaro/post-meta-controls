import l, { sanitize, validate } from "../utils";

const {
	isArray,
	isUndefined,
	isEmpty,
	last,
	keys,
	assign,
	pick,
	forEach
} = lodash;

class Base {
	props;
	props_default;
	props_schema;

	constructor(props) {
		// Set values.
		this.props = props;
		this.props_default = this.getPropsDefault();
		this.props_schema = this.getPropsSchema();

		// Run functions before validating props.
		if (!isUndefined(this.preCleanProps)) {
			this.preCleanProps();
		}

		// Clean props.
		this.unsetPropsKeysPrivate();
		this.assignPropsDefaults();
		this.castProps();

		// Run functions before validating props.
		if (!isUndefined(this.prePropsValidation)) {
			this.prePropsValidation();
		}

		// Validate props.
		this.validateProps();

		// this.dispatchToStore();
	}

	unsetPropsKeysPrivate() {
		forEach(this.props_schema, (schema, key) => {
			if (schema.private === true && !isUndefined(this.props[key])) {
				const { [key]: omit_prop, ...rest } = this.props;

				this.props = rest;
			}
		});
	}

	assignPropsDefaults() {
		// Assign default elements if not present in array and
		// remove keys which are not present in defaults.
		// this.props_raw = \shortcode_atts( this.props_default, this.props_raw );
		this.props = assign(
			this.props_default,
			pick(this.props, keys(this.props_default))
		);
	}

	castProps() {
		forEach(this.props, (value, key) => {
			switch (this.props_schema[key].type) {
				case "id":
					this.props[key] = sanitize.id(value);
					break;

				case "text":
					this.props[key] = sanitize.text(value);
					break;

				case "integer":
					this.props[key] = sanitize.integer(value);
					break;

				case "bool":
					this.props[key] = sanitize.bool(value);
					break;

				case "array_string":
					this.props[key] = sanitize.arrayString(value);
					break;

				case "array_object_string":
					this.props[key] = sanitize.arrayObjectString(value);
					break;

				default:
					this.props[key] = "";
					break;
			}
		});
	}

	validateProps() {
		forEach(this.props_schema, (schema, key) => {
			// If is required.
			if (!validate.required(schema.required, this.props)) {
				this.props.valid = false;
				return;
			}

			if (isUndefined(schema.conditions)) {
				return;
			}

			// If has conditions assigned.
			if (!validate.conditions(schema.conditions, key, this.props)) {
				this.props.valid = false;
				return; // TODO: continue loop and add not valid props and conditions
			}
		});

		if (this.props.valid !== false) {
			this.props.valid = true;
		}
	}

	assignPropId() {
		if (
			!isEmpty(this.props.id) ||
			!isArray(this.props.path) ||
			isEmpty(this.props.path) ||
			isUndefined(this.props.index)
		) {
			return;
		}

		// this.props.id = this.props.index;
		this.props.id = `${last(this.props.path)}_${this.props.index}`;
	}

	// dispatchToStore() {
	// 	const { dispatch } = wp.data;

	// 	if (this.props.valid !== true || isUndefined(dispatch(store_slug))) {
	// 		return;
	// 	}

	// 	const { class_name } = this.props;
	// 	const { valid, index, ...filtered_props } = this.props;

	// 	if (class_name === "sidebar") {
	// 		dispatch(store_slug).addSidebar(filtered_props);
	// 	} else if (class_name === "tab") {
	// 		dispatch(store_slug).addTab(filtered_props);
	// 	} else if (class_name === "panel") {
	// 		dispatch(store_slug).addPanel(filtered_props);
	// 	} else if (class_name === "setting") {
	// 		dispatch(store_slug).addSetting(filtered_props);
	// 	}
	// }

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
