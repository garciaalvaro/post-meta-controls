import l from "./log";

const { isString, isEmpty, isArray, isUndefined, forEach } = lodash;

const validateRequired = (required, prop) => {
	const exists = !isUndefined(prop);

	return !required || exists;
};

const validateConditions = (conditions, prop_key, props) => {
	if (isString(conditions) && "not_empty" === conditions) {
		if (isEmpty(props[prop_key])) {
			return false;
		}

		return true;
	}

	if (isArray(conditions)) {
		let is_valid = true;

		forEach(conditions, condition => {
			if (is_valid === false) {
				return false;
			}

			let {
				operator,
				argument_1,
				argument_2,
				argument_2_is_prop
			} = condition;

			argument_1 = props[argument_1];
			argument_2 =
				true === argument_2_is_prop ? props[argument_2] : argument_2;

			switch (operator) {
				case "greater_than":
					if (argument_1 <= argument_2) {
						is_valid = false;
					}
					break;
				default:
					break;
			}
		});

		return is_valid;
	}

	return false;
};

export default { conditions: validateConditions, required: validateRequired };
