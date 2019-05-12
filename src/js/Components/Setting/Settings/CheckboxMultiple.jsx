import l, { store_slug, prepareValue } from "utils";

const { without, isEmpty, forEach } = lodash;
const { Component } = wp.element;
const { withSelect } = wp.data;
const { BaseControl, CheckboxControl, ToggleControl } = wp.components;

class CheckboxMultiple extends Component {
	getOptions = () => {
		const { getOldOptions, getDefaultOptions, props } = this;
		const { options } = props;
		const old_options = getOldOptions();
		const default_options = getDefaultOptions(old_options);

		return options.concat(old_options, default_options);
	};

	getDefaultOptions = old_options => {
		const { default_value, options } = this.props;
		const default_options = [];
		const options_key = options.map(({ value }) => value);
		const old_options_key = old_options.map(({ value }) => value);

		forEach(default_value, value => {
			if (
				!options_key.includes(value) &&
				!old_options_key.includes(value) &&
				value !== ""
			) {
				default_options.push({ value: value, label: value });
			}
		});

		return default_options;
	};

	// If there were old selected values that are no longer included
	// in the options array, we still display them.
	// But when they are deselected and the post is saved they will no longer appear.
	getOldOptions = () => {
		const { value_initial, options } = this.props;
		const old_options = [];
		const options_key = options.map(({ value }) => value);

		forEach(value_initial, value => {
			if (!options_key.includes(value)) {
				old_options.push({
					value: value,
					label: value
				});
			}
		});

		return old_options;
	};

	onChangeHandler = (selected, option_value) => {
		const { value, updateValue } = this.props;
		let value_new;

		if (selected) {
			value_new = !value.includes(option_value)
				? value.concat(option_value)
				: value;
		} else {
			value_new = without(value, option_value);
		}

		// If there is no value selected we save an empty string.
		// This is needed because meta_key_exists would turn false otherwise,
		// which makes it impossible to differentiate between a post that has
		// no values selected and one which hasnt save any value, and this permits us
		// to use the default_value correctly.
		value_new = isEmpty(value_new) ? [""] : value_new;

		updateValue(value_new);
	};

	render() {
		const { onChangeHandler, getOptions, props } = this;
		const { label, help, value, use_toggle } = props;
		const options = getOptions();

		return (
			<BaseControl label={label} help={help}>
				{options.map((option, index) => {
					if (use_toggle) {
						return (
							<ToggleControl
								key={index}
								label={option.label}
								checked={value.includes(option.value)}
								onChange={selected => onChangeHandler(selected, option.value)}
							/>
						);
					}

					return (
						<CheckboxControl
							key={index}
							label={option.label}
							checked={value.includes(option.value)}
							onChange={selected => onChangeHandler(selected, option.value)}
						/>
					);
				})}
			</BaseControl>
		);
	}
}

export default withSelect((select, { setting_id }) => {
	const { getCurrentPostAttribute } = select("core/editor");
	const { getSetting, getPersistedProp } = select(store_slug);
	const setting = getSetting(setting_id);
	const value_initial = prepareValue(
		setting,
		getPersistedProp,
		getCurrentPostAttribute
	);

	return {
		value_initial
	};
})(CheckboxMultiple);
