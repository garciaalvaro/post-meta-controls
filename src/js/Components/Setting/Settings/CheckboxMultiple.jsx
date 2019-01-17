import l from "../../../utils";

const { without, isEmpty } = lodash;
const { Component } = wp.element;
const { BaseControl, CheckboxControl, ToggleControl } = wp.components;

class CheckboxMultiple extends Component {
	onChangeHandler = (selected, option_value) => {
		let { value, updateValue } = this.props;

		if (selected) {
			value = !value.includes(option_value)
				? value.concat(option_value)
				: value;
		} else {
			value = without(value, option_value);
		}

		// If there is no value selected we save an empty string.
		// This is needed because meta_key_exists would turn false otherwise,
		// which makes it impossible to differentiate between a post that has
		// no values selected and one which hasnt save any value, and this permits us
		// to use the default_value correctly.
		value = isEmpty(value) ? [""] : value;

		updateValue(value);
	};

	render() {
		const { onChangeHandler, props } = this;
		const { label, help, value, options, use_toggle } = props;

		return (
			<BaseControl label={label} help={help}>
				{options.map((option, index) => {
					if (use_toggle) {
						return (
							<ToggleControl
								key={index}
								label={option.label}
								checked={value.includes(option.value)}
								onChange={selected =>
									onChangeHandler(selected, option.value)
								}
							/>
						);
					}

					return (
						<CheckboxControl
							key={index}
							label={option.label}
							checked={value.includes(option.value)}
							onChange={selected =>
								onChangeHandler(selected, option.value)
							}
						/>
					);
				})}
			</BaseControl>
		);
	}
}

export default CheckboxMultiple;
