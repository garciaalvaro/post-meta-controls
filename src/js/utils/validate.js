import l from "./log";

const { __, sprintf } = wp.i18n;
const { isString, isEmpty, isArray, isUndefined, forEach } = lodash;

const validateRequired = (required, prop_key) => {
	const exists = !isUndefined(prop_key);
	const valid = !required || exists;
	/* translators: %s: Setting property name. */
	const warning = {
		property_name: prop_key,
		message: __("This property is required.")
	};

	return { valid: valid, warnings: [warning] };
};

const validateConditions = (conditions, prop_key, props) => {
	if (isString(conditions) && "not_empty" === conditions) {
		if (isEmpty(props[prop_key])) {
			/* translators: %s: Setting property name. */
			const warning = {
				property_name: prop_key,
				message: __("This property can't be empty.")
			};
			return { valid: false, warnings: [warning] };
		}

		return { valid: true, warnings: [] };
	}

	if (isArray(conditions)) {
		let is_valid = true;
		let warnings = [];

		forEach(conditions, condition => {
			// if (is_valid === false) {
			// 	return false;
			// }

			let {
				operator,
				argument_1,
				argument_2,
				argument_2_is_prop
			} = condition;

			const argument_1_value = props[argument_1];
			const argument_2_value =
				true === argument_2_is_prop ? props[argument_2] : argument_2;

			switch (operator) {
				case "greater_than":
					if (argument_1_value <= argument_2_value) {
						is_valid = false;
						const warning = {
							property_name: argument_1
						};

						if (argument_2_is_prop) {
							/* translators: %s: First property value, %s: Second property name, %s: Second property value */
							warning.message = sprintf(
								__(
									`Value (%s) should be greater than '%s' value (%s).`
								),
								argument_1_value,
								argument_2,
								argument_2_value
							);
						} else {
							/* translators: %s: First property value, %s: Second property name, %s: Second property value */
							warning.message = sprintf(
								__(`Value (%s) should be greater than %s.`),
								argument_1_value,
								argument_2_value
							);
						}

						warnings.push(warning);
					}
					break;
				default:
					break;
			}
		});

		return { valid: is_valid, warnings: warnings };
	}

	return { valid: false, warnings: [] };
};

export default { conditions: validateConditions, required: validateRequired };
